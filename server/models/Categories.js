const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const categorySchema = new mongoose.Schema({

  title: {
    type: String,
    required: true,
  },
  subTitle: {
    type: String,
    // You can set 'required: true' if subTitle is mandatory
  },
  avatar: {
     url: { type: String, required: true },
    publicId: { type: String, required: true },
  },
});


module.exports = mongoose.model("Category", categorySchema);

