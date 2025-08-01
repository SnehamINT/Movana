const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export const getNowPlayingMovies = async (page = 1) => {
  const res = await fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=${page}`);
  const data = await res.json();
  return data;
};

export const getImageUrl = (path, size = 'w500') => {
  return `https://image.tmdb.org/t/p/${size}${path}`;
};
export const getBannerImageUrl = (path, size = 'original') => {
  return `https://image.tmdb.org/t/p/${size}${path}`;
};

export const getMovieVideos = async (movieId) => {
  const res = await fetch(`${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`);
  if (!res.ok) throw new Error('Failed to fetch videos');
  const data = await res.json();
  return data.results;
};

export const getNowPlayingTVShows = async (page=1) => {
  const res = await fetch(`${BASE_URL}/tv/on_the_air?api_key=${API_KEY}&language=en-US&page=${page}`);
  const data = await res.json();
  return data;
};

export const searchMovies = async (query, page= 1) => {
  const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=${page}`);
  if (!res.ok) throw new Error('Failed to search movies');
  const data = await res.json();
  return data;
};

export const searchTVShows = async (query, page = 1) => {
  const res = await fetch(`${BASE_URL}/search/tv?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=${page}`);
  if (!res.ok) throw new Error('Failed to search TV shows');
  const data = await res.json();
  return data;
};


export const getDetailsById = async (type, id) => {
  if (!['movie', 'tv'].includes(type)) {
    throw new Error('Invalid media type. Must be "movie" or "tv"');
  }

  try {
    const response = await fetch(`${BASE_URL}/${type}/${id}?api_key=${API_KEY}&language=en-US`);
    if (!response.ok) throw new Error('Failed to fetch content details');
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(`Error fetching ${type} details with ID ${id}:`, err);
    throw err;
  }
};

export const getCredits = async (type, id) => {
  if (!['movie', 'tv'].includes(type)) {
    throw new Error('Invalid media type. Must be "movie" or "tv"');
  }

  try {
    const response = await fetch(`${BASE_URL}/${type}/${id}/credits?api_key=${API_KEY}&language=en-US`);
    if (!response.ok) throw new Error('Failed to fetch credits');
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(`Error fetching ${type} credits with ID ${id}:`, err);
    throw err;
  }
};


export const getPersonDetailsById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/person/${id}?api_key=${API_KEY}`);
    if (!response.ok) throw new Error('Failed to fetch content details');
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(`Error fetching ${type} details with ID ${id}:`, err);
    throw err;
  }
};


export const getPersonDetailsWithKnownFor = async (id) => {
  try {
    // Fetch person details
    const personRes = await fetch(`${BASE_URL}/person/${id}?api_key=${API_KEY}`);
    if (!personRes.ok) throw new Error('Failed to fetch person details');
    const personData = await personRes.json();

    // Fetch combined credits
    const creditsRes = await fetch(`${BASE_URL}/person/${id}/combined_credits?api_key=${API_KEY}`);
    if (!creditsRes.ok) throw new Error('Failed to fetch person credits');
    const creditsData = await creditsRes.json();

    // Sort credits by popularity to get top 5 "known for"
    const knownFor = creditsData.cast
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, 5); // Top 5 known for

    return {
      ...personData,
      knownFor
    };
  } catch (err) {
    console.error(`Error fetching person details or known for with ID ${id}:`, err);
    throw err;
  }
};

