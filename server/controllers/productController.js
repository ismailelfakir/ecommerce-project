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

// Create product route
router.post(
  '/create-product',
  upload.array('images'),
  catchAsyncErrors(async (req, res, next) => {
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
        imageUrls.push(result.secure_url);
      }

      files.forEach((file) => {
        fs.unlink(file.path, (err) => {
          if (err) {
            console.error('Error deleting file:', err);
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
      return next(new ErrorHandler(error, 400));
    }
  })
);


// get all products of a shop
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
      const productData = await Product.findById(req.params.id);

      productData.images.forEach((imageUrl) => {
        const filename = imageUrl ;
        const filePath = `uploads/${filename}`;

        fs.unlink(filePath , (err) => {
            if(err) {
                console.log(err);
            }
        });
    } );

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

module.exports = router;
