import { LucideIcon } from 'lucide-react';

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
    dateOfBirth?: string;
    bloodType?: string;
    height?: string;
    weight?: string;
    allergies?: string[];
    medications?: string[];
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

export interface Metric {
    title: string;
    value: number;
    maxValue: number;
    initialValue: number;
}

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

export type PatientInfo = Patient;