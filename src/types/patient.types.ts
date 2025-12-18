import { LucideIcon } from 'lucide-react';

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
}