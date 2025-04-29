import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import { AuthProvider } from "./contexts/AuthContext";
import { CollectionProvider } from "./contexts/CollectionContext";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ArtDiary from "./pages/ArtDiary";
import Profile from "./pages/Profile";
import ArtObjectDetails from "./pages/ArtObjectDetails";
function App() {
  return (
    <Router>
      <AuthProvider>
        <CollectionProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/artdiary" element={<ArtDiary />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/art/:objectId" element={<ArtObjectDetails />} />
          </Routes>
        </CollectionProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;