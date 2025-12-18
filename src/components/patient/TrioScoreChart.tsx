import React from 'react';

const strategies = [
  {
    name: 'Strategy A',
    height: 8,
    data: {
      mortality: 0.3,
      surgeryRisk: 13,
      complication: 7,
      recovery: 6
    }
  },
  {
    name: 'Strategy B',
    height: 4,
    data: {
      mortality: 0.4,
      surgeryRisk: 7,
      complication: 13,
      recovery: 8
    }
  },
  {
    name: 'Strategy C',
    height: 6,
    data: {
      mortality: 0.8,
      surgeryRisk: 7,
      complication: 11,
      recovery: 5
    }
  }
];

function Strategy({ data, height, name }: any) {
  return (
    <div className="flex flex-col items-center">
      <div 
        className="w-8 bg-[#00c7be] rounded-t-lg transition-all duration-300"
        style={{ height: `${height * 40}px` }}
      />
      <div className="mt-4 bg-[#1B1E3D] rounded-lg p-4 w-48">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-400">Mortality Rate</span>
            <span className="text-white">{data.mortality}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">2nd Surgery Risk</span>
            <span className="text-white">{data.surgeryRisk}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Complication Risk</span>
            <span className="text-white">{data.complication}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Days to Recovery</span>
            <span className="text-white">{data.recovery}</span>
          </div>
        </div>
      </div>
      <p className="text-gray-400 mt-4">{name}</p>
    </div>
  );
}

export default function TrioScoreChart() {
  return (
    <div className="bg-[#1B1E3D] rounded-xl p-6 shadow-sm">
      <h3 className="text-xl font-semibold text-white mb-8">TrioScore</h3>
      <div className="flex justify-around items-end">
        {strategies.map((strategy, index) => (
          <Strategy key={index} {...strategy} />
        ))}
      </div>
    </div>
  );
}