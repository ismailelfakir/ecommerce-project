const express = require("express");
const path = require("path");
const router = express.Router();
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const Seller = require("../models/Seller");
const { isAuthenticated, isSeller, isAdmin } = require("../middleware/auth");
const cloudinary = require("cloudinary");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const sendSellerToken = require("../utils/sellerToken");
const upload = require("../multer");
const fs = require("fs");
const randomstring = require('randomstring');
const createImageWithText = require("../utils/createImageWithText");


router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});


// create seller -----------------------------------------
router.post("/create-seller-cloud", upload.single("file"), async (req, res, next) => {

  const { fname, lname, email, password } = req.body;
  const sellerEmail = await Seller.findOne({ email });

  let fileUrl = '';
  let publicId = '';

  if (!req.file) {
    // Generate a default image based on the first letter of the first name
    const firstLetter = fname.charAt(0).toUpperCase() + lname.charAt(0).toUpperCase();
    const defaultImage = createImageWithText(firstLetter); // Use the function from the utility file

    // Upload the default image to Cloudinary
    const defaultImageResult = await cloudinary.uploader.upload(defaultImage);
    fileUrl = defaultImageResult.secure_url;
    publicId = defaultImageResult.public_id;
  } else {
    // Proceed with the existing code for handling uploaded file
    const result = await cloudinary.uploader.upload(req.file.path);
    fileUrl = result.secure_url;
    publicId = result.public_id;

    // Delete the local file after successful upload to Cloudinary
    fs.unlink(req.file.path, (err) => {
      if (err) {
        console.error("Error deleting local file:", err);
        errorOccurred = true;
      }
    });
  }

  if (sellerEmail && req.file) {
    const filename = req.file.filename;
    const filePath = `img/${filename}`;
    fs.unlink(filePath, (err) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: "error deleting file" });
      }
    });
    return next(new ErrorHandler("Seller already exists", 400));
  }

  const seller = {
    fname: fname,
    lname: lname,
    email: email,
    password: password,
    avatar: {
      url: fileUrl,
      publicId: publicId,
    },
  };

  const activationToken = createActivationToken(seller);

  const activationUrl = `http://localhost:3000/seller/activation/${activationToken}`;

  const mjmlTemplate = `
      <mjml>
      <mj-head>
        <mj-title>Email Verification</mj-title>
        <mj-font name="Helvetica Neue" href="https://fonts.googleapis.com/css?family=Helvetica+Neue" />
        <mj-attributes>
          <mj-all font-family="Helvetica Neue, Helvetica, Arial, sans-serif" />
          <mj-text font-size="18px" line-height="1.5" />
          <mj-button background-color="#F45E43" color="white" />
        </mj-attributes>
        <mj-style>
          .header-top {
            background-color: #000000;
            color: white;
          }
          .logo img {
            max-width: 100px;
          }
        </mj-style>
      </mj-head>
      <mj-body>
        <mj-section padding="10px 0" css-class="header-top">
          <mj-column>
            <mj-image src="" css-class="logo" alt="logo" width="100px"></mj-image>
          </mj-column>
        </mj-section>
        <mj-section background-color="#FEFEFE">
          <mj-column>
            <mj-text font-size="22px" font-weight="bold" color="#FEFEFE" padding-bottom="30px">Email verification</mj-text>
            <mj-text>Hi ${fname},</mj-text>
            <mj-text>You're almost set to start enjoying MOROCCAN PRODUCTS. Simply click the link below to verify your email address and get started. The link expires in 48 hours.</mj-text>
            <mj-button href="${activationUrl}" background-color="#000000">Activate your account</mj-button>
          </mj-column>
        </mj-section>
        <mj-section padding-top="30px">
          <mj-column>
            <mj-social font-size="15px" icon-size="30px" mode="horizontal">
              <mj-social-element name="facebook"></mj-social-element>
              <mj-social-element name="twitter"></mj-social-element>
              <mj-social-element name="linkedin"></mj-social-element>
              <mj-social-element name="instagram"></mj-social-element>
            </mj-social>
          </mj-column>
        </mj-section>
        <mj-section background-color="#EEEEEE" padding="20px 0">
          <mj-column>
            <mj-text font-size="12px" color="#333333" align="center">
              800 Broadway Suit 1500 New York, NY 000423, USA
            </mj-text>
          </mj-column>
        </mj-section>
        <mj-section padding="10px 0">
          <mj-column>
            <mj-text font-size="12px" align="center">
              <a href="link_to_privacy_policy" style="color: #333333; text-decoration: none;">Privacy Policy</a> | 
              <a href="link_to_contact_details" style="color: #333333; text-decoration: none;">Contact Details</a>
            </mj-text>
          </mj-column>
        </mj-section>
      </mj-body>
    </mjml>
`;

  try {
    await sendMail({
      email: seller.email,
      subject: "Activate your account (Seller)",
      message: mjmlTemplate,
    });
    res.status(201).json({
      success: true,
      message: `Please check your email (${seller.email}) to activate your account!`,
    });
  } catch (error) {
    errorOccurred = true;
    return next(new ErrorHandler(error.message, 500));
  }

});

