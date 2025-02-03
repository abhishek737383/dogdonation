// src/components/SliderPage.jsx
import React, { useEffect, useState } from 'react';
import { fetchSliderImages } from '../../services/sliderApi'; // Import our API function
import './SliderPage.css';

function SliderPage() {
  const [sliderImages, setSliderImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch slider images using our API function
  useEffect(() => {
    const getSliderImages = async () => {
      try {
        setIsLoading(true);
        const data = await fetchSliderImages();
        setSliderImages(data);
      } catch (error) {
        console.error('Error fetching slider images:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getSliderImages();
  }, []);

  // Auto-scroll functionality using transform
  useEffect(() => {
    if (sliderImages.length > 0) {
      const intervalId = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % sliderImages.length);
      }, 5000); // Auto-scroll every 5 seconds

      return () => clearInterval(intervalId);
    }
  }, [sliderImages]);

  return (
    <div className="slider-page">
      {isLoading ? (
        <div className="loading-message">Please wait...</div>
      ) : (
        <>
          <div
            className="slider-container"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
              transition: 'transform 0.5s ease-in-out',
            }}
          >
            {sliderImages.map((image, index) => (
              <div key={index} className="slider-slide">
                <div className="slider-image-container">
                  <img src={image.url} alt={`Slide ${index + 1}`} />
                </div>
                <div className="slider-overlay">
                  <button className="slider-btn">Start Changing Lives</button>
                </div>
              </div>
            ))}
          </div>
          {/* Dots Navigation */}
          <div className="slider-dots">
            {sliderImages.map((_, index) => (
              <div
                key={index}
                className={`dot ${currentIndex === index ? 'active' : ''}`}
                onClick={() => setCurrentIndex(index)}
              ></div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default SliderPage;
