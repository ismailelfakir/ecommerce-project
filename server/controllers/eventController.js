const express = require("express");
const { isSeller, isAuthenticated, isAdmin } = require("../middleware/auth");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const router = express.Router();
const Seller = require("../models/Seller");
const ErrorHandler = require("../utils/ErrorHandler");
const upload = require("../multer");
const Event = require("../models/Event");
const fs = require("fs");

// create event
router.post(
    "/create-event",
    upload.array("images"),
    catchAsyncErrors(async (req, res, next) => {
      try {
        const sellerId = req.body.sellerId;
        const seller = await Seller.findById(sellerId);
        if (!seller) {
          return next(new ErrorHandler("Seller Id is invalid!", 400));
        } else {
          const files = req.files;
          const imageUrls = files.map((file) => `${file.filename}`);
  
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

module.exports = router;
