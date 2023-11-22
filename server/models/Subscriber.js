const mongoose = require('mongoose');

// Define a Subscriber Schema with firstname, lastname, and email
const subscriberSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // Assuming you want the email to be unique for each subscriber
    },
    userId: {
        type: String,
        required: true
    }
});

// Create a Subscriber model
const Subscriber = mongoose.model('Subscriber', subscriberSchema);

module.exports = Subscriber;