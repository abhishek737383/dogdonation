// src/components/DonatePage.jsx
import React, { useState, useEffect } from "react";
import { fetchPaymentDetails, saveDonation } from "../../services/paymentApi";
import "./DonatePage.css";

function DonatePage() {
  // Form data state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");

  // Payment details fetched from the API
  const [paymentDetails, setPaymentDetails] = useState({});

  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [showPaymentScreen, setShowPaymentScreen] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

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

  // Validate form fields then show payment screen
  const handleProceedToPayment = (e) => {
    e.preventDefault();

    // Validate inputs
    if (!name || !email || !phone || !amount || Number(amount) <= 0) {
      setError("Please fill in all fields and enter a valid donation amount.");
      return;
    }

    setError("");
    setShowPaymentScreen(true);
  };

  // Confirm donation (record donation after payment)
  const handleConfirmDonation = async () => {
    try {
      setIsSubmitting(true);
      setError("");

      // Save donation data (sends data to the donation API endpoint)
      await saveDonation({ name, email, phone, amount: Number(amount) });

      // Show thank you message and reset the form
      setShowThankYou(true);
      setName("");
      setEmail("");
      setPhone("");
      setAmount("");
      setShowPaymentScreen(false);
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

        {/* Step 1: Donor Details Form */}
        {!showThankYou && !showPaymentScreen && (
          <form onSubmit={handleProceedToPayment} className="donate-form">
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
            <button type="submit">Proceed to Payment</button>
          </form>
        )}

        {/* Step 2: Payment Details and Confirmation */}
        {showPaymentScreen && (
          <div className="payment-instructions">
            <h3>Complete Your Payment</h3>
            <div className="payment-details">
              {paymentDetails.upiId && (
                <div className="upi-section">
                  <p>UPI ID: {paymentDetails.upiId}</p>
                  <button type="button" onClick={handleCopyUPI}>
                    Copy UPI ID
                  </button>
                </div>
              )}
              {paymentDetails.qrCodeUrl && (
                <div className="qr-section">
                  <img
                    src={paymentDetails.qrCodeUrl}
                    alt="QR Code"
                    className="qr-code-img"
                  />
                  <p>Scan the QR code to complete your payment.</p>
                </div>
              )}
            </div>
            <div className="instructions">
              <h4>How to Pay:</h4>
              <ol>
                <li>Open your UPI payment app (e.g., Google Pay, PhonePe, Paytm)</li>
                <li>Select 'Send Money' or 'Pay via UPI ID'</li>
                <li>Enter the UPI ID shown above</li>
                <li>Enter the donation amount of ₹{amount}</li>
                <li>Verify the details and complete the payment</li>
                <li>Return here and click the confirmation button</li>
              </ol>
            </div>
            <div className="confirmation-buttons">
              <button
                type="button"
                onClick={handleConfirmDonation}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "I Have Completed Payment"}
              </button>
              <button
                type="button"
                className="back-button"
                onClick={() => setShowPaymentScreen(false)}
              >
                Back to Edit Details
              </button>
            </div>
          </div>
        )}

        {/* Thank You Message */}
        {showThankYou && (
          <div className="thank-you-message">
            <h3>Thank you for your donation, {name || "Donor"}!</h3>
            <p>We appreciate your support.</p>
          </div>
        )}

        {isLoading && <p>Loading payment details...</p>}
      </div>
    </div>
  );
}

export default DonatePage;
