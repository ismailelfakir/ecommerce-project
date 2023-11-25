const express = require("express");
const { isSeller, isAuthenticated, isAdmin } = require("../middleware/auth");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const router = express.Router();
const Seller = require("../models/Seller");
const ErrorHandler = require("../utils/ErrorHandler");
const upload = require("../multer");
const Product = require("../models/Product");
const fs = require("fs");
const cloudinary = require("cloudinary");
const Order = require("../models/Order"); 

// Create product route
router.post(
  '/create-product',
  upload.array('images'),
  catchAsyncErrors(async (req, res, next) => {
    let errorOccurred = false; // Flag to track whether an error has occurred

    if(req.files.length > 0) {
      try {
        const sellerId = req.body.sellerId;
        const seller = await Seller.findById(sellerId);
  
        if (!seller) {
          return next(new ErrorHandler('Seller Id is invalid!', 400));
        }
  
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
  
        const productData = req.body;
        productData.images = imageUrls;
        productData.seller = seller;
  
        const product = await Product.create(productData);
  
        res.status(201).json({
          success: true,
          product,
        });
      } catch (error) {
        errorOccurred = true; // Set the flag if an error occurs during processing
        return next(new ErrorHandler(error, 400));
      } finally {
        // Delete files if an error occurred during processing
        if (errorOccurred) {
          files.forEach((file) => {
            fs.unlink(file.path, (err) => {
              if (err) {
                console.error('Error deleting file:', err);
              }
            });
          });
        }
      }
    }
    return next(new ErrorHandler('images is required', 400));
  })
);

// get all products of a Seller
router.get(
  "/get-all-products-seller/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await Product.find({ sellerId: req.params.id });

      res.status(201).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// delete product of a seller
router.delete(
  "/delete-seller-product/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      // const product = await Product.findById(req.params.id);
      const product = await Product.findByIdAndDelete(req.params.id);

      if (!product) {
        return next(new ErrorHandler("Product is not found with this id", 404));
      }

      // for (let i = 0; 1 < product.images.length; i++) {
      //   const result = await cloudinary.v2.uploader.destroy(
      //     product.images[i].public_id
      //   );
      // }

      // await product.remove();

      res.status(201).json({
        success: true,
        message: "Product Deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// update product info
/*
router.put(
  "/update-product/:id",
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

      const product = await Product.findById(req.params.id);

      if (!product) {
        return next(new ErrorHandler("Product not found", 400));
      }

      product.name = name;
      product.description = description;
      product.category = category;
      product.tags = tags;
      product.originalPrice = originalPrice;
      product.discountPrice = discountPrice;
      product.stock = stock;


      await product.save();

      res.status(201).json({
        success: true,
        product,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
*/

router.put(
  "/update-product/:id",
  isSeller,
  upload.array('images'), // 'newImages' is the name of the field in the form
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
      const product = await Product.findById(req.params.id);
     

      if (!product) {
        return next(new ErrorHandler("Product not found", 400));
      }

      // Upload new images and add to product
      const newImages = req.files;
      for (const file of newImages) {
        const result = await cloudinary.uploader.upload(file.path);
        product.images.push({
          url: result.secure_url,
          publicId: result.public_id,
        });
        fs.unlinkSync(file.path); // Delete file from the server after upload
      }

      product.name = name;
      product.description = description;
      product.category = category;
      product.tags = tags;
      product.originalPrice = originalPrice;
      product.discountPrice = discountPrice;
      product.stock = stock;

      await product.save();

      res.status(201).json({
        success: true,
        product,
      });
    } catch (error) {
      // Clean up any new images if an error occurs
      req.files.forEach(file => {
        fs.unlinkSync(file.path);
      });

      return next(new ErrorHandler(error.message, 500));
    }
  })
);
// get all products
router.get(
  "/get-all-products",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await Product.find().sort({ createdAt: -1 });

      res.status(201).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// // review for a product
router.put(
  "/create-new-review",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { user, rating, comment, productId, orderId } = req.body;

      const product = await Product.findById(productId);

      const review = {
        user,
        rating,
        comment,
        productId,
      };

      const isReviewed = product.reviews.find(
        (rev) => rev.user._id === req.user._id
      );

      if (isReviewed) {
        product.reviews.forEach((rev) => {
          if (rev.user._id === req.user._id) {
            (rev.rating = rating), (rev.comment = comment), (rev.user = user);
          }
        });
      } else {
        product.reviews.push(review);
      }

      let avg = 0;

      product.reviews.forEach((rev) => {
        avg += rev.rating;
      });

      product.ratings = avg / product.reviews.length;

      await product.save({ validateBeforeSave: false });

      await Order.findByIdAndUpdate(
        orderId,
        { $set: { "cart.$[elem].isReviewed": true } },
        { arrayFilters: [{ "elem._id": productId }], new: true }
      );

      res.status(200).json({
        success: true,
        message: "Reviwed succesfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// all products --- for admin
router.get(
  "/admin-all-products",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await Product.find().sort({
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// delete admin product 
router.delete(
  "/delete-admin-product/:id",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      // const product = await Product.findById(req.params.id);
      const product = await Product.findByIdAndDelete(req.params.id);

      if (!product) {
        return next(new ErrorHandler("Product is not found with this id", 404));
      }

      // for (let i = 0; 1 < product.images.length; i++) {
      //   const result = await cloudinary.v2.uploader.destroy(
      //     product.images[i].public_id
      //   );
      // }

      // await product.remove();

      res.status(201).json({
        success: true,
        message: "Product Deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// Endpoint to delete an image from a product
router.delete('/product/:productId/delete-image/:imagePublicId', async (req, res) => {
  const { productId, imagePublicId } = req.params;
  console.log("productId : ", productId , "imagePublicId : ", imagePublicId)

  try {
    const cloudinaryRes = await cloudinary.uploader.destroy(imagePublicId);

    if (cloudinaryRes.result === 'ok') {
      const product = await Product.findById(productId);

      if (product) {
        product.images = product.images.filter(img => img.publicId !== imagePublicId);

        await product.save();

        res.status(200).send({ message: 'Image deleted successfully.' });
      } else {
        res.status(404).send({ message: 'Product not found.' });
      }
    } else {
      res.status(500).send({ message: 'Failed to delete image from Cloudinary.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server error occurred.', error: error.message });
  }
});

module.exports = router;
