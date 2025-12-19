import React, { createContext, useContext, useState, ReactNode } from 'react';

export type StrategyType = 'A' | 'B' | 'C' | null;

export interface Patient {
  id: string;
  name: string;
  email: string;
  age: number;
  gender: string;
  date: string;
  imageUrl: string;
  selectedStrategy: StrategyType;
  trioScore: number | null;
}

export interface Strategy {
  id: StrategyType;
  name: string;
  score: number;
  mortalityRate: string;
  secondSurgeryRisk: string;
  complicationRisk: string;
  daysToRecovery: number;
}

interface PatientsContextType {
  patients: Patient[];
  getPatientById: (id: string) => Patient | undefined;
  updatePatientStrategy: (patientId: string, strategy: StrategyType, score?: number) => void;
  strategies: Strategy[];
}

const PatientsContext = createContext<PatientsContextType | undefined>(undefined);

export function PatientsProvider({ children }: { children: ReactNode }) {
  const strategies: Strategy[] = [
    {
      id: 'A',
      name: 'Strategy A',
      score: 8,
      mortalityRate: '2.5%',
      secondSurgeryRisk: '5.2%',
      complicationRisk: '8.1%',
      daysToRecovery: 45,
    },
    {
      id: 'B',
      name: 'Strategy B',
      score: 4,
      mortalityRate: '4.8%',
      secondSurgeryRisk: '12.5%',
      complicationRisk: '15.3%',
      daysToRecovery: 60,
    },
    {
      id: 'C',
      name: 'Strategy C',
      score: 6,
      mortalityRate: '3.2%',
      secondSurgeryRisk: '8.7%',
      complicationRisk: '11.2%',
      daysToRecovery: 52,
    },
  ];

  const [patients, setPatients] = useState<Patient[]>([
    {
      id: '28391',
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      age: 38,
      gender: 'Male',
      date: '14/06/21',
      imageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop',
      selectedStrategy: null,
      trioScore: null,
    },
    {
      id: '28392',
      name: 'Esthera Jackson',
      email: 'esthera@gmail.com',
      age: 39,
      gender: 'Female',
      date: '14/06/21',
      imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
      selectedStrategy: null,
      trioScore: null,
    },
    {
      id: '28393',
      name: 'Alexa Liras',
      email: 'alexa@gmail.com',
      age: 27,
      gender: 'Female',
      date: '14/06/21',
      imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
      selectedStrategy: null,
      trioScore: null,
    },
    {
      id: '28394',
      name: 'Mendi Tolliver',
      email: 'freduardo@gmail.com',
      age: 42,
      gender: 'Male',
      date: '14/06/21',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
      selectedStrategy: null,
      trioScore: null,
    },
  ]);

  const getPatientById = (id: string): Patient | undefined => {
    return patients.find((p) => p.id === id);
  };

  const updatePatientStrategy = (patientId: string, strategy: StrategyType, score?: number) => {
    setPatients((prevPatients) =>
      prevPatients.map((p) => {
        if (p.id === patientId) {
          return {
            ...p,
            selectedStrategy: strategy,
            trioScore: score !== undefined ? score : null,
          };
        }
        return p;
      })
    );
  };

  return (
    <PatientsContext.Provider
      value={{
        patients,
        getPatientById,
        updatePatientStrategy,
        strategies,
      }}
    >
      {children}
    </PatientsContext.Provider>
  );
}

export function usePatients() {
  const context = useContext(PatientsContext);
  if (context === undefined) {
    throw new Error('usePatients must be used within a PatientsProvider');
  }
  return context;
}

