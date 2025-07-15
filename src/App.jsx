
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandinPage';
import ListingPage from './pages/ListingPage';
import SearchResultsPage from './pages/SearchResultsPage';
import ContentDetails from './pages/ContentDetails';
// import LandingPage from './pages/LandingPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/:mediaType/all" element={<ListingPage />} />
      <Route path="/search/:type/:query" element={<SearchResultsPage />} />

      <Route path="/:type/details/:id" element={<ContentDetails />} />
    </Routes>
  );
}

export default App;
