import React from 'react';

interface MetricBarProps {
  value: number;
  maxValue: number;
  label: string;
  score: string | number;
}

export default function MetricBar({ value, maxValue, label, score }: MetricBarProps) {
  const percentage = (value / maxValue) * 100;
  
  return (
    <div className="flex items-center justify-between mb-4">
      <span className="text-sm text-gray-500 w-48">{label}</span>
      <div className="flex items-center gap-4">
        <div className="w-48 h-1.5 bg-gray-200 rounded-full">
          <div
            className="h-full bg-[#4FD1C5] rounded-full"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <span className="text-sm font-medium w-8">{score}</span>
      </div>
    </div>
  );
}