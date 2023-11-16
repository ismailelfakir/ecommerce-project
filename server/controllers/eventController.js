const express = require("express");
const { isSeller, isAuthenticated, isAdmin } = require("../middleware/auth");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const router = express.Router();
const Seller = require("../models/Seller");
const ErrorHandler = require("../utils/ErrorHandler");
const upload = require("../multer");
const Event = require("../models/Event");
const fs = require("fs");
const cloudinary = require("cloudinary");

// create event
router.post(
    "/create-event",
    upload.array("images"),
    catchAsyncErrors(async (req, res, next) => {
      let errorOccurred = false;
      try {
        const sellerId = req.body.sellerId;
        const seller = await Seller.findById(sellerId);
        if (!seller) {
          return next(new ErrorHandler("Seller Id is invalid!", 400));
        } else {

          const files = req.files;
      const imageUrls = [];

   // Use the Cloudinary library to upload each image to Cloudinary
   for (const file of files) {
    const result = await cloudinary.uploader.upload(file.path);
    imageUrls.push({
      url: result.secure_url,
      publicId: result.public_id,
    });
  }

  // Delete files after successful upload
  files.forEach((file) => {
    fs.unlink(file.path, (err) => {
      if (err) {
        console.error('Error deleting file:', err);
        errorOccurred = true; // Set the flag if an error occurs during deletion
      }
    });
  });
  
          const eventData = req.body;
          eventData.images = imageUrls;
          eventData.seller = seller;
  
          const event = await Event.create(eventData);
  
          res.status(201).json({
            success: true,
            event,
          });
        }
      } catch (error) {
        return next(new ErrorHandler(error, 400));
      }
    })
  );
  

// get all events
router.get("/get-all-events", async (req, res, next) => {
  try {
    const events = await Event.find();
    res.status(201).json({
      success: true,
      events,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

// get all events of a seller
router.get(
    "/get-all-events/:id",
    catchAsyncErrors(async (req, res, next) => {
      try {
        const events = await Event.find({ sellerId: req.params.id });
  
        res.status(201).json({
          success: true,
          events,
        });
      } catch (error) {
        return next(new ErrorHandler(error, 400));
      }
    })
  );

  // delete event of a seller
router.delete(
    "/delete-seller-event/:id",
    catchAsyncErrors(async (req, res, next) => {
      try {
        const eventData = await Event.findById(req.params.id);

        eventData.images.forEach((imageUrl) => {
            const filename = imageUrl ;
            const filePath = `uploads/${filename}`;

            fs.unlink(filePath , (err) => {
                if(err) {
                    console.log(err);
                }
            });
        } );

        const event = await Event.findByIdAndDelete(req.params.id);
        if (!event) {
          return next(new ErrorHandler("Event is not found with this id", 404));
        }    
  
        // for (let i = 0; 1 < product.images.length; i++) {
        //   const result = await cloudinary.v2.uploader.destroy(
        //     event.images[i].public_id
        //   );
        // }
      
        // await event.remove();

  
        res.status(201).json({
          success: true,
          message: "Event Deleted successfully!",
        });
      } catch (error) {
        return next(new ErrorHandler(error, 400));
      }
    })
  );

// update product info
router.put(
  "/update-event/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const {
        name,
        description,
        category,
        tags,
        originalPrice,
        discountPrice,
        stock,
      } = req.body;

      const event = await Event.findById(req.params.id);

      if (!event) {
        return next(new ErrorHandler("Event not found", 400));
      }

      event.name = name;
      event.description = description;
      event.category = category;
      event.tags = tags;
      event.originalPrice = originalPrice;
      event.discountPrice = discountPrice;
      event.stock = stock;


      await event.save();

      res.status(201).json({
        success: true,
        event,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// // all events --- for admin
router.get(
  "/admin-all-events",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const events = await Event.find().sort({
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        events,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// delete admin events 
router.delete(
  "/delete-admin-event/:id",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      // const product = await Product.findById(req.params.id);
      const event = await Event.findByIdAndDelete(req.params.id);

      if (!event) {
        return next(new ErrorHandler("Event is not found with this id", 404));
      }

      // for (let i = 0; 1 < product.images.length; i++) {
      //   const result = await cloudinary.v2.uploader.destroy(
      //     product.images[i].public_id
      //   );
      // }

      // await product.remove();

      res.status(201).json({
        success: true,
        message: "Event Deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

module.exports = router;