// create activation token
const createActivationToken = (seller) => {
  return jwt.sign(seller, process.env.ACTIVATION_SECRET, {
    expiresIn: "10m",
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
      console.log("newSeller : ", newSeller)
      const { fname, lname, email, password, avatar, address, phoneNumber, zipCode } = newSeller;

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
        address,
        phoneNumber,
        zipCode
      });

      sendSellerToken(seller, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// sign up with google
router.post("/signup-google", async (req, res, next) => {
  try {
    const seller = await Seller.findOne({ email: req.body.email });
    if (seller) {
      sendSellerToken(seller, 201, res);
      return next(new ErrorHandler("Seller already exists", 400));
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const newSeller = new Seller({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        password: generatedPassword,
        avatar: {
          url: req.body.photo,
        },
      });
      await newSeller.save();
      res.status(200).json({
        success: true,
        newSeller,
      });
    }
  } catch (error) {
    next(error);
  }
});

// login with google
router.post("/login-google", async (req, res, next) => {
  try {
    const seller = await Seller.findOne({ email: req.body.email });
    if (!seller) {
      return next(
        new ErrorHandler("Seller not found please Sign Up to continue", 400)
      );
    } else {
      sendSellerToken(seller, 201, res);
      res.status(200).json({
        success: true,
        seller,
      });
    }
  } catch (error) {
    next(error);
  }
});

// Sign up with Facebook
router.post("/signup-facebook", async (req, res, next) => {
  try {
    const seller = await Seller.findOne({ email: req.body.email });
    if (seller) {
      sendSellerToken(seller, 201, res);
      return next(new ErrorHandler("Seller already exists", 400));
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const newSeller = new Seller({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        password: generatedPassword,
        avatar: {
          url: req.body.photo,
        },
      });
      await newSeller.save();
      res.status(200).json({
        success: true,
        newSeller,
      });
    }
  } catch (error) {
    next(error);
  }
});

// Login with Facebook
router.post("/login-facebook", async (req, res, next) => {
  try {
    const seller = await Seller.findOne({ email: req.body.email });
    if (!seller) {
      return next(
        new ErrorHandler("Seller not found. Please sign up to continue", 400)
      );
    } else {
      sendSellerToken(seller, 201, res);
      res.status(200).json({
        success: true,
        seller,
      });
    }
  } catch (error) {
    next(error);
  }
});
// update seller avatar
router.put(
  "/update-seller-avatar",
  isSeller,
  upload.single("avatar"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      let existsSeller = await Seller.findById(req.seller.id);
      if (req.body.avatar !== "") {
        const imageId = existsSeller.avatar.publicId;

        await cloudinary.v2.uploader.destroy(imageId);

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

        existsSeller.avatar = {
          url: fileUrl,
          publicId: publicId,
        };
      }
      await existsSeller.save();

      res.status(200).json({
        success: true,
        seller: existsSeller,
      });
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

// log out from seller page
router.get(
  "/logout",
  catchAsyncErrors(async (req, res, next) => {
    try {
      res.cookie("seller_token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
      res.status(201).json({
        success: true,
        message: "Log out successful!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update seller info
router.put(
  "/update-seller-info",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { fname, lname, description, address, phoneNumber, zipCode } = req.body;

      const seller = await Seller.findOne(req.seller._id);

      if (!seller) {
        return next(new ErrorHandler("Seller not found", 400));
      }

      seller.fname = fname;
      seller.lname = lname;
      seller.description = description;
      seller.address = address;
      seller.phoneNumber = phoneNumber;
      seller.zipCode = zipCode;

      await seller.save();

      res.status(201).json({
        success: true,
        seller,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Reset password seller

router.post('/reset-password-seller', async (req, res, next) => {
  try {
    const { email } = req.body;

    // Find the seller by their email
    const seller = await Seller.findOne({ email });

    if (!seller) {
      return next(new ErrorHandler("Seller not found", 404));
    }

    // Generate a new random password
    const newRandomPassword = randomstring.generate(10);

    // Update the seller's password in the database
    seller.password = newRandomPassword;
    await seller.save();

    // Send an email to the seller with the new random password
    await sendMail({
      email: seller.email,
      subject: "Reset Password For Seller",
      message: `Your new password is: ${newRandomPassword}`,
    });

    res.status(200).json({
      success: true,
      message: `A new random password has been sent to your email address. Please check your inbox.`,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});


// get seller info
router.get(
  "/get-seller-info/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const seller = await Seller.findById(req.params.id);
      res.status(201).json({
        success: true,
        seller,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// all sellers --- for admin
router.get(
  "/admin-all-sellers",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const sellers = await Seller.find().sort({
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        sellers,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// delete sellers --- admin
router.delete(
  "/delete-seller/:id",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const seller = await Seller.findById(req.params.id);

      if (!seller) {
        return next(
          new ErrorHandler("Seller is not available with this id", 400)
        );
      }

      const imageId = seller.avatar.publicId;

      await cloudinary.v2.uploader.destroy(imageId);

      await Seller.findByIdAndDelete(req.params.id);

      res.status(201).json({
        success: true,
        message: "Seller deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);



// create seller -----------------------------------------
router.post("/create-seller-step", upload.single("file"), async (req, res, next) => {

  const { fname, lname, email, password, address, phoneNumber, zipCode, authType, file } = req.body;
  const sellerEmail = await Seller.findOne({ email });

  let fileUrl = '';
  let publicId = '';

  if (!req.file) {
    if (file) {
      fileUrl = file;
    } else {
      // Generate a default image based on the first letter of the first name
      const firstLetter = fname.charAt(0).toUpperCase() + lname.charAt(0).toUpperCase();
      const defaultImage = createImageWithText(firstLetter); // Use the function from the utility file
      // Upload the default image to Cloudinary
      const defaultImageResult = await cloudinary.uploader.upload(defaultImage);
      fileUrl = defaultImageResult.secure_url;
      publicId = defaultImageResult.public_id;
    }

  } else {
    // Proceed with the existing code for handling uploaded file
    const result = await cloudinary.uploader.upload(req.file.path);
    fileUrl = result.secure_url;
    publicId = result.public_id;

    // Delete the local file after successful upload to Cloudinary
    fs.unlink(req.file.path, (err) => {
      if (err) {
        console.error("Error deleting local file:", err);
        errorOccurred = true;
      }
    });
  }

  if (sellerEmail && req.file) {
    const filename = req.file.filename;
    const filePath = `img/${filename}`;
    fs.unlink(filePath, (err) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: "error deleting file" });
      }
    });
    return next(new ErrorHandler("Seller already exists", 400));
  }

  const seller = {
    fname: fname,
    lname: lname,
    email: email,
    password: password,
    address: address, 
    phoneNumber : phoneNumber,
    zipCode : zipCode,
    avatar: {
      url: fileUrl,
      publicId: publicId,
    },
  };

  const activationToken = createActivationToken(seller);

  const activationUrl = `http://localhost:3000/seller/activation/${activationToken}`;

  const mjmlTemplate = `
    <mjml>
    <mj-head>
      <mj-title>Email Verification</mj-title>
      <mj-font name="Helvetica Neue" href="https://fonts.googleapis.com/css?family=Helvetica+Neue" />
      <mj-attributes>
        <mj-all font-family="Helvetica Neue, Helvetica, Arial, sans-serif" />
        <mj-text font-size="18px" line-height="1.5" />
        <mj-button background-color="#F45E43" color="white" />
      </mj-attributes>
      <mj-style>
        .header-top {
          background-color: #000000;
          color: white;
        }
        .logo img {
          max-width: 100px;
        }
      </mj-style>
    </mj-head>
    <mj-body>
      <mj-section padding="10px 0" css-class="header-top">
        <mj-column>
          <mj-image src="" css-class="logo" alt="logo" width="100px"></mj-image>
        </mj-column>
      </mj-section>
      <mj-section background-color="#FEFEFE">
        <mj-column>
          <mj-text font-size="22px" font-weight="bold" color="#FEFEFE" padding-bottom="30px">Email verification</mj-text>
          <mj-text>Hi ${fname},</mj-text>
          <mj-text>You're almost set to start enjoying MOROCCAN PRODUCTS. Simply click the link below to verify your email address and get started. The link expires in 48 hours.</mj-text>
          <mj-button href="${activationUrl}" background-color="#000000">Activate your account</mj-button>
        </mj-column>
      </mj-section>
      <mj-section padding-top="30px">
        <mj-column>
          <mj-social font-size="15px" icon-size="30px" mode="horizontal">
            <mj-social-element name="facebook"></mj-social-element>
            <mj-social-element name="twitter"></mj-social-element>
            <mj-social-element name="linkedin"></mj-social-element>
            <mj-social-element name="instagram"></mj-social-element>
          </mj-social>
        </mj-column>
      </mj-section>
      <mj-section background-color="#EEEEEE" padding="20px 0">
        <mj-column>
          <mj-text font-size="12px" color="#333333" align="center">
            800 Broadway Suit 1500 New York, NY 000423, USA
          </mj-text>
        </mj-column>
      </mj-section>
      <mj-section padding="10px 0">
        <mj-column>
          <mj-text font-size="12px" align="center">
            <a href="link_to_privacy_policy" style="color: #333333; text-decoration: none;">Privacy Policy</a> | 
            <a href="link_to_contact_details" style="color: #333333; text-decoration: none;">Contact Details</a>
          </mj-text>
        </mj-column>
      </mj-section>
    </mj-body>
  </mjml>
`;

  try {
    await sendMail({
      email: seller.email,
      subject: "Activate your account (Seller)",
      message: mjmlTemplate,
    });
    res.status(201).json({
      success: true,
      message: `Please check your email (${seller.email}) to activate your account!`,
    });
  } catch (error) {
    errorOccurred = true;
    return next(new ErrorHandler(error.message, 500));
  }

});


module.exports = router;