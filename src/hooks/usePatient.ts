import { useState, useCallback } from 'react';
import type { PatientInfo } from '../types/patient.types';

export const usePatient = (patientId: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [patient, setPatient] = useState<PatientInfo | null>(null);

  const fetchPatientData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Mock data
      setPatient({
        id: patientId,
        name: 'John Doe',
        email: 'john.doe@example.com',
        imageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop',
        dateOfBirth: '15 May 1985',
        bloodType: 'A+',
        height: "5'11\"",
        weight: '176 lbs',
        allergies: ['Penicillin'],
        medications: ['Aspirin', 'Metformin'],
      });
    } catch (err) {
      setError('Failed to fetch patient data');
    } finally {
      setIsLoading(false);
    }
  }, [patientId]);

  return {
    isLoading,
    error,
    patient,
    fetchPatientData,
  };
};