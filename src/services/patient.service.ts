import { PatientInfo } from '../types/patient.types';

export const patientService = {
  async getPatient(id: string): Promise<PatientInfo> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock data
    return {
      id,
      name: 'John Doe',
      email: 'john.doe@example.com',
      imageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop',
      dateOfBirth: '15 May 1985',
      bloodType: 'A+',
      height: "5'11\"",
      weight: '176 lbs',
      allergies: ['Penicillin'],
      medications: ['Aspirin', 'Metformin'],
    };
  },

  async getPatients(): Promise<PatientInfo[]> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Add actual API integration here
    return [];
  }
};