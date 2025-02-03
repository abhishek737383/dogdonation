// src/services/donationApi.js
import axios from "axios";

// Define separate base URLs
const DONATIONS_URL = "http://localhost:5000/api/donations"; // For individual donation records (donor list)
const DONATION_STATS_URL = "http://localhost:5000/api/donation-stats"; // For aggregated donation stats

// Fetch aggregated donation stats data
export const fetchDonationData = async () => {
  try {
    const response = await axios.get(DONATION_STATS_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching donation data", error);
    throw error;
  }
};

// Update aggregated donation stats data
export const updateDonationData = async (donationData) => {
  try {
    const response = await axios.put(DONATION_STATS_URL, donationData);
    return response.data;
  } catch (error) {
    console.error("Error updating donation data", error);
    throw error;
  }
};

// Fetch individual donations (donor list)
export const fetchDonations = async () => {
  try {
    const response = await axios.get(DONATIONS_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching donations:", error);
    throw error;
  }
};
