import React from 'react';
import { useEffect, useState } from 'react';
import { getDetailsById } from '../api/tmdb';
import { FaPlay, FaDesktop, FaStar } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import Header from '../components/sections/Header';


const ContentDetails = () => {
    const { type, id } = useParams();
    const [details, setDetails] = useState(null);
    

    useEffect(() => {
        const fetchDetails = async () => {
          try {
            const data = await getDetailsById(type, id);
            setDetails(data);
          } catch (error) {
            console.error('Failed to fetch details:', error);
          }
        };
      
        fetchDetails();
      }, [type, id]);

      console.log(details)

    if (!details) return <div>Loading...</div>;
  return (
    <>
    <div className="min-h-screen bg-gradient-to-b from-[#25053f] to-[#123b4f] text-white p-6">
        <div className='flex flex-wrap gap-2 mb-5'>
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
      <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center">
        {/* Left Info */}
        <div className="flex-1">
          <div className="text-3xl font-bold"> {details?.title ? details?.title : details?.name}</div>
          <small>{details?.release_date?.split('-')[0]}</small>
          <div className="flex items-center gap-2 mb-2">
          <div className="flex text-yellow-400">
            {Array.from({ length: 5 }).map((_, i) =>
              i < Math.round((details?.vote_average || 0) / 2)
                ? <FaStar key={i} />
                : <FaStar key={i} className="text-gray-500" />
            )}
          </div>
          <span className="ml-2 text-white font-medium">{((details?.vote_average || 0) / 2).toFixed(1)}</span>
        </div>
          {/* <div className="text-xl mb-2">★★★☆☆</div> */}

          <div className="grid grid-cols-2 gap-4 mb-6">
            {details?.genres && 
                <div>
                <div className="font-bold text-gray-300">GENRE</div>
                    {details?.genres?.map((genre) => (
                        <div key={genre.id}>{genre.name}</div>
                    ))}
                </div>
            }
            {details?.runtime && 
                <div>
                    <div className="font-bold text-gray-300">DURATION</div>
                    <div>{Math.round(details?.runtime / 60)}H {details?.runtime % 60}M</div>
                </div>
            }
            <div>
              <div className="font-bold text-gray-300 mt-2">DIRECTOR</div>
              <div>Lorene Scafaria</div>
            </div>
            <div>
              <div className="font-bold text-gray-300 mt-2">PRODUCER</div>
              <div>Eline Goldsmith</div>
              <div>Thomas</div>
              <div>Jennifer Lopais</div>
            </div>
          </div>

          <p className="text-sm text-gray-200 mb-4 max-w-xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Arcu a lectus laoreet ipsum at sed. Porta.
          </p>

          {/* Buttons */}
          <div className="flex gap-4 mt-4">
            <button className="btn btn-outline btn-sm gap-2 text-white border-white hover:border-green-400">
              <FaDesktop />
              Trailer
            </button>
            <button className="btn btn-outline btn-sm gap-2 text-white border-white hover:border-green-400">
              <FaPlay />
              Play
            </button>
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

      {/* Cast Section */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Cast</h2>
        <div className="flex gap-6 flex-wrap">
          {[1, 2, 3, 4].map((_, i) => (
            <div key={i} className="flex flex-col items-center w-[100px]">
              <div className="w-20 h-20 rounded-full overflow-hidden mb-2 border-2 border-white shadow">
                <img
                  src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'women' : 'men'}/${i + 10}.jpg`}
                  alt="Cast"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="text-sm text-center">Lorem Ipsum</div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default ContentDetails;
