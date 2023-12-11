const express = require("express");
const path = require("path");
const router = express.Router();
const upload = require("../multer");
const User = require("../models/User");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const fs = require("fs");
const sendToken = require("../utils/jwtToken");
const sendMail = require("../utils/sendMail");
const { isAuthenticated, isAdmin } = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const randomstring = require("randomstring");
const cloudinary = require("cloudinary");
const createImageWithText = require("../utils/createImageWithText");
const Subscriber = require ("../models/Subscriber")

router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
//------------- create user ----------------
router.post(
  "/create-user-cloud",
  upload.single("file"),
  catchAsyncErrors(async (req, res, next) => {

      const { fname, lname, email, password } = req.body;
      const userEmail = await User.findOne({ email });

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

      if (userEmail && req.file) {
        const filename = req.file.filename;
        const filePath = `img/${filename}`;
        fs.unlink(filePath, (err) => {
          if (err) {
            console.log(err);
            res.status(500).json({ message: "error deleting file" });
          }
        });
        return next(new ErrorHandler("User already exists", 400));
      }

      const user = {
        fname: fname,
        lname: lname,
        email: email,
        password: password,
        avatar: {
          url: fileUrl,
          publicId: publicId,
        },
      };

      const activationToken = createActivationToken(user);

      const activationUrl = `http://localhost:3000/activation/${activationToken}`;

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
          email: user.email,
          subject: "Activate your account (user)",
          // Use the MJML template content in the message
          message: mjmlTemplate,
        });
        res.status(201).json({
          success: true,
          message: `Please check your email (${user.email}) to activate your account!`,
        });
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
    
  })
);

// create activation token
const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

// activate user
router.post(
  "/activation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { activation_token } = req.body;

      const newUser = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );

      if (!newUser) {
        return next(new ErrorHandler("Invalid token", 400));
      }
      const { fname, lname, email, password, avatar } = newUser;

      let user = await User.findOne({ email });

      if (user) {
        return next(new ErrorHandler("User already exists", 400));
      }
      user = await User.create({
        fname,
        lname,
        email,
        password,
        avatar,
      });

      sendToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// sign up with google
router.post("/signup-google", async (req, res, next) => {
  try {
    console.log("Signup Google : ", req.body.email)
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return next(new ErrorHandler("User already exists", 400));
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const newUser = new User({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        password: generatedPassword,
        avatar: {
          url: req.body.photo,
        },
      });
      await newUser.save();
      res.status(200).json({
        success: true,
        newUser,
      });
    }
  } catch (error) {
    next(error);
  }
});

// sign up with google
router.post("/login-google", async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next(
        new ErrorHandler("User not found please Sign Up to continue", 400)
      );
    } else {
      sendToken(user, 201, res);
      res.status(200).json({
        success: true,
        user,
      });
    }
  } catch (error) {
    next(error);
  }
});


// sign up with facebook
router.post("/signup-facebook", async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      sendToken(user, 201, res);
      return next(new ErrorHandler("User already exists", 400));
    } else {
      // Assuming you generate a random password for Facebook users too
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);

      const newUser = new User({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        password: generatedPassword,
        avatar: {
          url: req.body.photo,
        },
      });

      await newUser.save();

      res.status(200).json({
        success: true,
        newUser,
      });
    }
  } catch (error) {
    next(error);
  }
});

// Login with Facebook
router.post("/login-facebook", async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return next(
        new ErrorHandler("User not found. Please sign up to continue", 400)
      );
    } else {
      sendToken(user, 201, res);

      res.status(200).json({
        success: true, 
        user, 
      });
    }
  } catch (error) {
    next(error);
  }
});

// login user
router.post(
  "/login-user",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(new ErrorHandler("Please provide the all fields!", 400));
      }

      const user = await User.findOne({ email }).select("+password");

      if (!user) {
        return next(new ErrorHandler("User doesn't exists!", 400));
      }

      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        return next(
          new ErrorHandler("Please provide the correct information", 400)
        );
      }

      sendToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// load user
