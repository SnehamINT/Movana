import React from 'react';
import { useEffect, useState } from 'react';
import { getCredits, getDetailsById, getMovieVideos } from '../api/tmdb';
import { FaPlay, FaDesktop, FaStar } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import Header from '../components/sections/Header';
import CastSlider from '../components/sections/CastSlider';
import CrewSlider from '../components/sections/CrewSlider';


const ContentDetails = () => {
    const { type, id } = useParams();
    const [details, setDetails] = useState(null);
    const [cast, setCast] = useState(null);
    const [videoKey, setVideoKey] = useState(null);
    

    useEffect(() => {
        const fetchDetails = async () => {
          try {
            const data = await getDetailsById(type, id);
            setDetails(data);
          } catch (error) {
            console.error('Failed to fetch details:', error);
          }
        };
        const fetchCredit = async () => {
          try {
            const data = await getCredits(type, id);
            setCast(data);
          } catch (error) {
            console.error('Failed to fetch details:', error);
          }
        };
        
      
        fetchDetails();
        fetchCredit();
      }, [type, id]);

      const fetchVideo = async (id) => {
        if (!id) return;
        if(videoKey) return;
        try {
          const videos = await getMovieVideos(id);
          // Find a YouTube trailer or the first available video
          const trailer = videos.find(v => v.site === 'YouTube' && v.type === 'Trailer') || videos.find(v => v.site === 'YouTube');
          setVideoKey(trailer ? trailer.key : null);
        } catch (e) {
          setVideoKey(null);
        }
      };

    if (!details) return <div>Loading...</div>;
  return (
    <>
    <div className="min-h-screen bg-gradient-to-b from-[#25053f] to-[#123b4f] text-white py-6">
        <div className='flex flex-wrap gap-2 mb-5 px-6'>
            <div className="breadcrumbs text-sm me-auto">
            <ul>
                <li><Link to={`/`}>Home</Link></li>
                <li><Link to={`/${type}/all`} className='capitalize'>{type}</Link></li>
                <li style={{opacity: '0.7'}}>{details?.title ? details?.title : details?.name}</li>
            </ul>
            </div>
            <Link className="text-xl logo_txt ps-0 text-white" to="/">Movana</Link>
        </div>
      {/* Main Details Section */}
      <div className="flex flex-col md:flex-row gap-8 items-start lg:items-start px-6">
        {/* Left Info */}
        <div className="flex-1">
          <div className="text-3xl font-bold"> {details?.title ? details?.title : details?.name}</div>
          <small></small>
          <div className="flex items-center gap-2 ">
          {details?.release_date && <>({details?.release_date?.split('-')[0]})</>}
          <div className="flex text-yellow-400">
            {Array.from({ length: 5 }).map((_, i) =>
              i < Math.round((details?.vote_average || 0) / 2)
                ? <FaStar key={i} />
                : <FaStar key={i} className="text-gray-500" />
            )}
          </div>
          <span className="ml-2 text-white font-medium">{((details?.vote_average || 0) / 2).toFixed(1)}</span>
          </div>
          {details?.tagline && 
            <p className='mb-3'>{details?.tagline}</p>
          }
          {/* <div className="text-xl mb-2">★★★☆☆</div> */}

          <div className="grid grid-cols-2 gap-4 mb-6">
            
            <div>
              <div className="font-bold text-gray-300 mt-2">{details?.spoken_languages?.length > 1 ? 'LANGUAGES' : 'LANGUAGE'}</div>
              {details?.spoken_languages?.map((language,index) => (
                <div key={index}>{language?.name}</div>
              ))}
            </div>
            {details?.runtime && 
                <div>
                    <div className="font-bold text-gray-300">DURATION</div>
                    <div>{Math.round(details?.runtime / 60)}H {details?.runtime % 60}M</div>
                </div>
            }
            {details?.genres && 
                <div>
                <div className="font-bold text-gray-300">GENRE</div>
                    {details?.genres?.map((genre) => (
                        <div key={genre.id}>{genre.name}</div>
                    ))}
                </div>
            }
            
            
            <div>
              <div className="font-bold text-gray-300 mt-2">PRODUCTION</div>
              {details?.production_companies?.map((company) => (
                <div key={company?.id}>{company?.name}</div>
              ))}
            </div>
          </div>

          <p className="text-sm text-gray-200 mb-4 max-w-xl">
            {details?.overview ? details?.overview : 'No overview found'}
          </p>

          {/* Buttons */}
          <div className="flex gap-4 mt-4">
            <label
            htmlFor="trailer_modal"
            className="btn btn-outline gap-2 text-white border-white hover:border-green-400"
            onClick={() => fetchVideo(details?.id)}
          >
            <FaDesktop />
            View Trailer
          </label>
          </div>
        </div>

        {/* Poster Image */}
        <div className="w-full max-w-[200px] lg:max-w-[250px]">
          <img
            // src="https://upload.wikimedia.org/wikipedia/en/0/0d/Avengers_Endgame_poster.jpg"
            src={`https://image.tmdb.org/t/p/w500${details?.poster_path}`}
            alt="Avengers"
            className="rounded-xl shadow-lg"
          />
        </div>
      </div>

      {/* Modal Toggle Checkbox */}
      <input type="checkbox" id="trailer_modal" className="modal-toggle" />

      {/* Modal Body */}
      <div className="modal" role="dialog">
        <div className="modal-box max-w-4xl w-full p-0 overflow-hidden">
          <div className="relative pt-[56.25%]"> {/* 16:9 Aspect Ratio */}
            {videoKey ? (
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&mute=0`}
                title="Movie Trailer"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            )
            :
            (<p>No trailer Found</p>)
          }
          </div>
        </div>
        <label className="modal-backdrop" htmlFor="trailer_modal">Close</label>
      </div>

      {/* Cast Section */}
      {cast?.cast.length > 0 && 
        <CastSlider cast={cast?.cast || []} />
      }
      {cast?.crew.length > 0 && 
        <CrewSlider cast={cast?.crew || []} />
      }

      {/* <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Cast</h2>
        <div className="flex gap-6 flex-wrap">
          {cast?.cast.map((_, i) => (
            <div key={i} className="flex flex-col items-center w-[100px]">
              <div className="w-20 h-20 rounded-full overflow-hidden mb-2 border-2 border-white shadow">
                <img
                  src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'women' : 'men'}/${i + 10}.jpg`}
                  alt="Cast"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="text-sm text-center">{_?.name}</div>
            </div>
          ))}
        </div>
      </div> */}

    </div>
    </>
  );
};

export default ContentDetails;
