import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // Premium Scoped Styles
import Footer from './Footer'; // Footer Component
import { fetchDonationData } from '../services/donationApi'; // API Service

function Home() {
  const navigate = useNavigate();

  // State variables for donation data
  const [donationPercentage, setDonationPercentage] = useState(0);
  const [donors, setDonors] = useState(0);
  const [raisedAmount, setRaisedAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch donation data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchDonationData();
        setDonationPercentage(data.percentage);
        setDonors(data.donors);
        setRaisedAmount(data.raisedAmount);
      } catch (err) {
        console.error('Error fetching donation data:', err);
        setError('Failed to load donation data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDonateClick = () => navigate('/donate');

  return (
    <div className="home-page"> {/* Scoped class for styles */}
      <div className="home-container">
        {isLoading && <p className="loading-text">Loading donation data...</p>}
        {error && <p className="error-text">{error}</p>}

        {!isLoading && !error && (
          <>
            {/* Intro Section */}
            <section className="intro-section">
              <h1>Behind every donation is a story of change. Help us create more happy endings.</h1>
              <p className="intro-text">
                Your generous contribution can help us provide dog coats to strays facing the coldwave.
              </p>
              <button className="donate-btn" onClick={handleDonateClick}>Donate Now</button>
            </section>

            {/* Donation Progress */}
            <section className="donation-progress">
              <h2>Donation Progress</h2>
              <div className="progress-bar-container">
                <div className="progress-bar" style={{ width: `${donationPercentage}%` }}></div>
              </div>
              <div className="stats">
                <span>{donationPercentage}% of Goal Reached</span>
                <span>{donors} Donors</span>
                <span>₹{raisedAmount} Raised</span>
              </div>
            </section>

            {/* Goal Section */}
            <section className="goal-details">
              <div className="goal-info">
                <h3>Goal: ₹23,06,587</h3>
              </div>
            </section>

            {/* Donation Information */}
            <section className="donation-info">
              <h2>Why Your Donation Matters</h2>
              <p>
                Stray dogs face numerous challenges during winter months, including freezing temperatures,
                lack of food, and the constant threat of disease. Many suffer in silence, but your donation
                provides immediate relief by supplying dog coats that help them survive the cold.
              </p>

              <h3>How Your Donation Helps</h3>
              <p>Each donation directly contributes to:</p>
              <ul>
                <li><strong>Protecting Stray Dogs:</strong> Warm coats shield dogs from extreme cold, preventing hypothermia.</li>
                <li><strong>Medical Care:</strong> Donations fund checkups, vaccinations, and parasite treatments.</li>
                <li><strong>Rescue & Adoption:</strong> Some stray dogs are rescued and placed in foster homes for adoption.</li>
                <li><strong>Awareness Campaigns:</strong> Funds support education about stray animals and responsible pet ownership.</li>
              </ul>

              <h3>Impact of Your Contribution</h3>
              <p>For every ₹1,000 donated, we can:</p>
              <ul>
                <li>Provide warm coats for multiple stray dogs</li>
                <li>Fund medical treatments for ill dogs</li>
                <li>Support local shelters and foster homes</li>
              </ul>

              <h3>Real Stories of Change</h3>
              <p>
                Meet Max, a stray dog rescued from the streets last winter. Max suffered from extreme cold and malnutrition.
                Thanks to donations, he received a warm coat, medical attention, and found a foster home. Today, Max is
                healthy and ready for adoption into a loving family.
              </p>

              <p>Your support not only saves lives but also gives these dogs the second chance they deserve.</p>

              <button className="donate-btn-green" onClick={handleDonateClick}>Donate Now</button>
            </section>
          </>
        )}

       
      </div>
       {/* Footer */}
       <Footer />
    </div>
    
  );
}

export default Home;
