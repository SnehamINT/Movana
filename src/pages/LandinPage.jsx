import React, { useEffect, useState, useRef } from 'react';
import { getNowPlayingMovies, getNowPlayingTVShows, searchMovies, searchTVShows } from '../api/tmdb';

import Header from '../components/sections/Header';
import Hero from '../components/sections/Hero';
import MovieSlider from '../components/sections/MovieSlider';
import { IoClose } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const [items, setItems] = useState([]); // movies or tv shows
  const [loading, setLoading] = useState(true);
  const [totalResults, setToalResults] =useState('')
  const [featured, setFeatured] = useState({});
  const [type, setType] = useState('movie'); // 'movie' or 'tv'
  // const [searchOpen, setSearchOpen] = useState(false);
  // const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const [noResult, setNoResult] = useState(false);

  useEffect(() => {
      setError('');
      setNoResult(false);
      setLoading(true);
      const fetchData = async () => {
        let allData = [];
        let data = [];
        if (type === 'movie') {
          allData = await getNowPlayingMovies()
          data = allData?.results;
          setToalResults(allData?.total_results)
        } else {
          allData = await getNowPlayingTVShows()
          data = allData?.results;
          setToalResults(allData?.total_results)
        }
        setItems(data);
        setFeatured(data[0] || {});
        setLoading(false);
        // console.log(allData);
      };
      fetchData();
      return;

  }, [ type]);

  const handleNavClick = (newType) => {
    if (newType !== type) {
      setType(newType);
      setSearchTerm('');
    }
  };

  

  

  return (
    <div className="bg-black min-h-screen text-white app-conatiner">
      <Header type={type} onNavClick={handleNavClick} />
      
      <div>
        {error && <div className="text-red-400 text-center mt-4">{error}</div>}
        {noResult && <div className="text-gray-400 text-center mt-4">No results found.</div>}
        <Hero featured={featured} />
        <MovieSlider movies={items} loading={loading} setFeatured={setFeatured} totalContent={totalResults}  mediaType={type}  />
      </div>
    </div>
  );
};

export default LandingPage;
