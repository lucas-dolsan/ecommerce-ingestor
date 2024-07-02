import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/authService';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
      const verifyToken = async () => {
        try {
          const isAuthenticated = await AuthService.checkAuth();
          if (!isAuthenticated) {
            setError('Authentication failed. Redirecting to login.');
            setTimeout(() => {
              navigate('/login');
            }, 2000);
          }
        } catch (err) {
          console.error('withAuth HOC: Error verifying token:', err);
          setError('Error verifying token. Please log in again.');
          setTimeout(() => {
            navigate('/login');
          }, 2000);
        } finally {
          setLoading(false);
        }
      };

      verifyToken();
    }, [navigate]);

    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>{error}</div>;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
