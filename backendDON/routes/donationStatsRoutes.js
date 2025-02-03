// routes/donationStatsRoutes.js
const express = require('express');
const router = express.Router();
const { getDonationStats, updateDonationStats } = require('../controllers/donationStatsController');

// GET /api/donation-stats - Get aggregated donation stats
router.get('/', getDonationStats);

// PUT /api/donation-stats - Update aggregated donation stats
router.put('/', updateDonationStats);

module.exports = router;
