// knownForSlider.jsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import { IoMdArrowRoundForward } from "react-icons/io";
import 'swiper/css';
import 'swiper/css/navigation';
import { useNavigate } from 'react-router-dom';

const KnownForSlider = ({ knownFor }) => {
  const navigate = useNavigate();
  const mediaType = localStorage.getItem('type');
  return (
    <div className="mt-8 bg-white/20 px-6 pt-4 pb-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">known For</h2>
        <div className="flex gap-2">
          <button
            className="knownFor-prev p-2 bg-white/10 hover:bg-white/20 text-white rounded-full cursor-pointer"
            aria-label="Previous"
          >
            <FaChevronLeft />
          </button>
          <button
            className="knownFor-next p-2 bg-white/10 hover:bg-white/20 text-white rounded-full cursor-pointer"
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
            nextEl: '.knownFor-next',
            prevEl: '.knownFor-prev',
          }}
          spaceBetween={20}
          slidesOffsetBefore={0}
          slidesOffsetAfter={0}
          watchOverflow={true}
          breakpoints={{
            320: {
              slidesPerView: knownFor.length < 2 ? knownFor.length : 2,
            },
            640: {
              slidesPerView: knownFor.length < 3 ? knownFor.length : 3,
            },
            768: {
              slidesPerView: knownFor.length < 4 ? knownFor.length : 4,
            },
            1024: {
              slidesPerView: knownFor.length < 6 ? knownFor.length : 6,
            },
          }}
        >
          {knownFor?.map((person) => (
            <SwiperSlide key={person.id}>
              <div className="flex flex-col items-center cursor-pointer" onClick={()=>navigate(`/${person?.media_type}/details/${person?.id}`)}>
                <div className="w-30 h-30 md:w-40 md:h-40 rounded-full overflow-hidden mb-2 border-2 border-white shadow">
                  {person.poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w185${person?.poster_path}`}
                      alt={person?.name}
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

export default KnownForSlider;
