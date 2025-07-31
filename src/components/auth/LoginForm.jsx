import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const LoginForm = ({ loginData, setLoginData }) => {
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return 'Email is required';
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    return '';
  };

  const validatePassword = (password) => {
    if (!password) return 'Password is required';
    if (password.length < 6) return 'Password must be at least 6 characters';
    return '';
  };

  const validateForm = () => {
    const newErrors = {};
    
    newErrors.email = validateEmail(loginData.email);
    newErrors.password = validatePassword(loginData.password);
    
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Handle successful login here
      console.log('Login successful:', loginData);
      
    } catch (error) {
      console.error('Login failed:', error);
      setErrors({ general: 'Login failed. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field, value) => {
    setLoginData({ ...loginData, [field]: value });
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
      {errors.general && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-red-400 text-sm">
          {errors.general}
        </div>
      )}
      
      <div>
        <label className="block text-gray-400 text-sm mb-1">Email Address</label>
        <div className="relative">
          <input
            type="email"
            className={`w-full px-4 py-2 rounded bg-transparent border text-white focus:outline-none focus:ring-2 transition-colors ${
              errors.email 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-gray-400 focus:ring-green-500'
            }`}
            placeholder="Email Address"
            value={loginData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            // required
          />
        </div>
        {errors.email && (
          <p className="text-red-400 text-xs mt-1">{errors.email}</p>
        )}
      </div>
      
      <div>
        <label className="block text-gray-400 text-sm mb-1">Password</label>
        <div className="relative">
          <input
            type={showLoginPassword ? 'text' : 'password'}
            className={`w-full px-4 py-2 rounded bg-transparent border text-white focus:outline-none focus:ring-2 transition-colors ${
              errors.password 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-gray-400 focus:ring-green-500'
            }`}
            placeholder="Password"
            value={loginData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            // required
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 focus:outline-none hover:text-white transition-colors"
            onClick={() => setShowLoginPassword((prev) => !prev)}
            tabIndex={-1}
          >
            {showLoginPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          </button>
        </div>
        {errors.password && (
          <p className="text-red-400 text-xs mt-1">{errors.password}</p>
        )}
      </div>
      
      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 text-gray-400">
          <input
            type="checkbox"
            checked={loginData.remember}
            onChange={(e) => setLoginData({ ...loginData, remember: e.target.checked })}
            className="accent-green-500"
          />
          Remember Me
        </label>
        <button type="button" className="text-green-400 hover:underline transition-colors">
          Forgot Password?
        </button>
      </div>
      
      <button 
        type="submit" 
        disabled={isSubmitting}
        className="mt-2 w-full py-2 rounded bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold text-lg transition-all duration-200"
      >
        {isSubmitting ? 'Signing In...' : 'LOGIN'}
      </button>
    </form>
  );
};

export default LoginForm; 