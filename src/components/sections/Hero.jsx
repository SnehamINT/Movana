import React, { useEffect, useState, useRef } from 'react'
import { getBannerImageUrl, getMovieVideos } from '../../api/tmdb';
import { FaSearch, FaPlay, FaPause, FaPlus, FaStar } from 'react-icons/fa';
const genres = ["Crime", "Drama", "Mystery"];

const Hero = ({ featured }) => {
  const [videoKey, setVideoKey] = useState(null);
  const [showVideo, setShowVideo] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showNoVideoModal, setShowNoVideoModal] = useState(false);
  const iframeRef = useRef(null);

  useEffect(() => {
    const fetchVideo = async () => {
      if (!featured?.id) return;
      try {
        const videos = await getMovieVideos(featured.id);
        // Find a YouTube trailer or the first available video
        const trailer = videos.find(v => v.site === 'YouTube' && v.type === 'Trailer') || videos.find(v => v.site === 'YouTube');
        setVideoKey(trailer ? trailer.key : null);
      } catch (e) {
        setVideoKey(null);
      }
    };
    fetchVideo();
    setShowVideo(false); // Reset video on featured change
    setIsPaused(false);
    setShowNoVideoModal(false);
  }, [featured?.id]);

  // Listen for YouTube player events
  useEffect(() => {
    if (!showVideo) return;
    function handleMessage(event) {
      // Only accept messages from YouTube
      if (!event.origin.includes('youtube.com')) return;
      try {
        const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
        if (data.event === 'onStateChange') {
          // 0 = ended, 2 = paused, 1 = playing
          if (data.info === 0) {
            setShowVideo(false);
            setIsPaused(false);
          }
        }
      } catch {}
    }
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [showVideo]);

  const handlePlay = () => {
    if (!videoKey) {
      setShowNoVideoModal(true);
      return;
    }
    setShowVideo(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    if (iframeRef.current) {
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func: 'pauseVideo', args: [] }),
        '*'
      );
      setIsPaused(true);
    }
  };

  const handleResume = () => {
    if (iframeRef.current) {
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func: 'playVideo', args: [] }),
        '*'
      );
      setIsPaused(false);
    }
  };

  return (
    <section
      className="relative flex flex-col py-15 md:flex-row items-start  bg-cover bg-center overflow-hidden hero_baner"
      style={{ backgroundImage: showVideo ? undefined : undefined }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent z-0" />
      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-black/70 z-10 pointer-events-none" />
      {/* Lazy loaded banner image, only show when video is not playing */}
      {!showVideo && (
        <img
          src={getBannerImageUrl(featured?.backdrop_path || featured?.poster_path)}
          alt={featured?.title || featured?.name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{ minHeight: '100vh' }}
        />
      )}
      <div className="relative z-20 p-8 max-w-2xl w-full">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 tracking-wide truncate">{featured?.title || featured?.name}</h1>
        {/* <p className="text-lg mb-2 font-semibold">Season 1</p> */}
        <div className="flex items-center gap-2 mb-2">
          <div className="flex text-yellow-400">
            {Array.from({ length: 4 }).map((_, i) => <FaStar key={i} />)}
            <FaStar className="text-gray-500" />
          </div>
          <span className="ml-2 text-white font-medium">4.0</span>
        </div>
        {/* <div className="flex gap-4 mb-4">
          {genres.map((g) => (
            <span key={g} className="bg-gray-800 px-3 py-1 rounded-full text-sm font-medium text-gray-200">{g}</span>
          ))}
        </div> */}
        <div className="flex gap-4 my-4">
          {!showVideo && (
            <button
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg font-semibold text-lg shadow"
              onClick={handlePlay}
            >
              <FaPlay /> Play
            </button>
          )}
          {showVideo && !isPaused && (
            <button
              className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-lg font-semibold text-lg shadow"
              onClick={handlePause}
            >
              <FaPause /> Pause
            </button>
          )}
          {showVideo && isPaused && (
            <button
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg font-semibold text-lg shadow"
              onClick={handleResume}
            >
              <FaPlay /> Resume
            </button>
          )}

          {/* <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-5 py-2 rounded-lg font-semibold text-lg shadow">
            <FaPlus />
          </button> */}

        </div>
        <p className="text-gray-300 max-w-xl text-sm md:text-base line-clamp-2">
          {featured?.overview || 'No description available.'}
        </p>
      </div>
      {showVideo && videoKey && (
        <div className="absolute inset-0 z-0 flex items-center justify-center">
          <iframe
            ref={iframeRef}
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&mute=0&controls=0&enablejsapi=1&loop=0`}
            title="Movie Trailer"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="w-full h-full object-cover"
            style={{ minHeight: '100vh' }}
          />
        </div>
      )}
      {/* DaisyUI Modal for no video available */}
      {showNoVideoModal && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center bg-black/60 pt-16">
          <div className="modal modal-open">
            <div className="modal-box">
              <h3 className="font-bold text-lg">No Trailer Available</h3>
              <p className="py-4">Sorry, there is no trailer or video available for this title.</p>
              <div className="modal-action">
                <button className="btn btn-primary" onClick={() => setShowNoVideoModal(false)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Hero