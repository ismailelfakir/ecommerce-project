const express = require("express");
const path = require("path");
const router = express.Router();
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const Seller = require("../models/Seller");
const { isAuthenticated, isSeller, isAdmin } = require("../middleware/auth");
// const cloudinary = require("cloudinary");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const sendSellerToken = require("../utils/sellerToken");
const upload = require("../multer");
const fs = require("fs");

router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });


// create seller -----------------------------------------

router.post("/create-seller", upload.single("file"), async (req, res, next) => {
    try {
        const { fname, lname, email, password , address , phoneNumber , zipCode  } = req.body;
        const sellerEmail = await Seller.findOne({ email });
  
      if (sellerEmail) {
        const filename = req.file.filename;
        const filePath = `uploads/${filename}`;
        fs.unlink(filePath, (err) => {
          if (err) {
            console.log(err);
            res.status(500).json({ message: "error deliting file" });
          }
        });
        return next(new ErrorHandler("Seller already exists", 400));
      }
  
      const filename = req.file.filename;
      const fileUrl = path.join(filename);
  
      const seller = {
        fname: fname,
        lname: lname,
        email: email,
        password: password,
        avatar: fileUrl,
        address: address,
        phoneNumber: phoneNumber,
        zipCode: zipCode,
      };
      
      const activationToken = createActivationToken(seller);
  
      const activationUrl = `http://localhost:3000/seller/activation/${activationToken}`;
  
      try {
        await sendMail({
          email: seller.email,
          subject: "Activate your seller account",
          message: `Hello ${seller.lname}, please click on the link to activate your seller account: ${activationUrl}`,
        });
        res.status(201).json({
          success: true,
          message: `please check your email:- ${seller.email} to activate your account!`,
        });
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
  
    } catch (err) {
      return next(new ErrorHandler(err.message, 400));
    }
  });

  // create activation token
const createActivationToken = (seller) => {
    return jwt.sign(seller, process.env.ACTIVATION_SECRET, {
      expiresIn: "5m",
    });
  };
  
  // activate seller
  router.post(
    "/activation",
    catchAsyncErrors(async (req, res, next) => {
      try {
        const { activation_token } = req.body;
  
        const newSeller = jwt.verify(
          activation_token,
          process.env.ACTIVATION_SECRET
        );
  
        if (!newSeller) {
          return next(new ErrorHandler("Invalid token", 400));
        }
        const { fname , lname , email, password, avatar , address , phoneNumber , zipCode } = newSeller;
  
        let seller = await Seller.findOne({ email });
  
        if (seller) {
          return next(new ErrorHandler("Seller already exists", 400));
        }
        seller = await Seller.create({
          fname,
          lname,
          email,
          password,
          avatar,
          address , 
          phoneNumber, 
          zipCode
        });
  
    sendSellerToken(seller, 201, res);
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
    })
  );

// login seller ---------------------------------------------
router.post(
    "/login-seller",
    catchAsyncErrors(async (req, res, next) => {
      try {
        const { email, password } = req.body;
  
        if (!email || !password) {
          return next(new ErrorHandler("Please provide the all fields!", 400));
        }
  
        const seller = await Seller.findOne({ email }).select("+password");
  
        if (!seller) {
          return next(new ErrorHandler("Seller doesn't exists!", 400));
        }
  
        const isPasswordValid = await seller.comparePassword(password);
  
        if (!isPasswordValid) {
          return next(
            new ErrorHandler("Please provide the correct information", 400)
          );
        }
  
        sendSellerToken(seller, 201, res);
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
    })
  );

  // load seller
  router.get(
    "/getseller",
    isSeller,
    catchAsyncErrors(async (req, res, next) => {
      try {
        const seller = await Seller.findById(req.seller._id);
  
        if (!seller) {
          return next(new ErrorHandler("Seller doesn't exists", 400));
        }
  
        res.status(200).json({
          success: true,
          seller,
        });
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
    })
  );


module.exports = router;