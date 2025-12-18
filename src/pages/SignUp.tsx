import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
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
    <div className="min-h-screen bg-[#4FD1C5] relative overflow-hidden">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 bg-[url('https://raw.githubusercontent.com/stackblitz/stackblitz-codeflow/main/wave-pattern.png')] 
        bg-cover bg-center opacity-10"
      ></div>

      {/* Logo */}
      <div className="absolute top-16 left-1/2 -translate-x-1/2">
        <h1 className="text-[24px] font-bold text-[#2D3748]">
          Triosight
        </h1>
      </div>

      {/* Main Content */}
      <div className="relative flex flex-col items-center justify-center min-h-screen px-4">
        {/* Welcome Text */}
        <div className="text-center mb-12">
          <h2 className="text-[32px] font-bold text-white mb-2">
            Welcome!
          </h2>
          <p className="text-[14px] text-white">
            Empowering Hearts using ML.
          </p>
        </div>

        {/* Sign Up Form */}
        <div className="w-full max-w-[452px] bg-white rounded-[15px] shadow-auth p-8">
          <h3 className="text-center text-[18px] font-bold text-[#2D3748] mb-8">
            Register with
          </h3>

          {/* Social Login Options */}
          <div className="flex justify-center gap-4 mb-8">
            <button className="w-[75px] h-[75px] flex items-center justify-center border border-[#E2E8F0] rounded-[15px] hover:bg-gray-50">
              <img src="/mail-icon.svg" alt="Email" className="w-8 h-8" />
            </button>
            <button className="w-[75px] h-[75px] flex items-center justify-center border border-[#E2E8F0] rounded-[15px] hover:bg-gray-50">
              <img src="/apple-icon.svg" alt="Apple" className="w-8 h-8" />
            </button>
            <button className="w-[75px] h-[75px] flex items-center justify-center border border-[#E2E8F0] rounded-[15px] hover:bg-gray-50">
              <img src="/google-icon.svg" alt="Google" className="w-8 h-8" />
            </button>
          </div>

          <div className="relative text-center mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#E2E8F0]"></div>
            </div>
            <span className="relative bg-white px-4 text-[14px] text-[#A0AEC0]">
              or
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[14px] text-[#2D3748] mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                className="w-full h-[50px] px-5 border border-[#E2E8F0] rounded-[15px] text-[14px] focus:ring-2 focus:ring-[#4FD1C5] focus:border-transparent"
              />
            </div>

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
                className="w-full h-[50px] px-5 border border-[#E2E8F0] rounded-[15px] text-[14px] focus:ring-2 focus:ring-[#4FD1C5] focus:border-transparent"
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
                className="w-full h-[50px] px-5 border border-[#E2E8F0] rounded-[15px] text-[14px] focus:ring-2 focus:ring-[#4FD1C5] focus:border-transparent"
              />
            </div>

            <div className="flex items-center">
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
            </div>

            <button
              type="submit"
              className="w-full h-[45px] bg-[#354251] text-white text-[10px] font-bold rounded-[12px] hover:bg-opacity-90 transition-colors"
            >
              SIGN UP
            </button>
          </form>

          <p className="mt-6 text-center text-[14px] text-[#A0AEC0]">
            Already have an account?{' '}
            <Link to="/signin" className="text-[#4FD1C5] hover:underline">
              Sign in
            </Link>
          </p>
        </div>

        {/* Footer */}
        <footer className="absolute bottom-6 left-0 right-0 text-center">
          <div className="flex items-center justify-center gap-1 mb-4">
            <span className="text-[12px] text-[#A0AEC0]">© 2024, Made with</span>
            <svg className="w-4 h-4 text-red-500 fill-current" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <span className="text-[12px] text-[#A0AEC0]">by</span>
            <span className="text-[12px] text-[#A0AEC0]">Triosight</span>
          </div>
          <div className="flex justify-center gap-6">
            <Link to="/sample" className="text-[12px] text-[#A0AEC0] hover:text-white">
              Sample
            </Link>
            <Link to="/blog" className="text-[12px] text-[#A0AEC0] hover:text-white">
              Blog
            </Link>
            <Link to="/license" className="text-[12px] text-[#A0AEC0] hover:text-white">
              License
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}