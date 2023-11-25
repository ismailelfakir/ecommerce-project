const mongoose = require('mongoose');

// Define a Subscriber Schema with  email and createdAt
const subscriberSchema = new mongoose.Schema({
   
    email: {
        type: String,
        required: true,
        unique: true // Assuming you want the email to be unique for each subscriber
    },
    createdAt:{
        type: Date,
        default: Date.now(),
       },
});

// Create a Subscriber model
const Subscriber = mongoose.model('Subscriber', subscriberSchema);

module.exports = Subscriber;