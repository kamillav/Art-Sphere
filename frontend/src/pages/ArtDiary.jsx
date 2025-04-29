// src/pages/ArtDiary.jsx
import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

function ArtDiary() {
  const { currentUser } = useAuth();
  const [artDiary, setArtDiary] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtDiary = async () => {
      if (currentUser) {
        try {
          const token = localStorage.getItem('token');
          const response = await api.get('/artdiary', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setArtDiary(response.data.artworks);
        } catch (error) {
          console.error('Error fetching Art Diary:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchArtDiary();
  }, [currentUser]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-artsphereBlue text-xl">
        Loading your Art Diary...
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-artsphereSoftCoral pt-24">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-artsphereBlue mb-6">🎨 Your Art Diary</h1>
        {artDiary.length === 0 ? (
          <p className="text-gray-700">You haven't added any artworks yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {artDiary.map((art) => (
              <div key={art.object_id} className="bg-artsphereSoftCoral p-4 rounded shadow hover:shadow-lg">
                <h2 className="text-xl font-semibold text-artsphereCoral">{art.object_name}</h2>
                <p className="text-gray-600">Year: {art.year || 'Unknown'}</p>
                <Link to={`/art/${art.object_id}`} className="text-artsphereBlue hover:underline text-sm">
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ArtDiary;