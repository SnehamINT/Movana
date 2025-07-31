import React, { useState } from 'react';

const HERO_IMAGE = 'https://wallpapers.com/images/hd/superman-shadow-hero-4k-6q1v7v7v7v7v7v7v.jpg'; // Example image, replace with your own

const Login = () => {
  const [tab, setTab] = useState('login');
  const [loginData, setLoginData] = useState({ email: '', password: '', remember: false });
  const [signupData, setSignupData] = useState({ email: '', password: '', confirmPassword: '' });

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
      {/* Background Hero Image */}
      <div className="absolute inset-0 z-0">
        <img src={HERO_IMAGE} alt="hero" className="w-full h-full object-cover object-center opacity-60" />
        <div className="absolute inset-0 bg-black opacity-80" />
      </div>
      {/* Centered Card */}
      <div className="relative z-10 w-full max-w-md mx-auto bg-[#18181b] bg-opacity-90 rounded-xl shadow-lg p-8 flex flex-col items-center">
        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <img src="/src/assets/react.svg" alt="logo" className="w-10 h-10 mb-2" />
          <span className="text-2xl font-bold text-white tracking-wide">UFlix</span>
        </div>
        {/* Tabs */}
        <div className="flex mb-6 w-full">
          <button
            className={`flex-1 text-lg font-semibold pb-2 border-b-2 transition-colors ${tab === 'login' ? 'text-white border-violet-500' : 'text-gray-400 border-transparent'}`}
            onClick={() => setTab('login')}
          >
            Login
          </button>
          <button
            className={`flex-1 text-lg font-semibold pb-2 border-b-2 transition-colors ${tab === 'signup' ? 'text-white border-violet-500' : 'text-gray-400 border-transparent'}`}
            onClick={() => setTab('signup')}
          >
            Signup
          </button>
        </div>
        {/* Form */}
        {tab === 'login' ? (
          <form className="w-full flex flex-col gap-4">
            <div>
              <label className="block text-gray-400 text-sm mb-1">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  className="w-full px-4 py-2 rounded bg-[#23232a] text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                  placeholder="Email Address"
                  value={loginData.email}
                  onChange={e => setLoginData({ ...loginData, email: e.target.value })}
                  required
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16v16H4z" stroke="none"/><path d="M22 6l-10 7L2 6" /></svg>
                </span>
              </div>
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-1">Password</label>
              <div className="relative">
                <input
                  type="password"
                  className="w-full px-4 py-2 rounded bg-[#23232a] text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                  placeholder="Password"
                  value={loginData.password}
                  onChange={e => setLoginData({ ...loginData, password: e.target.value })}
                  required
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm6-6V7a6 6 0 1 0-12 0v4" /></svg>
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-400">
                <input
                  type="checkbox"
                  checked={loginData.remember}
                  onChange={e => setLoginData({ ...loginData, remember: e.target.checked })}
                  className="accent-violet-500"
                />
                Remember Me
              </label>
              <button type="button" className="text-violet-400 hover:underline">Forgot Password?</button>
            </div>
            <button type="submit" className="mt-2 w-full py-2 rounded bg-violet-600 hover:bg-violet-700 text-white font-semibold text-lg transition">LOGIN</button>
          </form>
        ) : (
          <form className="w-full flex flex-col gap-4">
            <div>
              <label className="block text-gray-400 text-sm mb-1">Email Address</label>
              <input
                type="email"
                className="w-full px-4 py-2 rounded bg-[#23232a] text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                placeholder="Email Address"
                value={signupData.email}
                onChange={e => setSignupData({ ...signupData, email: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-1">Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 rounded bg-[#23232a] text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                placeholder="Password"
                value={signupData.password}
                onChange={e => setSignupData({ ...signupData, password: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-1">Confirm Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 rounded bg-[#23232a] text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                placeholder="Confirm Password"
                value={signupData.confirmPassword}
                onChange={e => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                required
              />
            </div>
            <button type="submit" className="mt-2 w-full py-2 rounded bg-violet-600 hover:bg-violet-700 text-white font-semibold text-lg transition">SIGN UP</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;