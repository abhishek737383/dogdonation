// controllers/donationController.js
const Donation = require('../models/donationModel');

// Save an individual donation
exports.saveDonation = async (req, res) => {
  try {
    const { name, email, phone, amount } = req.body;

    // Validate input
    if (!name || !email || !phone || !amount) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const donationAmount = Number(amount);
    if (isNaN(donationAmount) || donationAmount <= 0) {
      return res.status(400).json({ error: "Donation amount must be a positive number" });
    }

    const donation = new Donation({
      name,
      email,
      phone,
      amount: donationAmount
    });

    await donation.save();

    res.status(201).json({ message: "Donation saved successfully", donation });
  } catch (error) {
    console.error("Error saving donation:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get all individual donations
exports.getDonations = async (req, res) => {
  try {
    const donations = await Donation.find().sort({ date: -1 });
    res.status(200).json(donations);
  } catch (error) {
    console.error("Error fetching donations:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
// all code working