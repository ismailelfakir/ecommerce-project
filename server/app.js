const express = require("express");
const ErrorHandler = require("./middleware/error");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use("/", express.static("uploads"));

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "config/.env",
  });
}

// import routes
const userController = require("./controllers/userController");
const sellerController = require("./controllers/sellerController");
const productController = require("./controllers/productController");
const couponCodeController = require("./controllers/couponCodeController");
const eventController = require("./controllers/eventController");
const conversationController = require("./controllers/conversationController");
const messagesController = require("./controllers/messagesController");
const orderController = require("./controllers/orderController");
const paymentController = require("./controllers/paymentController");





app.use("/v2/user", userController);
app.use("/v2/seller", sellerController);
app.use("/v2/product", productController);
app.use("/v2/couponcode", couponCodeController);
app.use("/v2/event", eventController);
app.use("/v2/conversation", conversationController);
app.use("/v2/messages", messagesController);
app.use("/v2/payment", paymentController);
app.use("/v2/order", orderController);

// it's for ErrorHandling
app.use(ErrorHandler);

module.exports = app;
