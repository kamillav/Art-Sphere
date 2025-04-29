// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Link, useNavigate } from 'react-router-dom'; // 🔵 Add useNavigate

function Home() {
  const [artObjects, setArtObjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // 🔵 Add navigate function

  useEffect(() => {
    const fetchArtObjects = async () => {
      try {
        const response = await api.get('/artobjects?limit=12');
        setArtObjects(response.data.art_objects || []);
      } catch (error) {
        console.error('Error fetching art objects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArtObjects();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-artsphereBlue text-xl">
        🎨 Loading artworks...
      </div>
    );
  }

  if (!loading && artObjects.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen text-artsphereCoral text-2xl">
        No artworks found.
      </div>
    );
  }

  // ✅ Updated "Save to Art Diary" button
  const handleSave = async (objectId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You must be logged in to save to Art Diary!');
      navigate('/login'); // 🔵 Redirect if not logged in
      return;
    }

    try {
      await api.post('/artdiary/add',
        { object_id: objectId }, // make sure payload uses "object_id"
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      alert('Saved to your Art Diary!');
    } catch (error) {
      console.error('Failed to save artwork:', error.response?.data || error.message);
      alert('Failed to save. Please try again.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center text-artsphereCoral mb-10">
        Welcome to ArtSphere 🎨
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {artObjects.map((art) => (
          <div key={art.object_id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition">
            {art.image_url && (
              <img
                src={art.image_url}
                alt={art.object_name}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-5">
              <h2 className="text-2xl font-semibold text-artsphereBlue mb-2">
                {art.object_name}
              </h2>
              <p className="text-gray-700 mb-1">Creator: {art.creator_name || 'Unknown'}</p>
              <p className="text-gray-700 mb-1">Museum: {art.museum_name || 'Unknown'}</p>
              <p className="text-gray-700 mb-4">Year: {art.year || 'N/A'}</p>

              <div className="flex flex-col space-y-2">
                <Link
                  to={`/art/${art.object_id}`}
                  className="text-artsphereBlue font-semibold hover:underline text-sm"
                >
                  View Details
                </Link>
                <button
                  onClick={() => handleSave(art.object_id)} // 🔵 use new function
                  className="bg-artsphereCoral hover:bg-artsphereBlue text-white py-2 rounded-full transition font-semibold"
                >
                  Save to Art Diary
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;