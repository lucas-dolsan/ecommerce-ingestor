import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Upload from './components/Upload';
import Reports from './components/Reports';
import Products from './components/Products';
import Login from './components/Login';
import Register from './components/Register';
import withAuth from './components/withAuth';
import useAuth from './hooks/useAuth';
import './App.css';

const ProtectedUpload = withAuth(Upload);
const ProtectedReports = withAuth(Reports);
const ProtectedProducts = withAuth(Products);

const AppContent = () => {
  const { loading, isAuthenticated } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {isAuthenticated && <Sidebar setIsAuthenticated />}
      <div className="main">
        <Routes>
          <Route path="/upload" element={<ProtectedUpload />} />
          <Route path="/reports" element={<ProtectedReports />} />
          <Route path="/products" element={<ProtectedProducts />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <div className="App">
        <AppContent />
      </div>
    </Router>
  );
};

export default App;
