import React from 'react';

export default function SocialButtons() {
  return (
    <div className="auth-social-buttons">
      <button className="auth-social-button">
        <img src="/mail-icon.svg" alt="Email" className="w-8 h-8" />
      </button>
      <button className="auth-social-button">
        <img src="/apple-icon.svg" alt="Apple" className="w-8 h-8" />
      </button>
      <button className="auth-social-button">
        <img src="/google-icon.svg" alt="Google" className="w-8 h-8" />
      </button>
    </div>
  );
}