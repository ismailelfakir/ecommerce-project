const Messages = require("../models/Messages");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const express = require("express");
const cloudinary = require("cloudinary");
const router = express.Router();
const upload = require("../multer");

// create new message
router.post(
  "/create-new-message",
  upload.array("images"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const messageData = req.body;
      if (req.files) {
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
              console.error("Error deleting file:", err);
              errorOccurred = true; // Set the flag if an error occurs during deletion
            }
          });
        });

        messageData.images = imageUrls;
      }

      messageData.conversationId = req.body.conversationId;
      messageData.sender = req.body.sender;
      messageData.text = req.body.text;

      const message = new Messages({
        conversationId: messageData.conversationId,
        text: messageData.text,
        sender: messageData.sender,
        images: messageData.images ? messageData.images : undefined,
      });

      await message.save();

      res.status(201).json({
        success: true,
        message,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message), 500);
    }
  })
);

// get all messages with conversation id
router.get(
  "/get-all-messages/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const messages = await Messages.find({
        conversationId: req.params.id,
      });

      res.status(201).json({
        success: true,
        messages,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message), 500);
    }
  })
);


module.exports = router;
