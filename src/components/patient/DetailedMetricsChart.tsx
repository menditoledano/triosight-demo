import React from 'react';

const metrics = [
  {
    label: 'Personal Background',
    value: 6.7,
    description: "This score is primarily affected by the patient's medical history, which includes a history of smoking and slightly elevated cholesterol levels."
  },
  {
    label: 'Electrocardiogram (ECG/EKG)',
    value: 5.0,
    description: 'The ECG score reflects minor arrhythmias and a slight irregularity in heart rhythm.'
  },
  {
    label: 'Coagulation Profile (PT, INR, aPTT)',
    value: 2.8,
    description: 'A significantly lower score here is due to elevated INR levels, which indicate a higher risk of bleeding.'
  },
  {
    label: 'Blood Count and Metabolic Panel',
    value: 8.2,
    description: 'This high score is slightly reduced due to mild anemia and slightly elevated glucose levels.'
  },
  {
    label: 'Imaging',
    value: 7.1,
    description: 'The imaging score is affected by observed arterial blockages and mild calcifications.'
  }
];

export default function DetailedMetricsChart() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-6">Detailed Metrics</h3>
      <div className="space-y-6">
        {metrics.map((metric, index) => (
          <div key={index} className="pb-6 border-b border-gray-100 last:border-0">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 w-1/3">{metric.label}</span>
              <div className="flex items-center gap-4 flex-1">
                <div className="flex-1 h-1.5 bg-gray-100 rounded-full">
                  <div
                    className="h-full bg-[#00c7be] rounded-full"
                    style={{ width: `${(metric.value / 10) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-medium w-8">{metric.value}</span>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">{metric.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}