import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // 👉 JUST call login from AuthContext
      await login(email, password);  // clean and simple
      navigate('/profile');
    } catch (error) {
      console.error('Login failed:', error);
      const errorMessage = error.response?.data?.error || 'Login failed. Please try again.';
      setError(errorMessage);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Login</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleLogin} className="flex flex-col space-y-4 w-80">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-artsphereCoral hover:bg-artsphereBlue text-white font-semibold py-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;