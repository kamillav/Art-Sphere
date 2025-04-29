// src/services/authService.js
import api from './api'; // ✅ import your custom axios instance

export const registerUser = async (username, password) => {
  return await api.post('/auth/register', { username, password });
};

export const loginUser = async (username, password) => {
  return await api.post('/auth/login', { username, password });
};