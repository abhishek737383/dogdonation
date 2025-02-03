// routes/sliderRoutes.js
const express = require('express');
const router = express.Router();

// Import the controller functions
const { uploadImage, deleteImage, getAllImages } = require('../controllers/sliderController');

// POST route for uploading an image
router.post('/', uploadImage);

// DELETE route for deleting an image
router.delete('/:id', deleteImage);  // Make sure this is correctly defined

// GET route for fetching all images
router.get('/', getAllImages);

module.exports = router;
