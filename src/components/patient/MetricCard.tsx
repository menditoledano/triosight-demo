import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
}

export default function MetricCard({ icon: Icon, label, value }: MetricCardProps) {
  return (
    <div className="metric-card">
      <div className="flex items-center justify-between mb-4">
        <span className="text-gray-500">{label}</span>
        <div className="metric-icon">
          <Icon className="w-5 h-5 text-mint-500" />
        </div>
      </div>
      <p className="text-2xl font-semibold">{value}</p>
    </div>
  );
}