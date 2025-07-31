import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const SignupForm = ({ signupData, setSignupData }) => {
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showSignupConfirm, setShowSignupConfirm] = useState(false);
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
    if (password.length < 8) return 'Password must be at least 8 characters';
    if (!/(?=.*[a-z])/.test(password)) return 'Password must contain at least one lowercase letter';
    if (!/(?=.*[A-Z])/.test(password)) return 'Password must contain at least one uppercase letter';
    if (!/(?=.*\d)/.test(password)) return 'Password must contain at least one number';
    if (!/(?=.*[@$!%*?&])/.test(password)) return 'Password must contain at least one special character';
    return '';
  };

  const validateConfirmPassword = (confirmPassword, password) => {
    if (!confirmPassword) return 'Please confirm your password';
    if (confirmPassword !== password) return 'Passwords do not match';
    return '';
  };

  const validateForm = () => {
    const newErrors = {};
    
    newErrors.email = validateEmail(signupData.email);
    newErrors.password = validatePassword(signupData.password);
    newErrors.confirmPassword = validateConfirmPassword(signupData.confirmPassword, signupData.password);
    
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
      
      // Handle successful signup here
      console.log('Signup successful:', signupData);
      
    } catch (error) {
      console.error('Signup failed:', error);
      setErrors({ general: 'Signup failed. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field, value) => {
    setSignupData({ ...signupData, [field]: value });
    
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
        <input
          type="email"
          className={`w-full px-4 py-2 rounded bg-transparent border text-white focus:outline-none focus:ring-2 transition-colors ${
            errors.email 
              ? 'border-red-500 focus:ring-red-500' 
              : 'border-gray-400 focus:ring-green-500'
          }`}
          placeholder="Email Address"
          value={signupData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          // required
        />
        {errors.email && (
          <p className="text-red-400 text-xs mt-1">{errors.email}</p>
        )}
      </div>
      
      <div>
        <label className="block text-gray-400 text-sm mb-1">Password</label>
        <div className="relative">
          <input
            type={showSignupPassword ? 'text' : 'password'}
            className={`w-full px-4 py-2 rounded bg-transparent border text-white focus:outline-none focus:ring-2 transition-colors ${
              errors.password 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-gray-400 focus:ring-green-500'
            }`}
            placeholder="Password"
            value={signupData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            // required
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 focus:outline-none hover:text-white transition-colors"
            onClick={() => setShowSignupPassword((prev) => !prev)}
            tabIndex={-1}
          >
            {showSignupPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          </button>
        </div>
        {errors.password && (
          <p className="text-red-400 text-xs mt-1">{errors.password}</p>
        )}
        <div className="mt-2 text-xs text-gray-400">
          <p>Password must contain:</p>
          <ul className="list-disc list-inside space-y-1 mt-1">
            <li className={signupData.password.length >= 8 ? 'text-green-400' : ''}>
              At least 8 characters
            </li>
            <li className={/(?=.*[a-z])/.test(signupData.password) ? 'text-green-400' : ''}>
              One lowercase letter
            </li>
            <li className={/(?=.*[A-Z])/.test(signupData.password) ? 'text-green-400' : ''}>
              One uppercase letter
            </li>
            <li className={/(?=.*\d)/.test(signupData.password) ? 'text-green-400' : ''}>
              One number
            </li>
            <li className={/(?=.*[@$!%*?&])/.test(signupData.password) ? 'text-green-400' : ''}>
              One special character
            </li>
          </ul>
        </div>
      </div>
      
      <div>
        <label className="block text-gray-400 text-sm mb-1">Confirm Password</label>
        <div className="relative">
          <input
            type={showSignupConfirm ? 'text' : 'password'}
            className={`w-full px-4 py-2 rounded bg-transparent border text-white focus:outline-none focus:ring-2 transition-colors ${
              errors.confirmPassword 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-gray-400 focus:ring-green-500'
            }`}
            placeholder="Confirm Password"
            value={signupData.confirmPassword}
            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
            // required
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 focus:outline-none hover:text-white transition-colors"
            onClick={() => setShowSignupConfirm((prev) => !prev)}
            tabIndex={-1}
          >
            {showSignupConfirm ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>
        )}
      </div>
      
      <button 
        type="submit" 
        disabled={isSubmitting}
        className="mt-2 w-full py-2 rounded bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold text-lg transition-all duration-200"
      >
        {isSubmitting ? 'Creating Account...' : 'SIGN UP'}
      </button>
    </form>
  );
};

export default SignupForm; 