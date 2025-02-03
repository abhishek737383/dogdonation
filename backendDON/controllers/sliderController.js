// controllers/sliderController.js
const cloudinary = require('../config/cloudinary');
const Slider = require('../models/Slider');

// Upload an image to Cloudinary and save the data to MongoDB
const uploadImage = async (req, res) => {
  try {
    const file = req.file; // Now the file is in memory (not on disk)

    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Upload directly from memory to Cloudinary
    const result = await cloudinary.uploader.upload_stream(
      { resource_type: 'auto' }, // Automatically detect file type (image, video, etc.)
      async (error, result) => {
        if (error) {
          return res.status(500).json({ message: 'Error uploading image', error: error.message });
        }

        const sliderImage = new Slider({
          url: result.secure_url,
          publicId: result.public_id,
        });

        await sliderImage.save();
        res.status(200).json(sliderImage);
      }
    );

    // Pass the buffer from the uploaded file to Cloudinary
    result.end(file.buffer);
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ message: 'Error uploading image', error: error.message });
  }
};

// Delete an image from Cloudinary and remove it from MongoDB
const deleteImage = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the image in the database using the id
    const image = await Slider.findById(id);
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    // Delete the image from Cloudinary
    await cloudinary.uploader.destroy(image.publicId);

    // Delete the image from MongoDB
    await Slider.findByIdAndDelete(id);

    res.status(200).json({ message: 'Image deleted successfully' });
  } catch (error) {
    console.error('Error deleting image:', error);
    res.status(500).json({ message: 'Error deleting image', error: error.message });
  }
};

// Get all slider images
const getAllImages = async (req, res) => {
  try {
    const images = await Slider.find();
    res.status(200).json(images);
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ message: 'Error fetching images', error: error.message });
  }
};

// Export the functions
module.exports = { uploadImage, deleteImage, getAllImages };
