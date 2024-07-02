import React from 'react';
import AuthService from '../services/authService';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    AuthService.logout();
    setIsAuthenticated(false)
    navigate('/login');
  };

  return (
    <div className="sidebar">
      <h2>Menu</h2>
      <Link to="/upload">Upload</Link>
      <Link to="/reports">Reports</Link>
      <Link to="/products">Products</Link>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Sidebar;
