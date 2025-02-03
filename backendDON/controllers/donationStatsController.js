// controllers/donationStatsController.js
const DonationStats = require('../models/donationStatsModel');

// Get aggregated donation stats
exports.getDonationStats = async (req, res) => {
  try {
    // Assuming there is only one stats document
    const stats = await DonationStats.findOne();
    if (!stats) {
      return res.status(404).json({ message: 'Donation stats not found' });
    }
    res.status(200).json(stats);
  } catch (error) {
    console.error("Error fetching donation stats:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update aggregated donation stats (upsert if no document exists)
exports.updateDonationStats = async (req, res) => {
  try {
    const { donors, percentage, raisedAmount } = req.body;

    if (donors === undefined || percentage === undefined || raisedAmount === undefined) {
      return res.status(400).json({ message: 'All fields (donors, percentage, raisedAmount) are required' });
    }

    const updatedStats = await DonationStats.findOneAndUpdate(
      {}, // Query to update the single stats document
      { donors, percentage, raisedAmount, updatedAt: Date.now() },
      { new: true, upsert: true }
    );

    res.status(200).json(updatedStats);
  } catch (error) {
    console.error("Error updating donation stats:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
