// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:5000/api', // ✅ includes /api
  withCredentials: true, // ✅ needed for login/register cookies or tokens
});

export default api;