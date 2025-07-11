
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandinPage';
// import LandingPage from './pages/LandingPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      {/* <Route path="/movie/:id" element={<MovieDetail />} /> */}
    </Routes>
  );
}

export default App;
