import axios from 'axios';

const AUTH_URL = process.env.REACT_APP_AUTH_URL || 'http://localhost:4001';

const authApi = axios.create({
  baseURL: AUTH_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const checkAuth = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.log('checkAuth: No token found in localStorage.');
    return false;
  }

  try {
    return await authApi.post('/auth/verify', { token });
  } catch (error) {
    console.error('checkAuth: Error verifying token:', error);
    return false;
  }
};

const login = async (email, password) => {
  try {
    const response = await authApi.post('/auth/login', { email, password });
    localStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw new Error(error.response?.data?.message || 'Error logging in');
  }
};

const register = async (email, password) => {
  try {
    const response = await authApi.post('/auth/register', { email, password });
    return response.data;
  } catch (error) {
    console.error('Error registering:', error);
    throw new Error(error.response?.data?.message || 'Error registering');
  }
};

const logout = () => {
  localStorage.removeItem('token');
};

const AuthService = {
  checkAuth,
  login,
  register,
  logout
};

export default AuthService;
