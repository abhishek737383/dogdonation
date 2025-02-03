import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';

// Frontend pages
import Home from './pages/frontend/Home';
import Donate from './pages/frontend/DonatePage';
import AboutUs from './pages/frontend/AboutUs';
import Contact from './pages/frontend/Contact';
import SliderPage from './pages/frontend/SliderPage'; // Import SliderPage

// Admin pages
import AdminNavbar from './components/AdminNavbar'; // Admin Navbar
import Dashboard from './pages/admin/Dashboard';
import ManageDonations from './pages/admin/ManageDonations';
// import Users from './pages/admin/Users';
// import AdminSliderPage from './pages/admin/AdminSliderPage'; // Admin Slider Page

function App() {
  return (
    <Router>
      <Routes>
        {/* Frontend Routes */}
        <Route path="/" element={<><Navbar /><SliderPage /><Home /></>} />
        <Route path="/donate" element={<><Navbar /><Donate /></>} />
        <Route path="/about" element={<><Navbar /><AboutUs /></>} />
        <Route path="/contact" element={<><Navbar /><Contact /></>} />

        {/* Admin Routes */}
        <Route path="/admin" element={<Navigate to="/admin/dashboard" />} />
        <Route path="/admin/dashboard" element={<><AdminNavbar /><Dashboard /></>} />
        <Route path="/admin/manage-donations" element={<><AdminNavbar /><ManageDonations /></>} />
        {/* <Route path="/admin/users" element={<><AdminNavbar /><Users /></>} /> */}
        {/* <Route path="/admin/manage-slider" element={<><AdminNavbar /><AdminSliderPage /></>} /> */}
      </Routes>
    </Router>
  );
}

export default App;
