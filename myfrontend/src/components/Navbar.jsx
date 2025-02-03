import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file

function Navbar() {
  const [menuActive, setMenuActive] = useState(false);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">DonationWebsite</Link>
      </div>
      {/* Menu Toggle Button */}
      <div className="menu-toggle" onClick={toggleMenu}>
        ☰
      </div>
      {/* Links list, toggle 'active' class when menu is active */}
      <ul className={`navbar-links ${menuActive ? 'active' : ''}`}>
        <li><Link to="/" onClick={() => setMenuActive(false)}>Home</Link></li>
        <li><Link to="/donate" onClick={() => setMenuActive(false)}>Donate</Link></li>
        <li><Link to="/about" onClick={() => setMenuActive(false)}>About Us</Link></li>
        <li><Link to="/contact" onClick={() => setMenuActive(false)}>Contact</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
