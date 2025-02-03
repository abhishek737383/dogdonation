// src/components/ManageDonations.jsx
import React, { useState, useEffect } from "react";
import {
  fetchDonationData,
  updateDonationData,
  fetchDonations,
} from "../../services/donationApi";
import {
  fetchPaymentDetails,
  updatePaymentDetails,
} from "../../services/paymentApi";
import styles from "./ManageDonations.module.css"; // Updated import using CSS Modules

function ManageDonations() {
  const [upiId, setUpiId] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [file, setFile] = useState(null);
  const [donors, setDonors] = useState([]);
  const [donationPercentage, setDonationPercentage] = useState(0);
  const [donorsCount, setDonorsCount] = useState(0);
  const [raisedAmount, setRaisedAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setIsLoading(true);

        const paymentData = await fetchPaymentDetails();
        setUpiId(paymentData.upiId);
        setQrCodeUrl(paymentData.qrCodeUrl);

        const progressData = await fetchDonationData();
        setDonationPercentage(progressData.percentage);
        setDonorsCount(progressData.donors);
        setRaisedAmount(progressData.raisedAmount);

        const donorList = await fetchDonations();
        setDonors(donorList);
      } catch (err) {
        setError("Failed to fetch data. Please try again.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const handleUpdatePaymentDetails = async (e) => {
    e.preventDefault();

    if (!upiId.trim()) {
      setError("UPI ID is required.");
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      const formData = new FormData();
      formData.append("upiId", upiId);

      if (file) {
        formData.append("qrCode", file);
      } else if (qrCodeUrl) {
        formData.append("qrCodeUrl", qrCodeUrl);
      }

      const updatedDetails = await updatePaymentDetails(formData);
      setQrCodeUrl(updatedDetails.qrCodeUrl);
      alert("Payment details updated successfully!");
    } catch (err) {
      console.error("Update error:", err);
      setError("Failed to update payment details. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateProgress = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      setError("");

      await updateDonationData({
        percentage: donationPercentage,
        donors: donorsCount,
        raisedAmount,
      });

      alert("Donation progress updated successfully!");
    } catch (err) {
      setError("Failed to update donation progress.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles["manage-donations-container"]}>
      <h1>Manage Donations</h1>

      {isLoading && <p>Loading...</p>}
      {error && <p className={styles["error-message"]}>{error}</p>}

      {/* Donation Progress Form */}
      <div className={styles["donation-progress"]}>
        <h2>Update Donation Progress</h2>
        <form onSubmit={handleUpdateProgress} className={styles["donation-form"]}>
          <label>
            Donation Percentage:
            <input
              type="number"
              value={donationPercentage}
              onChange={(e) => setDonationPercentage(e.target.value)}
              min="0"
              max="100"
              required
            />
          </label>

          <label>
            Number of Donors:
            <input
              type="number"
              value={donorsCount}
              onChange={(e) => setDonorsCount(e.target.value)}
              min="0"
              required
            />
          </label>

          <label>
            Amount Raised (₹):
            <input
              type="number"
              value={raisedAmount}
              onChange={(e) => setRaisedAmount(e.target.value)}
              min="0"
              required
            />
          </label>

          <button type="submit" className={styles["update-btn"]}>
            Update Progress
          </button>
        </form>
      </div>

      {/* Payment Details Form */}
      <div className={styles["manual-payment"]}>
        <h2>Update Manual Payment Details</h2>
        <form onSubmit={handleUpdatePaymentDetails} className={styles["payment-form"]}>
          <div>
            <label>
              UPI ID:
              <input
                type="text"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                required
              />
            </label>
          </div>
          <div>
            <label>
              QR Code:
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
          </div>
          {qrCodeUrl && (
            <div className={styles["current-qr-code"]}>
              <p>Current QR Code:</p>
              <img src={qrCodeUrl} alt="Current QR Code" />
            </div>
          )}
          <button type="submit" className={styles["update-btn"]}>
            Update Payment Details
          </button>
        </form>
      </div>

      {/* Donor List */}
      <div className={styles["donor-list"]}>
        <h2>Donor List</h2>
        <div className={styles["table-responsive"]}>
          <table className={styles["donor-table"]}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Amount (₹)</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {donors.map((donor) => (
                <tr key={donor._id}>
                  <td>{donor.name}</td>
                  <td>{donor.email}</td>
                  <td>{donor.phone}</td>
                  <td>{donor.amount}</td>
                  <td>{new Date(donor.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ManageDonations;
