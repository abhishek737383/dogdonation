// models/donationStatsModel.js
const mongoose = require('mongoose');

const donationStatsSchema = new mongoose.Schema({
  donors: {
    type: Number,
    required: [true, "Donors count is required"],
  },
  percentage: {
    type: Number,
    required: [true, "Percentage is required"],
  },
  raisedAmount: {
    type: Number,
    required: [true, "Raised amount is required"],
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('DonationStats', donationStatsSchema);
