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
    if (maxScore === minScore) return 5.5;
    const normalized = 1 + ((score - minScore) / (maxScore - minScore)) * 9;
    return Math.max(1, Math.min(10, normalized));
  };

  const normalizedScores = {
    a: normalizeScore(strategyScores.a),
    b: normalizeScore(strategyScores.b),
    c: normalizeScore(strategyScores.c)
  };

  const calculateDynamicData = (score: number) => {
    const invertedScore = 11 - score;
    return {
      mortality: (0.5 + (invertedScore / 10) * 4).toFixed(1) + '%',
      surgeryRisk: (2 + (invertedScore / 10) * 13).toFixed(1) + '%',
      complication: (5 + (invertedScore / 10) * 12).toFixed(1) + '%',
      recovery: Math.round(30 + (invertedScore / 10) * 40)
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
  return (
    <div 
      className="flex flex-col items-center group cursor-pointer w-full md:flex-1"
      onClick={onClick}
    >
      {/* Mobile: Horizontal layout */}
      <div className="md:hidden w-full">
        <div className={`flex items-center justify-between p-4 rounded-xl transition-all duration-300 ${
          isSelected 
            ? 'bg-[#00c7be]/10 border-2 border-[#00c7be]' 
            : 'bg-[#252849] border-2 border-transparent'
        }`}>
          {/* Left: Name and Score */}
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className={`text-3xl font-bold transition-all duration-300 ${
                isSelected ? 'text-[#00c7be]' : 'text-white'
              }`}>
                {score.toFixed(1)}
              </div>
              <div className="text-[#8F9BBA] text-[10px] uppercase tracking-wide">Score</div>
            </div>
            <div>
              <p className={`text-sm font-semibold mb-1 ${
                isSelected ? 'text-[#00c7be]' : 'text-white'
              }`}>{name}</p>
              <div className="space-y-1 text-xs">
                <div className="flex items-center space-x-2">
                  <span className="text-[#8F9BBA]">Mortality:</span>
                  <span className="text-white font-semibold">{data.mortality}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-[#8F9BBA]">Recovery:</span>
                  <span className="text-white font-semibold">{data.recovery}d</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right: Check icon */}
          {isSelected && (
            <CheckCircle2 className="w-6 h-6 text-[#00c7be] flex-shrink-0" />
          )}
        </div>
      </div>

      {/* Desktop: Vertical layout */}
      <div className="hidden md:flex md:flex-col md:items-center">
        <div className="relative w-full mb-5" style={{ height: '180px' }}>
          {/* Score above bar - moves with bar */}
          <div 
            className="absolute left-1/2 -translate-x-1/2 text-center transition-all duration-500 ease-in-out"
            style={{ bottom: `${(height / 10) * 100 + 10}px` }}
          >
            <div className={`text-4xl font-bold transition-colors duration-300 ${
              isSelected ? 'text-[#00c7be]' : 'text-white'
            }`}>
              {score.toFixed(1)}
            </div>
            <div className="text-[#8F9BBA] text-[10px] uppercase tracking-wide mt-0.5">
              TrioScore
            </div>
          </div>

          {/* Bar */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10">
            <div 
              className={`w-full rounded-t-lg transition-all duration-500 ease-in-out ${
                isSelected ? 'bg-[#00c7be]' : 'bg-white/20 group-hover:bg-white/30'
              }`}
              style={{ height: `${(height / 10) * 100}px` }}
            />
            {isSelected && (
              <div 
                className="absolute bottom-0 left-0 right-0 rounded-t-lg bg-[#00c7be] blur-md opacity-20 transition-all duration-500"
                style={{ height: `${(height / 10) * 100}px` }}
              />
            )}
          </div>
        </div>

        <div className={`rounded-xl p-4 w-full transform transition-all duration-300 ${
          isSelected 
            ? 'bg-[#00c7be]/10 border-2 border-[#00c7be] scale-105' 
            : 'bg-[#252849] border-2 border-transparent group-hover:scale-105 group-hover:shadow-xl'
        }`}>
          {isSelected && (
            <div className="flex justify-center mb-2">
              <CheckCircle2 className="w-5 h-5 text-[#00c7be]" />
            </div>
          )}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-[#8F9BBA] text-xs font-medium">Mortality</span>
              <span className="text-white text-sm font-semibold">{data.mortality}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#8F9BBA] text-xs font-medium">2nd Surgery</span>
              <span className="text-white text-sm font-semibold">{data.surgeryRisk}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#8F9BBA] text-xs font-medium">Complication</span>
              <span className="text-white text-sm font-semibold">{data.complication}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#8F9BBA] text-xs font-medium">Recovery</span>
              <span className="text-white text-sm font-semibold">{data.recovery}</span>
            </div>
          </div>
        </div>

        <div 
          className={`mt-2 px-3 py-1.5 rounded-lg transition-all duration-300 ${
            isSelected ? 'bg-[#00c7be]/20 text-[#00c7be] font-semibold' : 'text-[#8F9BBA]'
          }`}
        >
          <p className="text-xs font-medium">{name}</p>
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
    <div className="bg-[#1B1E3D] rounded-xl p-4 md:p-5">
      <div className="flex items-center justify-between mb-2 md:mb-3">
        <h3 className="text-lg md:text-xl font-semibold text-white">TrioScore</h3>
        <div className="flex items-center space-x-2">
          <span className="text-[#8F9BBA] text-xs">0</span>
          <div className="w-px h-3 bg-[#8F9BBA]/20"></div>
          <span className="text-[#8F9BBA] text-xs">10</span>
        </div>
      </div>

      {showConfirmation && (
        <div className="mb-3 p-2 bg-[#00c7be]/20 border border-[#00c7be] rounded-lg flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-[#00c7be] flex-shrink-0" />
          <span className="text-[#00c7be] font-medium text-xs">
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
      <div className="hidden md:flex md:justify-around md:items-end md:gap-3 mb-4">
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
        <div className="flex justify-center mt-3">
          <button
            onClick={handleSubmit}
            className="w-full md:w-auto px-6 md:px-8 py-2 md:py-2.5 bg-[#00c7be] hover:bg-[#00b3ab] text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm"
          >
            Submit Strategy
          </button>
        </div>
      )}
    </div>
  );
}