// CastSlider.jsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import { IoMdArrowRoundForward } from "react-icons/io";
import 'swiper/css';
import 'swiper/css/navigation';

const CrewSlider = ({ cast }) => {
  return (
    <div className="mt-12 px-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Crew</h2>
        <div className="flex gap-2">
          <button
            className="cast-prev2 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full cursor-pointer"
            aria-label="Previous"
          >
            <FaChevronLeft />
          </button>
          <button
            className="cast-next2 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full cursor-pointer"
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
            nextEl: '.cast-next2',
            prevEl: '.cast-prev2',
          }}
          spaceBetween={20}
          slidesOffsetBefore={0}
          slidesOffsetAfter={0}
          breakpoints={{
            320: {
              slidesPerView: 2,
              // slidesOffsetBefore: 30,
            },
            640: {
              slidesPerView: 3,
              // slidesOffsetBefore: 40,
            },
            768: {
              slidesPerView: 4,
              // slidesOffsetBefore: 50
            },
            1024: {
              slidesPerView: 6,
              // slidesOffsetBefore: 60,
            },
          }}
        >
          {cast?.map((person) => (
            <SwiperSlide key={person.id}>
              <div className="flex flex-col items-center">
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

export default CrewSlider;
