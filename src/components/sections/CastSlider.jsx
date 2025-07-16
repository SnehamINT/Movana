// CastSlider.jsx
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CastSlider = ({ cast = [] }) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    centerMode: false,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 5 } },
      { breakpoint: 1024, settings: { slidesToShow: 4 } },
      { breakpoint: 768, settings: { slidesToShow: 3 } },
      { breakpoint: 640, settings: { slidesToShow: 2 } },
    ],
  };

  return (
    <div className="mt-12 cast_slider overflow-hidden">
      <h2 className="text-xl font-semibold mb-4">Cast</h2>
      <div className="w-full">
      <Slider {...settings}>
        {cast?.map((person, i) => (
          <div key={i} className="w-full">
            <div className="flex flex-col items-center w-[100px]">
              <div className="w-35 h-35 rounded-full overflow-hidden mb-2 border-2 border-white shadow">
                <img
                  src={
                    person?.profile_path
                      ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
                      : `https://ui-avatars.com/api/?name=${encodeURIComponent(person.name)}`
                  }
                  alt={person?.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="text-sm text-center">{person?.name}</div>
            </div>
          </div>
        ))}
      </Slider>
      </div>
    </div>
  );
};

export default CastSlider;
