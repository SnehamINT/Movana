import React, { useState, useEffect } from 'react';
import { getNowPlayingMovies } from '../../api/tmdb';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import LoginForm from '../../components/auth/LoginForm';
import SignupForm from '../../components/auth/SignupForm';

const Login = () => {
  const [tab, setTab] = useState('login');
  const [loginData, setLoginData] = useState({ email: '', password: '', remember: false });
  const [signupData, setSignupData] = useState({ email: '', password: '', confirmPassword: '' });
  const [backdrops, setBackdrops] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const data = await getNowPlayingMovies();
      setBackdrops(
        (data?.results || [])
          .map(movie => movie.backdrop_path)
          .filter(Boolean)
      );
    };
    fetchImages();
  }, []);

  return (
    <div className="min-h-screen flex items-center md:items-center justify-center bg-black relative overflow-hidden">
      {/* Swiper Background */}
      <div className="absolute inset-0 z-0">
        {backdrops.length > 0 && (
          <Swiper
            modules={[Autoplay, EffectFade]}
            spaceBetween={0}
            slidesPerView={1}
            loop
            effect="fade"
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            className="w-full h-full"
          >
            {backdrops.map((path, idx) => (
              <SwiperSlide key={idx}>
                <img
                  src={`https://image.tmdb.org/t/p/original${path}`}
                  alt="Backdrop"
                  className="w-full h-full object-cover object-center"
                  style={{ minHeight: '100vh', opacity: 0.6 }}
                />
                <div className="absolute inset-0 bg-black opacity-40" />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
        <div className="absolute inset-0 bg-black opacity-40" />
      </div>
      {/* Centered Card */}
      
      <div className="relative z-10 w-full max-w-md mx-auto bg-[#ffffff12] bg-opacity-70 md:rounded-xl shadow-lg p-8 flex flex-col items-center backdrop-blur-md backdrop-saturate-150  md:min-h-0">
        {/* Logo */}
        <a className="flex items-center text-xl logo_txt mb-6" href="/">
          <img src="/cineveda_icon.png" alt="" className='me-2' />Cine<span className='text-green-400'>Veda</span>
        </a>
        {/* Tabs */}
        <div className="flex mb-6 w-full">
          <button
            className={`flex-1 text-lg font-semibold pb-2 border-b-2 transition-colors ${tab === 'login' ? 'text-white border-green-500' : 'text-gray-400 border-transparent'}`}
            onClick={() => setTab('login')}
          >
            Login
          </button>
          <button
            className={`flex-1 text-lg font-semibold pb-2 border-b-2 transition-colors ${tab === 'signup' ? 'text-white border-green-500' : 'text-gray-400 border-transparent'}`}
            onClick={() => setTab('signup')}
          >
            Signup
          </button>
        </div>
        {/* Form */}
        {tab === 'login' ? (
          <LoginForm loginData={loginData} setLoginData={setLoginData} />
        ) : (
          <SignupForm signupData={signupData} setSignupData={setSignupData} />
        )}
      </div>
    </div>
  );
};

export default Login;