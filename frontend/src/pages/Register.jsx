// src/pages/Register.jsx
import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await api.post('/auth/register', form);
      if (response.status === 200) {
        navigate('/login');
      }
    } catch (error) {
      console.error('Registration failed:', error);
      setError(error.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-artsphereSoftCoral">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold text-artsphereBlue mb-6">Register</h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 mb-6 border rounded"
          required
        />

        <button type="submit" className="w-full bg-artsphereBlue text-white p-2 rounded hover:bg-artsphereCoral">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;