import React from 'react';
import { useEffect, useState } from 'react';
import { getCredits, getDetailsById, getMovieVideos, getPersonDetailsById, getPersonDetailsWithKnownFor } from '../api/tmdb';
import { FaStar } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import KnownForSlider from '../components/sections/KnownForSlider';


const PersonDetails = () => {
    const { id } = useParams();
    const [details, setDetails] = useState(null);
    const [knownFor, setKnownFor] = useState(null);
    const [cast, setCast] = useState(null);
    const [videoKey, setVideoKey] = useState(null);
    

    useEffect(() => {
        const fetchDetails = async () => {
          try {
            // const data = await getPersonDetailsById(id);
            const knownForData = await getPersonDetailsWithKnownFor(id);
            setDetails(knownForData);
          } catch (error) {
            console.error('Failed to fetch details:', error);
          }
        };
        fetchDetails();
        console.log(id)
      }, [id]);

      console.log(details);

    if (!details) return <div>Loading...</div>;
  return (
    <>
    <div className="min-h-screen bg-gradient-to-b from-[#25053f] to-[#123b4f] text-white pt-6">
        <div className='flex flex-wrap gap-2 mb-5 px-6'>
            <div className="breadcrumbs text-sm me-auto">
            <ul>
                <li><Link to={`/`}>Home</Link></li>
                {/* <li><Link to={`/${type}/all`} className='capitalize'>{type}</Link></li> */}
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
            <span className="ml-2 text-white font-medium">{((details?.popularity || 0) / 2).toFixed(1)}</span>
            </div>
            {details?.tagline && 
                <p className='mb-3'>{details?.tagline}</p>
            }
            {/* <div className="text-xl mb-2">★★★☆☆</div> */}

                <div>
                <div className="font-bold text-gray-300 mt-2">BIOGRAPHY</div>
                <p>{details?.biography}</p>
                </div>
            <div className="grid grid-cols-2 gap-4 mb-6 mt-5">
                
                {details?.birthday && 
                    <div>
                        <div className="font-bold text-gray-300">BIRTHDAY</div>
                        <div>{details?.birthday}M</div>
                    </div>
                }
                {details?.place_of_birth && 
                    <div>
                    <div className="font-bold text-gray-300">PLACE OF BIRTH</div>
                        {details?.place_of_birth}
                    </div>
                }
                
            </div>

            </div>

            {/* Poster Image */}
            <div className="w-full max-w-[200px] lg:max-w-[250px]">
            <img
                // src="https://upload.wikimedia.org/wikipedia/en/0/0d/Avengers_Endgame_poster.jpg"
                src={`https://image.tmdb.org/t/p/w500${details?.profile_path}`}
                alt="Avengers"
                className="rounded-xl shadow-lg"
            />
            </div>
        </div>
        {details?.knownFor.length > 0 && 
            <KnownForSlider knownFor={details?.knownFor || []} />
        }       
    </div>
    </>
  );
};

export default PersonDetails;
