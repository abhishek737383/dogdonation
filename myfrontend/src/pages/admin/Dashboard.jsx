// src/components/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { fetchImages, uploadImage, deleteImage } from '../../services/api';
import './AdminDashboard.css';

const Dashboard = () => {
  // State for secret key authentication
  const [secretKey, setSecretKey] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');

  // States for image management
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [deletingImageId, setDeletingImageId] = useState(null);

  // Hard-coded secret key (replace with env var or secure method)
  const ADMIN_SECRET = 'abhi@123';

  // Check localStorage for persistent authentication on mount
  useEffect(() => {
    const storedAuth = localStorage.getItem('adminAuthenticated');
    if (storedAuth === 'true') {
      setAuthenticated(true);
      getImages();
    }
  }, []);

  // Function to handle secret key submission
  const handleAuth = () => {
    if (secretKey === ADMIN_SECRET) {
      setAuthenticated(true);
      setAuthError('');
      localStorage.setItem('adminAuthenticated', 'true');
      getImages();
    } else {
      setAuthError('Incorrect secret key. Please try again.');
    }
  };

  // Fetch images from the API
  const getImages = async () => {
    try {
      const data = await fetchImages();
      setImages(data);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle image upload
  const handleUpload = async () => {
    if (file) {
      setIsUploading(true);
      const formData = new FormData();
      formData.append('image', file);
      try {
        const data = await uploadImage(formData);
        setImages([...images, data]);
        setFile(null);
      } catch (error) {
        console.error('Upload failed:', error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  // Handle image deletion
  const handleDelete = async (id) => {
    setDeletingImageId(id);
    try {
      await deleteImage(id);
      setImages(images.filter((image) => image._id !== id));
    } catch (error) {
      console.error('Delete failed:', error);
    } finally {
      setDeletingImageId(null);
    }
  };

  // Optional: Logout handler to clear authentication state
  const handleLogout = () => {
    setAuthenticated(false);
    localStorage.removeItem('adminAuthenticated');
  };

  // If not authenticated, render the secret key input form
  if (!authenticated) {
    return (
      <div className="admin-container auth-container">
        <h1>Admin Access</h1>
        <p>Please enter the secret key to continue.</p>
        <input
          type="password"
          value={secretKey}
          onChange={(e) => setSecretKey(e.target.value)}
          placeholder="Enter Secret Key"
        />
        <button onClick={handleAuth}>Submit</button>
        {authError && <p className="error-message">{authError}</p>}
      </div>
    );
  }

  // Render the admin dashboard once authenticated
  return (
    <div className="admin-container">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Upload Section */}
      <div className="upload-section">
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload} disabled={isUploading}>
          {isUploading ? 'Please wait... Uploading' : 'Upload'}
        </button>
      </div>

      {/* Image List Section */}
      <div className="image-list">
        {images.map((image) => (
          <div key={image._id} className="image-item">
            <img src={image.url} alt={image.name} />
            <button
              onClick={() => handleDelete(image._id)}
              disabled={deletingImageId === image._id}
            >
              {deletingImageId === image._id ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
