import React, { createContext, useContext, useState } from 'react';

interface MetricsContextType {
  metrics: Metric[];
  updateMetric: (index: number, value: number) => void;
}

interface Metric {
  title: string;
  value: number;
  maxValue: number;
  initialValue: number;
}

const MetricsContext = createContext<MetricsContextType | undefined>(undefined);

export function MetricsProvider({ children }: { children: React.ReactNode }) {
  const [metrics, setMetrics] = useState<Metric[]>([
    {
      title: 'Personal Background',
      value: 6.7,
      initialValue: 6.7,
      maxValue: 10
    },
    {
      title: 'Electrocardiogram (ECG/EKG)',
      value: 5.0,
      initialValue: 5.0,
      maxValue: 10
    },
    {
      title: 'Coagulation Profile (PT, INR, aPTT)',
      value: 2.8,
      initialValue: 2.8,
      maxValue: 10
    },
    {
      title: 'Blood Count and Metabolic Panel',
      value: 8.2,
      initialValue: 8.2,
      maxValue: 10
    },
    {
      title: 'Imaging',
      value: 7.1,
      initialValue: 7.1,
      maxValue: 10
    }
  ]);

  const updateMetric = (index: number, value: number) => {
    setMetrics(current =>
      current.map((metric, i) =>
        i === index ? { ...metric, value } : metric
      )
    );
  };

  return (
    <MetricsContext.Provider value={{ metrics, updateMetric }}>
      {children}
    </MetricsContext.Provider>
  );
}

export function useMetrics() {
  const context = useContext(MetricsContext);
  if (context === undefined) {
    throw new Error('useMetrics must be used within a MetricsProvider');
  }
  return context;
}