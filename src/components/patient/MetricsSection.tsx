import React, { useState, useEffect } from 'react';
import { Activity, Heart, FileText, DollarSign } from 'lucide-react';

interface Metric {
  label: string;
  value: string;
  change: string;
  icon: any;
  iconColor: string;
  changeColor: string;
  animate?: boolean;
}

const metrics: Metric[] = [
  {
    label: 'H/W',
    value: '6.9/178',
    change: '+55%',
    icon: Activity,
    iconColor: 'text-[#4FD1C5]',
    changeColor: 'text-[#4FD1C5]',
    animate: true
  },
  {
    label: 'Blood Pressure',
    value: '160/100',
    change: '+5%',
    icon: Heart,
    iconColor: 'text-[#4FD1C5]',
    changeColor: 'text-[#4FD1C5]',
    animate: true
  },
  {
    label: 'Heart Rate (bpm)',
    value: '110',
    change: '-14%',
    icon: FileText,
    iconColor: 'text-red-500',
    changeColor: 'text-red-500',
    animate: true
  },
  {
    label: 'Due more info',
    value: '$173,000',
    change: '+8%',
    icon: DollarSign,
    iconColor: 'text-[#4FD1C5]',
    changeColor: 'text-[#4FD1C5]',
    animate: true
  }
];

function MetricCard({ metric }: { metric: Metric }) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = metric.icon;

  return (
    <div
      className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-gray-500 text-sm font-medium">{metric.label}</span>
        <div 
          className={`p-2.5 rounded-xl transition-all duration-300 ${
            isHovered ? 'bg-[#4FD1C5] text-white scale-110' : `${metric.iconColor} bg-[#4FD1C5]/10`
          }`}
        >
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div>
        <p className="text-2xl font-bold mb-2">{metric.value}</p>
        <p className={`text-sm font-medium ${metric.changeColor}`}>
          {metric.change} from last month
        </p>
      </div>
    </div>
  );
}

export default function MetricsSection() {
  const [animatedMetrics, setAnimatedMetrics] = useState(metrics);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedMetrics(current =>
        current.map(metric => {
          if (!metric.animate) return metric;
          
          const currentValue = parseFloat(metric.value.split('/')[0]);
          const newValue = currentValue + (Math.random() * 0.2 - 0.1);
          
          return {
            ...metric,
            value: metric.value.includes('/')
              ? `${newValue.toFixed(1)}/178`
              : metric.value.includes('$')
              ? `$${(parseFloat(metric.value.slice(1).replace(',', '')) + Math.random() * 1000 - 500).toFixed(0)}`
              : `${newValue.toFixed(0)}`
          };
        })
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {animatedMetrics.map((metric, index) => (
        <MetricCard key={index} metric={metric} />
      ))}
    </div>
  );
}