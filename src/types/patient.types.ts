import { LucideIcon } from 'lucide-react';

export type StrategyType = 'A' | 'B' | 'C' | null;

export interface PatientHeaderProps {
  name: string;
  id: string;
  imageUrl: string;
}

export interface MetricCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
}

export interface PatientInfo {
  id: string;
  name: string;
  email: string;
  imageUrl: string;
  dateOfBirth: string;
  bloodType: string;
  height: string;
  weight: string;
  allergies: string[];
  medications: string[];
  selectedStrategy?: StrategyType;
  trioScore?: number | null;
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