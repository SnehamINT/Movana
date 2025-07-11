import React, { useEffect, useState, useRef } from 'react';
import { getNowPlayingMovies, getNowPlayingTVShows, searchMovies, searchTVShows } from '../api/tmdb';

import Header from '../components/sections/Header';
import Hero from '../components/sections/Hero';
import MovieSlider from '../components/sections/MovieSlider';
import { IoClose } from "react-icons/io5";

const LandingPage = () => {
  const [items, setItems] = useState([]); // movies or tv shows
  const [loading, setLoading] = useState(true);
  const [totalResults, setToalResults] =useState('')
  const [featured, setFeatured] = useState({});
  const [type, setType] = useState('movie'); // 'movie' or 'tv'
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const [noResult, setNoResult] = useState(false);
  const searchTimeout = useRef(null);

  useEffect(() => {
    if (searchTerm.trim() === '') {
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
    }
    setLoading(true);
    setError('');
    setNoResult(false);
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(async () => {
      try {
        let results = [];
        if (type === 'movie') {
          results = await searchMovies(searchTerm);
        } else {
          results = await searchTVShows(searchTerm);
        }
        setItems(results);
        setFeatured(results[0] || {});
        setNoResult(results.length === 0);
      } catch (e) {
        setError('Something went wrong. Please try again.');
        setItems([]);
        setFeatured({});
        setNoResult(false);
      } finally {
        setLoading(false);
      }
    }, 500); // debounce 500ms
    return () => clearTimeout(searchTimeout.current);
  }, [searchTerm, type]);

  const handleNavClick = (newType) => {
    if (newType !== type) {
      setType(newType);
      setSearchTerm('');
    }
  };

  const handleSearchIconClick = () => {
    setSearchOpen((open) => !open);
    setSearchTerm('');
  };

  return (
    <div className="bg-black min-h-screen text-white app-conatiner">
      <Header type={type} onNavClick={handleNavClick} onSearchClick={handleSearchIconClick} />
      {searchOpen && (
        <div className="fixed left-0 w-full  search_bar">
          <input
            type="text"
            className="input w-full  text-black bg-base-100/60 backdrop-blur-md shadow-lg"
            placeholder={`Search for ${type === 'movie' ? 'movies' : 'TV shows'}...`}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            autoFocus
          />
          <button onClick={()=>setSearchOpen(false)}><IoClose/></button>
        </div>
      )}
      <div className={searchOpen ? '' : ''}>
        {error && <div className="text-red-400 text-center mt-4">{error}</div>}
        {noResult && <div className="text-gray-400 text-center mt-4">No results found.</div>}
        <Hero featured={featured} />
        <MovieSlider movies={items} loading={loading} setFeatured={setFeatured} totalContent={totalResults}  />
      </div>
    </div>
  );
};

export default LandingPage;
