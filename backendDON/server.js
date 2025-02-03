// server.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const sliderRoutes = require('./routes/sliderRoutes');  // Ensure this is correctly imported
// Import routes
const donationRoutes = require('./routes/donationRoutes');
const donationStatsRoutes = require('./routes/donationStatsRoutes');
// (You can import other routes such as sliderRoutes or paymentRoutes similarly)
const paymentRoutes = require('./routes/paymentRoutes');

require('dotenv').config();

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log('Error connecting to MongoDB', error));

// Middleware
app.use(cors());
app.use(express.json());

// Set up multer for memory storage (for production/live server)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Use the routes
app.use('/api/slider', upload.single('image'), sliderRoutes);
app.use("/api/payments", paymentRoutes); // Ensure this matches the prefix you're using
app.use('/api/donations', donationRoutes);           // For individual donation records
app.use('/api/donation-stats', donationStatsRoutes);   // For aggregated donation stats

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
