// src/pages/Profile.jsx
import React from 'react';
import { useAuth } from '../contexts/AuthContext';

function Profile() {
  const { currentUser, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = '/login'; // Redirect after logout
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-artsphereSoftCoral">
      <div className="bg-white p-8 rounded shadow-md w-80">
        <h1 className="text-2xl font-bold text-artsphereCoral mb-6">My Profile</h1>
        {currentUser ? (
          <>
            <p className="text-gray-700 mb-4"><strong>Username:</strong> {currentUser.username}</p>
            <button
              onClick={handleLogout}
              className="bg-artsphereCoral text-white px-4 py-2 rounded hover:bg-opacity-80 w-full"
            >
              Logout
            </button>
          </>
        ) : (
          <p>You are not logged in.</p>
        )}
      </div>
    </div>
  );
}

export default Profile;