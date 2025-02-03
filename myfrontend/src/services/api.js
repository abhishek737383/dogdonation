import axios from 'axios';

// Base URL for your image slider API on localhost:5000
const API_URL = 'http://localhost:5000/api/slider';

/**
 * Fetches all images from the backend.
 * @returns {Promise<Array>} An array of image objects.
 */
export const fetchImages = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data; // Expecting an array of image objects
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
};

/**
 * Uploads a new image to the backend.
 * @param {FormData} formData - The FormData object containing the image file.
 * @returns {Promise<Object>} The newly uploaded image data.
 */
export const uploadImage = async (formData) => {
  try {
    const response = await axios.post(API_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data; // Expecting the new image object returned from the backend
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

/**
 * Deletes an image from the backend.
 * @param {string} id - The ID of the image to delete.
 * @returns {Promise<Object>} The response from the backend.
 */
export const deleteImage = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data; // Expecting a confirmation or the deleted image object
  } catch (error) {
    console.error('Error deleting image:', error);
    throw error;
  }
};
