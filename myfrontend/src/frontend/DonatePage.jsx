// src/components/DonatePage.jsx
import React, { useState, useEffect } from "react";
import { fetchPaymentDetails, saveDonation } from "../services/paymentApi";
import "./DonatePage.css";

function DonatePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentDetails, setPaymentDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [error, setError] = useState("");

  // Fetch payment details on component mount
  useEffect(() => {
    const getPaymentDetails = async () => {
      try {
        setIsLoading(true);
        const data = await fetchPaymentDetails();
        setPaymentDetails(data);
      } catch (error) {
        console.error("Error fetching payment details:", error);
        setError("Failed to load payment details. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    getPaymentDetails();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form inputs
    if (!name || !email || !phone || !amount || Number(amount) <= 0) {
      setError("Please fill in all fields and enter a valid donation amount.");
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");

      // Save donation data (sends data to the /api/donations endpoint)
      await saveDonation({ name, email, phone, amount: Number(amount) });

      // Show thank you message and reset form
      setShowThankYou(true);
      setName("");
      setEmail("");
      setPhone("");
      setAmount("");
    } catch (error) {
      console.error("Error saving donation:", error);
      setError("Failed to save donation. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Copy UPI ID to clipboard
  const handleCopyUPI = () => {
    if (paymentDetails.upiId) {
      navigator.clipboard.writeText(paymentDetails.upiId);
      alert("UPI ID copied to clipboard!");
    }
  };

  return (
    <div className="donate-page">
      <div className="donate-container">
        <h2>Donate</h2>
        <p>Your contributions help us make a difference.</p>

        {error && <p className="error-message">{error}</p>}

        {!showThankYou ? (
          <form onSubmit={handleSubmit} className="donate-form">
            <label>
              Name:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <label>
              Phone:
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </label>
            <label>
              Donation Amount (₹):
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="1"
                required
              />
            </label>

            <h3>Payment Details:</h3>
            {paymentDetails.upiId && (
              <>
                <p>UPI ID: {paymentDetails.upiId}</p>
                <button type="button" onClick={handleCopyUPI}>
                  Copy UPI ID
                </button>
              </>
            )}
            {paymentDetails.qrCodeUrl && (
              <>
                <img
                  src={paymentDetails.qrCodeUrl}
                  alt="QR Code"
                  className="qr-code-img"
                />
                <p>Scan the QR code to complete your payment.</p>
              </>
            )}

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Donation"}
            </button>
          </form>
        ) : (
          <div className="thank-you-message">
            <h3>Thank you for your donation, {name}!</h3>
            <p>We appreciate your support.</p>
          </div>
        )}

        {isLoading && <p>Loading payment details...</p>}
      </div>
    </div>
  );
}

export default DonatePage;
