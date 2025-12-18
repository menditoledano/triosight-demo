/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        mint: {
          50: '#e6faf9',
          500: '#00c7be',
          600: '#00b3ab',
        },
        navy: {
          900: '#1B1E3D',
        },
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E2E8F0',
          300: '#D1D5DB',
          400: '#A0AEC0',
          500: '#6B7280',
          600: '#4B5563',
          700: '#2D3748',
        },
      },
      boxShadow: {
        'auth': '0px 7px 23px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
};