// src/pages/Search.jsx
import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';

function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

const handleSearch = async (e) => {
  e.preventDefault();
  if (!query.trim()) return;  // Ignore empty searches
  setLoading(true);
  try {
    const response = await api.get(`/artobjects?search=${query}`);   // ✅ NO extra /api
    setResults(response.data.art_objects);
  } catch (error) {
    console.error('Error searching:', error);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-artsphereSoftCoral pt-24 px-6">
      <h1 className="text-3xl font-bold text-artsphereCoral mb-6 text-center">🔍 Search ArtSphere</h1>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex justify-center mb-10">
        <input
          type="text"
          placeholder="Search artworks, creators, mediums, departments..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="p-2 rounded-l border w-80"
        />
        <button
          type="submit"
          className="bg-artsphereCoral text-white px-6 rounded-r hover:bg-artsphereBlue transition"
        >
          Search
        </button>
      </form>

      {/* Results */}
      {loading ? (
        <div className="text-center text-artsphereCoral">Loading results...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((art) => (
            <div key={art.object_id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
              <h2 className="text-2xl font-semibold text-artsphereBlue mb-2">{art.object_name}</h2>
              <p className="text-gray-700 text-sm mb-1">Year: {art.year || 'Unknown'}</p>
              <p className="text-gray-700 text-sm mb-1">Creator: {art.creator_name || 'Unknown'}</p>
              <p className="text-gray-700 text-sm mb-1">Museum: {art.museum_name || 'Unknown'}</p>
              <Link
                to={`/art/${art.object_id}`}
                className="text-artsphereCoral font-bold hover:underline"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Search;