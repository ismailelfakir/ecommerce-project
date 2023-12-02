const express = require("express");
const router = express.Router();
const userController = require("./userController");
const upload = require("../multer");
const { isAuthenticated, isAdmin } = require("../middleware/auth");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

