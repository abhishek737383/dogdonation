import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import './Contact.css';

function Contact() {
  return (
    <div className="contact-container">
      <h2>Contact Page</h2>
      <p>
        Get in touch with us via WhatsApp by clicking the icon below.
      </p>

      <div className="contact-info">
        <h3>Contact Information</h3>
        <a
          href="https://wa.me/919140726581"
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-link"
        >
          <FaWhatsapp size={50} color="#25D366" />
        </a>
      </div>
    </div>
  );
}

export default Contact;
