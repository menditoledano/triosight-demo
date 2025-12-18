import React from 'react';
import { Link } from 'react-router-dom';

export default function AuthFooter() {
  return (
    <footer className="auth-footer">
      <div className="flex items-center justify-center gap-1 mb-4">
        <span className="auth-footer-text">© 2024, Made with</span>
        <svg className="w-4 h-4 text-red-500 fill-current" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
        <span className="auth-footer-text">by</span>
        <span className="auth-footer-text">Triosight</span>
      </div>
      <div className="flex justify-center gap-6">
        <Link to="/sample" className="auth-footer-link">Sample</Link>
        <Link to="/blog" className="auth-footer-link">Blog</Link>
        <Link to="/license" className="auth-footer-link">License</Link>
      </div>
    </footer>
  );
}