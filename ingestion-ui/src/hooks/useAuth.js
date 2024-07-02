import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/authService';

const useAuth = () => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const userData = await AuthService.checkAuth();
        if (userData) {
          setIsAuthenticated(true);
          setUser(userData);
        } else {
          setTimeout(() => {
            navigate('/login');
          }, 2000);
        }
      } catch (err) {
        console.error('useAuth: Error verifying token:', err);
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

  return { loading, isAuthenticated, user, error, setIsAuthenticated };
};

export default useAuth;
