// models/Payment.js
const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  upiId: {
    type: String,
    required: true,
  },
  qrCodeUrl: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Payment", paymentSchema);
