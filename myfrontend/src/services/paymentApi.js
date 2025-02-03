// src/services/paymentApi.js
import axios from "axios";

const API_URL = "http://localhost:5000/api";

// Fetch payment details (example endpoint: /api/payments/details)
export const fetchPaymentDetails = async () => {
  try {
    const response = await axios.get(`${API_URL}/payments/details`);
    return response.data;
  } catch (error) {
    console.error("Error fetching payment details:", error);
    throw error;
  }
};

// Update payment details (example endpoint: /api/payments/details)
export const updatePaymentDetails = async (formData) => {
  try {
    const response = await axios.put(`${API_URL}/payments/details`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating payment details:", error);
    throw error;
  }
};

// Save an individual donation (sends data to /api/donations)
export const saveDonation = async (donationData) => {
  try {
    const response = await axios.post(`${API_URL}/donations`, donationData);
    return response.data;
  } catch (error) {
    console.error("Error saving donation:", error);
    throw error;
  }
};
