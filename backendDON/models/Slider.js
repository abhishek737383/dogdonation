const mongoose = require('mongoose');

const sliderSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  publicId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Slider', sliderSchema);
