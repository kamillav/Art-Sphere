// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import api from '../services/api';
const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setCurrentUser(decoded);
      } catch (error) {
        console.error('Error decoding token:', error);
        setCurrentUser(null);
      }
    }
  }, []);

  const register = async (username, email, password) => {
    try {
      const response = await api.post('/auth/register', { username, email, password });
      return response.data;
    } catch (error) {
      console.error('Error registering:', error);
      throw error;
    }
  };

const login = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    const { access_token } = response.data; // ✅ not 'token', it is 'access_token'
    localStorage.setItem('token', access_token);

    const decoded = jwtDecode(access_token);
    setCurrentUser(decoded);

    return true;
  } catch (error) {
    console.error('Error logging in:', error.response?.data || error.message);
    throw error;
  }
};

  const logout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}