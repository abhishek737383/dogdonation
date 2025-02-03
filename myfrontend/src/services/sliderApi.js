// src/services/sliderApi.js
import axios from 'axios';

// Use the environment variable if set, otherwise default to localhost:5000
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Function to fetch slider images
export const fetchSliderImages = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/slider`);
    return response.data;
  } catch (error) {
    console.error('Error fetching slider images:', error);
    throw error;
  }
};
