import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/sections/Header';
import { getNowPlayingMovies, getNowPlayingTVShows } from '../api/tmdb';

const ListingPage = () => {
  const {query } = useParams();
  const { mediaType } = useParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noResult, setNoResult] = useState(false);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [type, setType] = useState(mediaType ? mediaType : 'movie');
  const navigate = useNavigate();
  const fetchResults = async () => {
    setLoading(true);
    const data =
      type === 'movie'
        ? await getNowPlayingMovies(currentPage)
        : await getNowPlayingTVShows(currentPage);
        console.log(data, 'fetch')
    setResults(data?.results);
    setTotalPages(data?.total_pages);
    setLoading(false);
  };
  useEffect(() => {
    setError('');
    setNoResult(false);
    setLoading(true);
    fetchResults();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage, type]);

  const handleNavClick = (newType) => {
    if (newType !== type) {
      setType(newType);
      setCurrentPage(1);
    }
  };

  const HanldePageChange = (number) => {
    const plus = number + 1
    setCurrentPage(plus);
  }
  return (
    <>
    <Header type={type} onNavClick={handleNavClick}/>
    <div className="relative min-h-screen bg-black text-white">
      {results[0] && (
        <div
          className="absolute inset-0 bg-cover bg-center blur-sm opacity-20"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${results[0].backdrop_path})`,
          }}
        />
      )}

      <div className="relative z-10">
      <Header type={type} onNavClick={handleNavClick} />
        <div className="container  mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-6">
            Search results for <span className="text-green-400">{decodeURIComponent(query)}</span>
          </h1>

          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="skeleton h-64 rounded-lg" />
              ))}
            </div>
          ) : results.length === 0 ? (
            <p className="text-gray-400">No results found.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {results.map((item) => (
                <div key={item.id} className="bg-base-200 rounded-xl shadow p-2 cursor-pointer" onClick={() => navigate(`/${type}/details/${item.id}`)}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    alt={item.title || item.name}
                    className="rounded-lg mb-2"
                  />
                  <h2 className="text-sm font-medium line-clamp-2">
                    {item.title || item.name}
                  </h2>
                  {/* <h2>{item.id}</h2> */}
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="mt-8 block md:flex justify-center">
            <div className="join flex-wrap gap-1">
                {/* Prev Button */}
                <button
                className="join-item btn btn-sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                >
                Prev
                </button>

                {/* Page Numbers */}
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((page) => {
                    return (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 2 && page <= currentPage + 2)
                    );
                })
                .map((page, index, array) => {
                    const prevPage = array[index - 1];
                    const showEllipsis = prevPage && page - prevPage > 1;
                    return (
                    <React.Fragment key={page}>
                        {showEllipsis && (
                        <button className="join-item btn btn-sm btn-disabled">...</button>
                        )}
                        <button
                        className={`join-item btn btn-sm ${
                            currentPage === page ? 'btn-primary' : ''
                        }`}
                        onClick={() => setCurrentPage(page)}
                        >
                        {page}
                        </button>
                    </React.Fragment>
                    );
                })}

                {/* Next Button */}
                <button
                className="join-item btn btn-sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                >
                Next
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default ListingPage