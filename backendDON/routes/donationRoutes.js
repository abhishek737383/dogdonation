// routes/donationRoutes.js
const express = require('express');
const router = express.Router();
const { saveDonation, getDonations } = require('../controllers/donationController');

// POST /api/donations - Save an individual donation
router.post('/', saveDonation);

// GET /api/donations - Get all individual donations
router.get('/', getDonations);

module.exports = router;
