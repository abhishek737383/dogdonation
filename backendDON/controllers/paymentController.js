// controllers/paymentController.js
const Payment = require("../models/paymentModel");
const cloudinary = require("../config/cloudinary");

// Get payment details
exports.getPaymentDetails = async (req, res) => {
  try {
    // console.log("Fetching payment details...");
    const payment = await Payment.findOne();
    if (!payment) {
      console.log("No payment details found in database");
      return res.status(404).json({ message: "Payment details not found" });
    }
    res.status(200).json(payment);
  } catch (error) {
    console.error("Error fetching payment details:", error);
    res.status(500).json({ error: "Error fetching payment details" });
  }
};

// Update or create payment details
exports.updatePaymentDetails = async (req, res) => {
  const { upiId } = req.body;
  const existingPayment = await Payment.findOne();

  try {
    let qrCodeUrl = existingPayment ? existingPayment.qrCodeUrl : null; // Keep existing QR code URL if not updated

    // Check if a new file is uploaded
    if (req.file) {
      // Upload the file to Cloudinary
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: "payments" },
          (error, result) => {
            if (error) {
              reject(new Error("Cloudinary upload failed"));
            }
            resolve(result);
          }
        ).end(req.file.buffer); // Use buffer for Cloudinary upload
      });

      // Get the Cloudinary URL
      qrCodeUrl = result.secure_url;
    }

    // If no payment exists, create a new one
    if (!existingPayment) {
      const payment = new Payment({ upiId, qrCodeUrl });
      await payment.save();
      return res.status(200).json({ message: "Payment details created", payment });
    }

    // Update existing payment details
    existingPayment.upiId = upiId;
    existingPayment.qrCodeUrl = qrCodeUrl;

    await existingPayment.save();
    res.status(200).json({ message: "Payment details updated successfully", payment: existingPayment });

  } catch (error) {
    console.error("Error updating payment details:", error);
    res.status(500).json({ error: error.message || "Error updating payment details" });
  }
};
