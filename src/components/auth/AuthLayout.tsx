import React, { ReactNode } from 'react';
import AuthFooter from './AuthFooter';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

export default function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="auth-background">
      <div className="auth-pattern" />
      
      <div className="auth-logo">
        Triosight
      </div>

      <div className="auth-container">
        <div className="auth-welcome">
          <h2>{title}</h2>
          {subtitle && <p>{subtitle}</p>}
        </div>

        <div className="auth-form-container">
          {children}
        </div>

        <AuthFooter />
      </div>
    </div>
  );
}