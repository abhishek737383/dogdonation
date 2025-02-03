import React from 'react';
import { Link } from 'react-router-dom';
import './AdminNavbar.css'; // Import the custom CSS for AdminNavbar

function AdminNavbar() {
  return (
    <nav className="admin-navbar">
      <div className="admin-navbar-brand">
        <Link to="/admin/dashboard">Admin Dashboard</Link>
      </div>
      <ul className="admin-navbar-links">
        <li><Link to="/admin/dashboard">Dashboard</Link></li>
        <li><Link to="/admin/manage-donations">Manage Donations</Link></li>
        {/* <li><Link to="/admin/users">Users</Link></li> */}
      </ul>
    </nav>
  );
}

export default AdminNavbar;
