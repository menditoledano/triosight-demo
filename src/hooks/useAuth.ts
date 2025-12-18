import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import type { AuthFormData } from '../types/auth.types';

export const useAuth = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signIn = useCallback(async (data: AuthFormData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate(ROUTES.DASHBOARD);
    } catch (err) {
      setError('Authentication failed');
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  const signUp = useCallback(async (data: AuthFormData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate(ROUTES.DASHBOARD);
    } catch (err) {
      setError('Registration failed');
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  return {
    isLoading,
    error,
    signIn,
    signUp,
  };
};