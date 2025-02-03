// models/donationModel.js
const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
  },
  amount: {
    type: Number,
    required: [true, "Donation amount is required"],
  },
  date: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Donation', donationSchema);
