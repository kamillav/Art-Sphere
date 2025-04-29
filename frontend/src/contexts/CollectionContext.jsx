// src/contexts/CollectionContext.jsx
import React, { createContext, useContext, useState } from "react";

const CollectionContext = createContext();

export function useCollection() {
  return useContext(CollectionContext);
}

export function CollectionProvider({ children }) {
  const [collection, setCollection] = useState([]);

  const addToCollection = (artObject) => {
    setCollection((prevCollection) => [...prevCollection, artObject]);
  };

  const removeFromCollection = (artObjectId) => {
    setCollection((prevCollection) => prevCollection.filter(item => item.object_id !== artObjectId));
  };

  const clearCollection = () => {
    setCollection([]);
  };

  const value = {
    collection,
    addToCollection,
    removeFromCollection,
    clearCollection,
  };

  return (
    <CollectionContext.Provider value={value}>
      {children}
    </CollectionContext.Provider>
  );
}