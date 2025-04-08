import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import jwt_decode from 'jwt-decode';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (token) {
      try {
        // Verify token expiration
        const decoded = jwt_decode(token);
        const currentTime = Date.now() / 1000;
        
        if (decoded.exp < currentTime) {
          // Token expired
          logout();
        } else {
          // Set auth token header
          setAuthToken(token);
          
          // Get user data
          loadUser();
        }
      } catch (err) {
        console.error('Token validation error:', err);
        logout();
      }
    } else {
      setLoading(false);
    }
  }, []);

  // Set axios auth token
  const setAuthToken = (token) => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  };

  // Load user data
  const loadUser = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/users/me`);
      setUser(res.data.data);
      setLoading(false);
    } catch (err) {
      console.error('Load user error:', err);
      logout();
    }
  };

  // Register user
  const register = async (userData) => {
    setError(null);
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/users/register`, userData);
      
      // Save token to localStorage
      localStorage.setItem('token', res.data.token);
      
      // Set auth token header
      setAuthToken(res.data.token);
      
      // Set user
      setUser(res.data.user);
      
      return res.data;
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
      throw err;
    }
  };

  // Login user
  const login = async (email, password) => {
    setError(null);
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/users/login`, {
        email,
        password
      });
      
      // Save token to localStorage
      localStorage.setItem('token', res.data.token);
      
      // Set auth token header
      setAuthToken(res.data.token);
      
      // Set user
      setUser(res.data.user);
      
      return res.data;
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
      throw err;
    }
  };

  // Logout user
  const logout = () => {
    // Remove token from localStorage
    localStorage.removeItem('token');
    
    // Remove auth header
    setAuthToken(null);
    
    // Clear user
    setUser(null);
    setLoading(false);
    
    // Redirect to login page
    router.push('/login');
  };

  // Update profile
  const updateProfile = async (profileData) => {
    setError(null);
    try {
      const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/users/profile`, profileData);
      
      // Update user state
      setUser({
        ...user,
        ...res.data.data
      });
      
      return res.data;
    } catch (err) {
      setError(err.response?.data?.error || 'Profile update failed');
      throw err;
    }
  };

  // Change password
  const changePassword = async (passwordData) => {
    setError(null);
    try {
      const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/users/password`, passwordData);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.error || 'Password change failed');
      throw err;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        register,
        login,
        logout,
        updateProfile,
        changePassword
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
