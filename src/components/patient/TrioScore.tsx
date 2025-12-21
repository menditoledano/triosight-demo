import React, { useState } from 'react';
import { useMetrics } from '../../context/MetricsContext';
import { usePatients, StrategyType } from '../../context/PatientsContext';
import { CheckCircle2 } from 'lucide-react';

interface Strategy {
  id: StrategyType;
  name: string;
  score: number;
  height: number;
  data: {
    mortality: string;
    surgeryRisk: string;
    complication: string;
    recovery: number;
  };
}

interface StrategyProps extends Strategy {
  isSelected: boolean;
  onClick: () => void;
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
  const minScore = Math.min(strategyScores.a, strategyScores.b, strategyScores.c);
  
  const normalizeScore = (score: number) => {
    if (maxScore === minScore) return 4.1;
    const normalized = 1 + ((score - minScore) / (maxScore - minScore)) * 7.2;
    return Math.max(1, Math.min(8.2, normalized));
  };

  const normalizedScores = {
    a: normalizeScore(strategyScores.a),
    b: normalizeScore(strategyScores.b),
    c: normalizeScore(strategyScores.c)
  };

  const calculateDynamicData = (score: number) => {
    const invertedScore = 9.2 - score;
    const normalizedInverted = invertedScore / 8.2;
    return {
      mortality: (0.5 + normalizedInverted * 4).toFixed(1) + '%',
      surgeryRisk: (2 + normalizedInverted * 13).toFixed(1) + '%',
      complication: (5 + normalizedInverted * 12).toFixed(1) + '%',
      recovery: Math.round(30 + normalizedInverted * 40)
    };
  };

  return [
    {
      id: 'A',
      name: 'Strategy A',
      score: normalizedScores.a,
      height: normalizedScores.a,
      data: calculateDynamicData(normalizedScores.a)
    },
    {
      id: 'B',
      name: 'Strategy B',
      score: normalizedScores.b,
      height: normalizedScores.b,
      data: calculateDynamicData(normalizedScores.b)
    },
    {
      id: 'C',
      name: 'Strategy C',
      score: normalizedScores.c,
      height: normalizedScores.c,
      data: calculateDynamicData(normalizedScores.c)
    }
  ];
}

