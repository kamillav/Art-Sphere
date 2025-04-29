// src/components/layout/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-artsphereCoral shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex justify-between items-center h-16 px-6">
        <div className="text-2xl font-bold text-white tracking-wide">
          ArtSphere 🎨
        </div>
        <div className="flex space-x-8 items-center">
          <Link to="/" className="text-white hover:text-artsphereSoftCoral text-lg transition font-semibold">
            Home
          </Link>
          <Link to="/search" className="text-white hover:text-artsphereSoftCoral text-lg transition font-semibold">
            Search
          </Link>
          <Link to="/register" className="text-white hover:text-artsphereSoftCoral text-lg transition font-semibold">
            Register
          </Link>
          <Link to="/login" className="text-white hover:text-artsphereSoftCoral text-lg transition font-semibold">
            Login
          </Link>
          <Link to="/artdiary" className="text-white hover:text-artsphereSoftCoral text-lg transition font-semibold">
            Art Diary
          </Link>
          <Link to="/profile" className="text-white hover:text-artsphereSoftCoral text-lg transition font-semibold">
            Profile
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;