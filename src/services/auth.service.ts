import { AuthFormData } from '../types/auth.types';

export const authService = {
  async signIn(data: AuthFormData): Promise<void> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Add actual API integration here
  },

  async signUp(data: AuthFormData): Promise<void> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Add actual API integration here
  },

  async signOut(): Promise<void> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Add actual API integration here
  }
};