router.get(
  "/getuser",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);

      if (!user) {
        return next(new ErrorHandler("User doesn't exists", 400));
      }

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// log out user
router.get(
  "/logout",
  catchAsyncErrors(async (req, res, next) => {
    try {
      res.cookie("token", null, {
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

// Reset password User

router.post("/reset-password", async (req, res) => {
  try {
    const { email } = req.body;

    // Find the user by their email
    const user = await User.findOne({ email });

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    // Generate a new random password
    const newRandomPassword = randomstring.generate(10);

    // Update the user's password in the database
    user.password = newRandomPassword;
    await user.save();

    // Send an email to the user with the new random password
    await sendMail({
      email: user.email,
      subject: "Reset Password For User",
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

// update user info
router.put(
  "/update-user-info",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { fname, lname, phoneNumber, email } = req.body;

      const user = await User.findById(req.user.id);

      if (!user) {
        return next(new ErrorHandler("User not found", 400));
      }

      user.fname = fname;
      user.lname = lname;
      user.phoneNumber = phoneNumber;
      user.email = email;

      await user.save();

      res.status(201).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update user avatar
router.put(
  "/update-avatar",
  isAuthenticated,
  upload.single("avatar"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      let existsUser = await User.findById(req.user.id);
      if (req.body.avatar !== "") {
        const imageId = existsUser.avatar.publicId;

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

        existsUser.avatar = {
          url: fileUrl,
          publicId: publicId,
        };
      }
      await existsUser.save();

      res.status(200).json({
        success: true,
        user: existsUser,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update user password
router.put(
  "/update-user-password",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id).select("+password");

      const isPasswordMatched = await user.comparePassword(
        req.body.oldPassword
      );

      if (!isPasswordMatched) {
        return next(new ErrorHandler("Old password is incorrect!", 400));
      }

      if (req.body.newPassword !== req.body.confirmPassword) {
        return next(
          new ErrorHandler("Password doesn't matched with each other!", 400)
        );
      }
      user.password = req.body.newPassword;

      await user.save();

      res.status(200).json({
        success: true,
        message: "Password updated successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update user addresses
router.put(
  "/update-user-addresses",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);

      const sameTypeAddress = user.addresses.find(
        (address) => address.addressType === req.body.addressType
      );
      if (sameTypeAddress) {
        return next(
          new ErrorHandler(`${req.body.addressType} address already exists`)
        );
      }

      const existsAddress = user.addresses.find(
        (address) => address._id === req.body._id
      );

      if (existsAddress) {
        Object.assign(existsAddress, req.body);
      } else {
        // add the new address to the array
        user.addresses.push(req.body);
      }

      await user.save();

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// delete user address
router.delete(
  "/delete-user-address/:id",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const userId = req.user._id;
      const addressId = req.params.id;

      await User.updateOne(
        {
          _id: userId,
        },
        { $pull: { addresses: { _id: addressId } } }
      );

      const user = await User.findById(userId);

      res.status(200).json({ success: true, user });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// all users --- for admin
router.get(
  "/admin-all-users",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const users = await User.find().sort({
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        users,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// delete users --- admin
router.delete(
  "/delete-user/:id",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);

      if (!user) {
        return next(
          new ErrorHandler("User is not available with this id", 400)
        );
      }

      const imageId = user.avatar.publicId;

      await cloudinary.v2.uploader.destroy(imageId);

      await User.findByIdAndDelete(req.params.id);

      res.status(201).json({
        success: true,
        message: "User deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// find user information with the userId
router.get(
  "/user-info/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);

      res.status(201).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//Subscriber 
router.post('/saveSubscriber', async (req, res) => {
  try {
    const { email } = req.body;
    const newSubscriber = new Subscriber({ email: email });
    await newSubscriber.save();

    res.status(200).json({ message: 'Subscriber saved successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// get All Subscribers
router.get('/getAllSubscribers', 
isAuthenticated,
isAdmin("Admin"),
catchAsyncErrors(async (req, res, next) => {
  try {
    const subscribers = await Subscriber.find().sort({
      createdAt: -1,
    });
    res.status(201).json({
      success: true,
      subscribers,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
})
);

// delete Subscribers --- admin
router.delete(
  "/delete-subscriber/:id",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const subscriber = await Subscriber.findByIdAndDelete(req.params.id);

      if (!subscriber) {
        return next(
          new ErrorHandler("Subscriber is not available with this id", 400)
        );
      }
      res.status(201).json({
        success: true,
        message: "Subscriber deleted successfully!"
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