function Strategy({ data, height, name, score, isSelected, onClick }: StrategyProps) {
  const barHeight = Math.max((height / 8.2) * 100, 8);
  
  return (
    <div 
      className="flex flex-col items-center group cursor-pointer w-full md:flex-1"
      onClick={onClick}
    >
      {/* Mobile: Horizontal layout */}
      <div className="md:hidden w-full">
        <div className={`flex items-center justify-between p-4 rounded-xl transition-all duration-300 ${
          isSelected 
            ? 'bg-mint-500/10 border-2 border-mint-500 shadow-lg' 
            : 'bg-[#252849] border-2 border-transparent hover:border-mint-500/30'
        }`}>
          <div className="flex items-center space-x-4 flex-1">
            <div className="text-center min-w-[60px]">
              <div className={`text-3xl font-bold transition-all duration-300 ${
                isSelected ? 'text-mint-500' : 'text-white'
              }`}>
                {score.toFixed(1)}
              </div>
              <div className="text-[#8F9BBA] text-[10px] uppercase tracking-wide mt-0.5">Score</div>
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-semibold mb-2 ${
                isSelected ? 'text-mint-500' : 'text-white'
              }`}>{name}</p>
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[#8F9BBA]">Mortality:</span>
                  <span className="text-white font-semibold">{data.mortality}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#8F9BBA]">Recovery:</span>
                  <span className="text-white font-semibold">{data.recovery}d</span>
                </div>
              </div>
            </div>
          </div>
          
          {isSelected && (
            <CheckCircle2 className="w-6 h-6 text-mint-500 flex-shrink-0 ml-3" />
          )}
        </div>
      </div>

      {/* Desktop: Vertical layout */}
      <div className="hidden md:flex md:flex-col md:items-center w-full">
        <div className="relative w-full mb-4" style={{ height: '200px' }}>
          {/* Score above bar */}
          <div 
            className="absolute left-1/2 -translate-x-1/2 text-center transition-all duration-500 ease-in-out z-10"
            style={{ bottom: `${barHeight + 15}px` }}
          >
            <div className={`text-4xl font-bold transition-colors duration-300 mb-0.5 ${
              isSelected ? 'text-mint-500' : 'text-white'
            }`}>
              {score.toFixed(1)}
            </div>
            <div className="text-[#8F9BBA] text-[10px] uppercase tracking-wide">
              TrioScore
            </div>
          </div>

          {/* Bar container */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12">
            <div 
              className={`w-full rounded-t-lg transition-all duration-500 ease-in-out relative ${
                isSelected 
                  ? 'bg-gradient-to-t from-mint-500 to-mint-500 shadow-lg shadow-mint-500/30' 
                  : 'bg-white/20 group-hover:bg-white/30'
              }`}
              style={{ height: `${barHeight}px`, minHeight: '8px' }}
            >
              {isSelected && (
                <div 
                  className="absolute inset-0 rounded-t-lg bg-mint-500 blur-md opacity-30"
                />
              )}
            </div>
          </div>
        </div>

        <div className={`rounded-xl p-4 w-full transform transition-all duration-300 ${
          isSelected 
            ? 'bg-mint-500/10 border-2 border-mint-500 shadow-lg shadow-mint-500/20' 
            : 'bg-[#252849] border-2 border-transparent group-hover:border-mint-500/30 group-hover:shadow-lg'
        }`}>
          {isSelected && (
            <div className="flex justify-center mb-3">
              <CheckCircle2 className="w-5 h-5 text-mint-500" />
            </div>
          )}
          <div className="space-y-2.5">
            <div className="flex justify-between items-center py-0.5">
              <span className="text-[#8F9BBA] text-xs font-medium">Mortality</span>
              <span className="text-white text-sm font-semibold">{data.mortality}</span>
            </div>
            <div className="flex justify-between items-center py-0.5">
              <span className="text-[#8F9BBA] text-xs font-medium">2nd Surgery</span>
              <span className="text-white text-sm font-semibold">{data.surgeryRisk}</span>
            </div>
            <div className="flex justify-between items-center py-0.5">
              <span className="text-[#8F9BBA] text-xs font-medium">Complication</span>
              <span className="text-white text-sm font-semibold">{data.complication}</span>
            </div>
            <div className="flex justify-between items-center py-0.5">
              <span className="text-[#8F9BBA] text-xs font-medium">Recovery</span>
              <span className="text-white text-sm font-semibold">{data.recovery}</span>
            </div>
          </div>
        </div>

        <div 
          className={`mt-3 px-4 py-2 rounded-lg transition-all duration-300 w-full text-center ${
            isSelected 
              ? 'bg-mint-500/20 text-mint-500 font-semibold' 
              : 'text-[#8F9BBA] hover:text-white'
          }`}
        >
          <p className="text-sm font-medium">{name}</p>
        </div>
      </div>
    </div>
  );
}

export default function TrioScore({ patientId }: { patientId?: string }) {
  const { metrics } = useMetrics();
  const { updatePatientStrategy, getPatientById } = usePatients();
  const strategies = calculateStrategyData(metrics);
  
  const patient = patientId ? getPatientById(patientId) : undefined;
  const [selectedStrategy, setSelectedStrategy] = useState<StrategyType>(
    patient?.selectedStrategy || null
  );
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleStrategySelect = (strategyId: StrategyType) => {
    setSelectedStrategy(strategyId);
  };

  const handleSubmit = () => {
    if (selectedStrategy && patientId) {
      const selectedStrategyData = strategies.find(s => s.id === selectedStrategy);
      const score = selectedStrategyData ? selectedStrategyData.score : null;
      updatePatientStrategy(patientId, selectedStrategy, score || undefined);
      setShowConfirmation(true);
      
      setTimeout(() => {
        setShowConfirmation(false);
      }, 3000);
    }
  };

  return (
    <div className="bg-[#1B1E3D] rounded-xl p-5 md:p-6">
      <div className="flex items-center justify-between mb-4 md:mb-5">
        <h3 className="text-xl md:text-2xl font-semibold text-white">TrioScore</h3>
      </div>

      {showConfirmation && (
        <div className="mb-3 p-2 bg-mint-500/20 border border-mint-500 rounded-lg flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-mint-500 flex-shrink-0" />
          <span className="text-mint-500 font-medium text-xs">
            Strategy successfully saved! TrioScore updated.
          </span>
        </div>
      )}

      {/* Mobile: Stack layout */}
      <div className="md:hidden space-y-3 mb-4">
        {strategies.map((strategy) => (
          <Strategy 
            key={strategy.id} 
            {...strategy} 
            isSelected={selectedStrategy === strategy.id}
            onClick={() => handleStrategySelect(strategy.id)}
          />
        ))}
      </div>

      {/* Desktop: Side by side */}
      <div className="hidden md:flex md:justify-between md:items-end md:gap-4 mb-4">
        {strategies.map((strategy) => (
          <Strategy 
            key={strategy.id} 
            {...strategy} 
            isSelected={selectedStrategy === strategy.id}
            onClick={() => handleStrategySelect(strategy.id)}
          />
        ))}
      </div>

      {selectedStrategy && patientId && (
        <div className="flex justify-center mt-4 pt-4 border-t border-[#252849]">
          <button
            onClick={handleSubmit}
            className="w-full md:w-auto px-8 md:px-10 py-3 md:py-3.5 bg-gradient-to-r from-mint-500 to-mint-500 hover:from-mint-600 hover:to-mint-600 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-mint-500/30 transform hover:scale-105 text-sm md:text-base"
          >
            Submit Strategy
          </button>
        </div>
      )}
    </div>
  );
}