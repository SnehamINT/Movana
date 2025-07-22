// CastSlider.jsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import { IoMdArrowRoundForward } from "react-icons/io";
import 'swiper/css';
import 'swiper/css/navigation';
import { useNavigate } from 'react-router-dom';

const CastSlider = ({ cast }) => {
  const navigate = useNavigate();
  return (
    <div className="mt-12 bg-white/20 px-6 pt-4 pb-7">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Cast</h2>
        <div className="flex gap-2">
          <button
            className="cast-prev p-2 bg-white/10 hover:bg-white/20 text-white rounded-full cursor-pointer"
            aria-label="Previous"
          >
            <FaChevronLeft />
          </button>
          <button
            className="cast-next p-2 bg-white/10 hover:bg-white/20 text-white rounded-full cursor-pointer"
            aria-label="Next"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
      <div className='flex justify-center w-full'>
        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: '.cast-next',
            prevEl: '.cast-prev',
          }}
          spaceBetween={20}
          slidesOffsetBefore={0}
          slidesOffsetAfter={0}
          breakpoints={{
            320: {
              slidesPerView: cast.length < 2 ? cast.length : 2,
            },
            640: {
              slidesPerView: cast.length < 3 ? cast.length : 3,
            },
            768: {
              slidesPerView: cast.length < 4 ? cast.length : 4,
            },
            1024: {
              slidesPerView: cast.length < 6 ? cast.length : 6,
            },
          }}
        >
          {cast?.map((person) => (
            <SwiperSlide key={person.id}>
              <div className="flex flex-col items-center cursor-pointer" onClick={()=>navigate(`/person/details/${person?.id}`)}>
                <div className="w-30 h-30 md:w-40 md:h-40 rounded-full overflow-hidden mb-2 border-2 border-white shadow">
                  {person.profile_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w185${person.profile_path}`}
                      alt={person.name}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-300 text-center flex items-center justify-center text-black text-xl font-semibold">
                      {person.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </div>
                  )}
                </div>
                <div className="text-sm text-center break-words whitespace-pre-line leading-tight">
                  {person.name}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default CastSlider;
