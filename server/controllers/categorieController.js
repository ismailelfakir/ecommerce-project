const express = require("express");
const { isSeller, isAuthenticated, isAdmin } = require("../middleware/auth");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const router = express.Router();
const ErrorHandler = require("../utils/ErrorHandler");
const upload = require("../multer");
const Categories = require("../models/Categories");
const fs = require("fs");
const cloudinary = require("cloudinary");

// all categories --- for admin

router.get(
  "/admin-all-categories",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const categories = await Categories.find().sort({
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        categories,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// delete admin categories 
router.delete(
  "/admin-delete-categories/:id",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const categories = await Categories.findByIdAndDelete(req.params.id);

      if (!categories) {
        return next(new ErrorHandler("categorie is not found with this id", 404));
      }
      await cloudinary.v2.uploader.destroy(
        categories.avatar.publicId
      );


      await Categories.findByIdAndDelete(req.params.id);

      res.status(201).json({
        success: true,
        message: "Categorie Deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// ???
router.post(
  "/admin-create-categories",
  upload.single('file'),
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      // Extraire les données du formulaire de demande
      const { title, subTitle } = req.body;

      const categorie = await Categories.findOne({ title });

      if (categorie) {
        const filename = req.file.filename;
        const filePath = `img/${filename}`;
        fs.unlink(filePath, (err) => {
          if (err) {
            console.log(err);
            res.status(500).json({ message: "error deleting file" });
          }
        });
        return next(new ErrorHandler("Categorie already exists", 400));
      }


      // Use the Cloudinary library to upload the image to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
      const fileUrl = result.secure_url;
      const publicId = result.public_id;

      // Delete the local file after successful upload to Cloudinary
      fs.unlink(req.file.path, (err) => {
        if (err) {
          console.error("Error deleting local file:", err);
          errorOccurred = true;
        }
      });

      const newCategory = new Categories({
        title,
        subTitle,
        avatar: {
          url: fileUrl,
          publicId: publicId,
        },
      });

      // Enregistrer la nouvelle catégorie dans la base de données
      const savedCategory = await newCategory.save();

      res.status(201).json({ category: savedCategory });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  })
);

module.exports = router;
