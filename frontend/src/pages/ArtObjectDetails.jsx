// src/pages/ArtObjectDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import { useCollection } from '../contexts/CollectionContext.jsx';

function ArtObjectDetails() {
  const { id } = useParams();
  const [artObject, setArtObject] = useState(null);
  const { addToCollection } = useCollection();

  useEffect(() => {
    async function fetchArtObject() {
      try {
        const response = await api.get(`/artobjects/${id}`);
        setArtObject(response.data);
      } catch (error) {
        console.error('Failed to fetch art object:', error);
      }
    }
    fetchArtObject();
  }, [id]);

  if (!artObject) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-artsphereCoral">{artObject.object_name}</h1>
      <p><strong>Creator:</strong> {artObject.creator_name || 'Unknown'}</p>
      <p><strong>Year:</strong> {artObject.year || 'Unknown'}</p>
      <p><strong>Museum:</strong> {artObject.museum_name || 'Unknown'}</p>

      {artObject.image_url && (
        <img
          src={artObject.image_url}
          alt={artObject.object_name}
          className="mt-4 rounded shadow-lg"
        />
      )}

      <button
        className="mt-6 bg-artsphereCoral hover:bg-artsphereBlue text-white px-4 py-2 rounded font-semibold transition"
        onClick={() => addToCollection(artObject)}
      >
        Save to Art Diary
      </button>
    </div>
  );
}

export default ArtObjectDetails;