import React from 'react';
import { useMetrics } from '../../context/MetricsContext';

interface Strategy {
  name: string;
  height: number;
  isHighest: boolean;
  data: {
    mortality: number;
    surgeryRisk: number;
    complication: number;
    recovery: number;
  };
}

interface StrategyProps extends Strategy {
  isHighest: boolean;
}

function calculateStrategyData(metrics: any[]): Strategy[] {
  const weights = {
    'Personal Background': { a: 3.0, b: 0.3, c: 0.2 },
    'Electrocardiogram (ECG/EKG)': { a: 0.2, b: 2.5, c: 0.4 },
    'Coagulation Profile (PT, INR, aPTT)': { a: 0.4, b: 2.8, c: 0.3 },
    'Blood Count and Metabolic Panel': { a: 2.8, b: 0.3, c: 2.0 },
    'Imaging': { a: 0.5, b: 0.4, c: 3.0 }
  };

  const strategyScores = {
    a: metrics.reduce((acc, metric) => 
      acc + Math.pow(metric.value, 1.5) * weights[metric.title as keyof typeof weights].a, 0),
    b: metrics.reduce((acc, metric) => 
      acc + Math.pow(metric.value, 1.5) * weights[metric.title as keyof typeof weights].b, 0),
    c: metrics.reduce((acc, metric) => 
      acc + Math.pow(metric.value, 1.5) * weights[metric.title as keyof typeof weights].c, 0)
  };

  const maxScore = Math.max(strategyScores.a, strategyScores.b, strategyScores.c);
  const normalizedScores = {
    a: Math.pow((strategyScores.a / maxScore), 0.6) * 8,
    b: Math.pow((strategyScores.b / maxScore), 0.6) * 8,
    c: Math.pow((strategyScores.c / maxScore), 0.6) * 8
  };

  const highest = Object.entries(normalizedScores).reduce((a, b) => 
    a[1] > b[1] ? a : b)[0];

  // Calculate dynamic values based on metrics
  const calculateDynamicValues = (baseValues: any, multiplier: number) => {
    return {
      mortality: +(baseValues.mortality * multiplier).toFixed(1),
      surgeryRisk: Math.round(baseValues.surgeryRisk * multiplier),
      complication: Math.round(baseValues.complication * multiplier),
      recovery: Math.round(baseValues.recovery * multiplier)
    };
  };

  const baseValues = {
    a: { mortality: 0.1, surgeryRisk: 8, complication: 5, recovery: 4 },
    b: { mortality: 0.2, surgeryRisk: 5, complication: 9, recovery: 6 },
    c: { mortality: 0.3, surgeryRisk: 4, complication: 7, recovery: 3 }
  };

  return [
    {
      name: 'Strategy A',
      height: normalizedScores.a,
      isHighest: highest === 'a',
      data: calculateDynamicValues(baseValues.a, normalizedScores.a / 4)
    },
    {
      name: 'Strategy B',
      height: normalizedScores.b,
      isHighest: highest === 'b',
      data: calculateDynamicValues(baseValues.b, normalizedScores.b / 4)
    },
    {
      name: 'Strategy C',
      height: normalizedScores.c,
      isHighest: highest === 'c',
      data: calculateDynamicValues(baseValues.c, normalizedScores.c / 4)
    }
  ];
}

function Strategy({ data, height, name, isHighest }: StrategyProps) {
  return (
    <div className="flex flex-col items-center group">
      {/* Bar */}
      <div className="relative w-12">
        <div 
          className={`w-full rounded-t-lg transition-all duration-500 ease-in-out transform ${
            isHighest ? 'bg-[#00c7be]' : 'bg-white/20'
          }`}
          style={{ height: `${height * 40}px` }}
        />
        {/* Highlight Glow Effect */}
        {isHighest && (
          <div 
            className="absolute inset-0 rounded-t-lg bg-[#00c7be] blur-md opacity-20 transition-opacity duration-500"
            style={{ height: `${height * 40}px` }}
          />
        )}
      </div>

      {/* Data Card */}
      <div className="mt-6 bg-[#252849] rounded-xl p-6 w-full max-w-[280px] transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-[#8F9BBA] text-sm font-medium">Mortality Rate</span>
            <span className="text-white font-semibold">{data.mortality}%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#8F9BBA] text-sm font-medium">2nd Surgery Risk</span>
            <span className="text-white font-semibold">{data.surgeryRisk}%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#8F9BBA] text-sm font-medium">Complication Risk</span>
            <span className="text-white font-semibold">{data.complication}%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#8F9BBA] text-sm font-medium">Days to Recovery</span>
            <span className="text-white font-semibold">{data.recovery}</span>
          </div>
        </div>
      </div>

      {/* Strategy Name */}
      <div 
        className={`mt-4 px-4 py-2 rounded-lg transition-all duration-300 ${
          isHighest ? 'bg-[#00c7be]/10 text-[#00c7be]' : 'text-[#8F9BBA]'
        }`}
      >
        <p className="text-sm font-medium">{name}</p>
      </div>
    </div>
  );
}

export default function TrioScore() {
  const { metrics } = useMetrics();
  const strategies = calculateStrategyData(metrics);

  return (
    <div className="bg-[#1B1E3D] rounded-xl p-6">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-semibold text-white">TrioScore</h3>
        <div className="flex items-center space-x-2">
          <span className="text-[#8F9BBA] text-sm">0</span>
          <div className="w-px h-4 bg-[#8F9BBA]/20"></div>
          <span className="text-[#8F9BBA] text-sm">10</span>
        </div>
      </div>
      <div className="flex justify-around items-end">
        {strategies.map((strategy, index) => (
          <Strategy key={index} {...strategy} />
        ))}
      </div>
    </div>
  );
}