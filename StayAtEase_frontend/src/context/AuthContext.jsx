import React, { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser && storedUser !== 'undefined') {
        try {
          const parsedUser = JSON.parse(storedUser);
          if (parsedUser && typeof parsedUser === 'object') {
            setUser(parsedUser);
          }
        } catch (parseError) {
          console.error('Error parsing user data:', parseError);
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
        }
      }
    } catch (err) {
      console.error('Error initializing auth state:', err);
      setError('Failed to initialize authentication state');
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      setError(null);
      console.log('Attempting login with:', { email });
      
      const response = await axiosInstance.post('/auth/login', {
        email,
        password,
      });

      console.log('Server response:', response.data);

      if (!response.data) {
        throw new Error('No response data received');
      }

      // Check for error in response
      if (response.data.error) {
        throw new Error(response.data.error);
      }

      const { token, refreshToken, user: userData } = response.data;

      if (!token || !userData) {
        throw new Error('Missing required data in response');
      }

      // Store tokens
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      
      // Store user data
      const userToStore = {
        id: userData.id,
        email: userData.email,
        name: userData.name,
        userType: userData.userType,
        profile_pic: userData.profile_pic
      };
      
      console.log('Storing user data:', userToStore);
      localStorage.setItem('user', JSON.stringify(userToStore));
      setUser(userToStore);
      return userToStore;
    } catch (error) {
      console.error('Login error:', error);
      const errorMessage = error.response?.data?.error || 
                          error.message || 
                          'Login failed. Please try again.';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const logout = () => {
    try {
      // Clear all auth-related items from localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      
      // Reset all state
      setUser(null);
      setError(null);
      setLoading(false);
      
      // Redirect to home page without any additional path
      window.location.replace('http://localhost:5173');
    } catch (err) {
      console.error('Error during logout:', err);
      setError('Failed to logout');
    }
  };

  const updateUser = (updatedUser) => {
    try {
      if (updatedUser && typeof updatedUser === 'object') {
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        setError(null);
      } else {
        throw new Error('Invalid user data');
      }
    } catch (err) {
      console.error('Error updating user:', err);
      setError('Failed to update user data');
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    updateUser,
    isAuthenticated: !!user,
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 