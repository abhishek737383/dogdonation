// routes/paymentRoutes.js
const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware"); // Import the upload middleware
const {
  getPaymentDetails,
  updatePaymentDetails,
} = require("../controllers/paymentController");

// Define your routes
router.get("/details", getPaymentDetails);
router.put("/details", upload.single("qrCode"), updatePaymentDetails);

module.exports = router;
