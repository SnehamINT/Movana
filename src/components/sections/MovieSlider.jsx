import React from 'react'
import { getImageUrl } from '../../api/tmdb';
import { Skeleton } from '../ui/Skeleton';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useNavigate } from 'react-router-dom';
var settings = {
  dots: false,
  arrows: true,
  infinite: true,
  speed: 500,
  slidesToShow: 10,
  slidesToScroll: 1,
  initialSlide: 0,
  centerMode: true,
  autoplay: true,
  autoplaySpeed: 5000,  
  draggable: false,   
  swipe: false,       
  touchMove: false,    
  responsive: [
    {
      breakpoint: 2000,
      settings: {
        slidesToShow: 8,
        slidesToScroll: 1,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 1800,
      settings: {
        slidesToShow: 7,
        slidesToScroll: 1,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 1600,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 1,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 1400,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 1,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 1,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 450,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    }
  ]
};
const MovieSlider = ({ movies, loading, setFeatured, totalContent, mediaType }) => {
  const navigate = useNavigate(); 

  return (
    <div className="slider_area">
      <div className='text-sm mb-3 ps-4'>
        Showing 20 out of {totalContent} 
        <button
          className='btn btn-sm btn-link p-0 ms-1 uppercase text-green-400'
          onClick={() => navigate(`/${mediaType}/all`)}
        >
          View all
        </button>
      </div>
      <Slider {...settings}>
        {loading
          ? Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-56 rounded-xl" />
            ))
          : movies.map((movie) => (
              <div key={movie.id} className='slider_block' onClick={() => setFeatured(movie)}>
                <div className="bg-gray-900 text-white shadow-md slider_img">
                  <img
                    src={getImageUrl(movie.poster_path)}
                    alt={movie.title}
                    className="object-cover w-full"
                  />
                </div>
                <div className="p-2 w-full">
                  <h2 className="font-semibold text-xs line-clamp-2">
                    {movie.title || movie.name}
                  </h2>
                </div>
              </div>
            ))}
      </Slider>
    </div>
  );
};


export default MovieSlider