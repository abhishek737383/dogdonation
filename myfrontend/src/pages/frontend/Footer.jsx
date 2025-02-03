import React, { useState } from 'react';
import './Footer.css'; // Import your footer and modal styles

function Footer() {
  const [modalContent, setModalContent] = useState(null);

  // Function to open the modal with specified content
  const openModal = (type) => {
    if (type === 'privacy') {
      setModalContent({
        title: 'Privacy Policy',
        content: `Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
        
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
      });
    } else if (type === 'terms') {
      setModalContent({
        title: 'Terms of Service',
        content: `By using our service, you agree to the following terms and conditions.
        
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
      });
    }
  };

  // Function to close the modal
  const closeModal = () => {
    setModalContent(null);
  };

  return (
    <>
      <footer className="footer-container">
        <div className="footer-content">
          <div className="footer-left">
            <p>&copy; {new Date().getFullYear()} Your Company Name</p>
            <p>All Rights Reserved</p>
          </div>
          <div className="footer-right">
            <ul className="footer-links">
              <li><a href="/about">About Us</a></li>
              <li><a href="/contact">Contact</a></li>
              {/* Replace anchor tags with buttons to open the modal */}
              <li>
                <button 
                  onClick={() => openModal('privacy')} 
                  className="modal-link"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => openModal('terms')} 
                  className="modal-link"
                >
                  Terms of Service
                </button>
              </li>
            </ul>
          </div>
        </div>
      </footer>

      {/* Modal Overlay */}
      {modalContent && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>{modalContent.title}</h3>
            <p>{modalContent.content}</p>
            <button onClick={closeModal} className="close-btn">Close</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Footer;
