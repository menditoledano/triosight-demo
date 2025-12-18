import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/auth/AuthLayout';
import SocialButtons from '../components/auth/SocialButtons';
import '../styles/auth.css';

export default function SignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <AuthLayout 
      title="Welcome Back!"
      subtitle="Sign in to continue"
    >
      <h3 className="text-center text-[18px] font-bold text-[#2D3748] mb-8">
        Sign in with
      </h3>

      <SocialButtons />

      <div className="auth-divider">
        <span>or</span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-[14px] text-[#2D3748] mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your email address"
            className="auth-input"
          />
        </div>

        <div>
          <label className="block text-[14px] text-[#2D3748] mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Your password"
            className="auth-input"
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="w-4 h-4 text-[#4FD1C5] border-[#E2E8F0] rounded"
            />
            <span className="text-[12px] text-[#2D3748]">Remember me</span>
          </label>
          <Link to="/forgot-password" className="text-[12px] text-[#4FD1C5] hover:underline">
            Forgot Password?
          </Link>
        </div>

        <button type="submit" className="auth-submit-button">
          SIGN IN
        </button>
      </form>

      <p className="mt-6 text-center text-[14px] text-[#A0AEC0]">
        Don't have an account?{' '}
        <Link to="/signup" className="text-[#4FD1C5] hover:underline">
          Sign up
        </Link>
      </p>
    </AuthLayout>
  );
}