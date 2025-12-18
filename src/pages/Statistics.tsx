import React from 'react';
import { BarChart2, TrendingUp, Users, Activity } from 'lucide-react';

export default function Statistics() {
  const stats = [
    {
      title: 'Total Patients',
      value: '1,482',
      change: '+12.5%',
      icon: Users,
    },
    {
      title: 'Average Recovery Time',
      value: '12.3 days',
      change: '-2.3%',
      icon: TrendingUp,
    },
    {
      title: 'Success Rate',
      value: '94.2%',
      change: '+1.2%',
      icon: Activity,
    },
    {
      title: 'Procedures',
      value: '642',
      change: '+5.3%',
      icon: BarChart2,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-xl">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-500">{stat.title}</span>
                <div className="p-2 bg-mint-50 rounded-lg">
                  <Icon className="w-5 h-5 text-mint-500" />
                </div>
              </div>
              <p className="text-2xl font-semibold mb-1">{stat.value}</p>
              <p className={`text-sm ${stat.change.startsWith('+') ? 'text-mint-500' : 'text-red-500'}`}>
                {stat.change} from last month
              </p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl">
          <h3 className="text-lg font-semibold mb-6">Monthly Statistics</h3>
          <div className="h-64 flex items-center justify-center text-gray-500">
            Chart placeholder
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl">
          <h3 className="text-lg font-semibold mb-6">Patient Demographics</h3>
          <div className="h-64 flex items-center justify-center text-gray-500">
            Chart placeholder
          </div>
        </div>
      </div>
    </div>
  );
}