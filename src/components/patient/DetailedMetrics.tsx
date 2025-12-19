import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useMetrics } from '../../context/MetricsContext';

const tooltips = {
  'Personal Background': 'Includes medical history, lifestyle factors, and genetic predispositions that may affect treatment outcomes.',
  'Electrocardiogram (ECG/EKG)': 'Measures heart rhythm, rate, and electrical activity to identify potential cardiac abnormalities.',
  'Coagulation Profile (PT, INR, aPTT)': 'Assesses blood clotting factors and anticoagulation status for surgical risk evaluation.',
  'Blood Count and Metabolic Panel': 'Evaluates blood cell counts, electrolytes, and organ function markers.',
  'Imaging': 'Includes cardiac imaging results, showing structural details and potential complications.'
};

const explanations = {
  'Personal Background': 'The elevated score is driven by a history of smoking, slightly elevated cholesterol levels, and family history of cardiovascular disease, factors that are associated with increased cardiac risk but remain manageable with lifestyle modifications.',
  'Electrocardiogram (ECG/EKG)': 'The elevated score is driven by irregular heart rhythm, abnormal ST–T segment changes, and reduced heart rate variability, patterns that are strongly associated with increased cardiac risk but do not indicate an acute event.',
  'Coagulation Profile (PT, INR, aPTT)': 'The lower score is primarily due to elevated INR levels and prolonged aPTT, which indicate a higher risk of bleeding complications during surgical procedures, requiring careful anticoagulation management.',
  'Blood Count and Metabolic Panel': 'The high score is slightly reduced due to mild anemia, slightly elevated glucose levels, and borderline kidney function markers, which require monitoring but do not pose immediate surgical contraindications.',
  'Imaging': 'The score reflects observed arterial blockages, mild calcifications, and structural changes in cardiac imaging, patterns that indicate moderate cardiovascular disease progression but remain within acceptable surgical risk parameters.'
};

export default function DetailedMetrics() {
  const { metrics, updateMetric } = useMetrics();
  const [hoveredMetric, setHoveredMetric] = useState<string | null>(null);
  const [expandedMetric, setExpandedMetric] = useState<string | null>(null);

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="space-y-6">
        {metrics.map((metric, index) => (
          <div key={index} className="space-y-2">
            <div className="grid grid-cols-[1fr,80px] gap-4 items-center relative">
              <div className="flex items-center gap-2">
                <div
                  className="cursor-help flex-1"
                  onMouseEnter={() => setHoveredMetric(metric.title)}
                  onMouseLeave={() => setHoveredMetric(null)}
                >
                  <span className="text-base text-gray-600">{metric.title}</span>
                  
                  {/* Tooltip */}
                  {hoveredMetric === metric.title && (
                    <div className="absolute left-0 -top-2 transform -translate-y-full w-72 p-3 bg-gray-800 text-white text-sm rounded-lg shadow-xl z-50">
                      {tooltips[metric.title as keyof typeof tooltips]}
                      <div className="absolute bottom-0 left-4 transform translate-y-1/2 rotate-45 w-2 h-2 bg-gray-800"></div>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => setExpandedMetric(expandedMetric === metric.title ? null : metric.title)}
                  className="flex-shrink-0 p-1.5 hover:bg-gray-100 rounded-md transition-all duration-200 active:scale-95"
                  aria-label="Toggle explanation"
                  aria-expanded={expandedMetric === metric.title}
                >
                  <ChevronDown
                    className={`w-4 h-4 text-gray-600 transition-transform duration-300 ease-in-out ${
                      expandedMetric === metric.title ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
              </div>

              <div className="text-right">
                <span className="text-lg font-semibold text-[#00c7be]">
                  {metric.value.toFixed(1)}
                </span>
              </div>
            </div>

            <div className="relative touch-manipulation">
              {/* Initial Value Marker */}
              <div 
                className="absolute top-1/2 -translate-y-1/2 pointer-events-none transition-opacity duration-300"
                style={{
                  left: `${(metric.initialValue / metric.maxValue) * 100}%`,
                  opacity: metric.value === metric.initialValue ? 0 : 0.6,
                  zIndex: 1
                }}
              >
                <div className="relative">
                  <div className="absolute -left-[1px] top-1/2 -translate-y-1/2 w-0.5 h-8 bg-gray-300"></div>
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-100 px-2 py-1 rounded-md shadow-sm">
                    <span className="text-xs font-medium text-gray-500">
                      Initial: {metric.initialValue.toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>

              <input
                type="range"
                min="0"
                max="10"
                step="0.1"
                value={metric.value}
                onChange={(e) => updateMetric(index, parseFloat(e.target.value))}
                className="w-full h-8 py-3 touch-manipulation"
                style={{
                  background: `linear-gradient(to right, #00c7be ${(metric.value / metric.maxValue) * 100}%, #E5E7EB ${(metric.value / metric.maxValue) * 100}%)`
                }}
              />
            </div>

            <div
              className={`grid transition-[grid-template-rows,opacity,margin] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                expandedMetric === metric.title
                  ? 'grid-rows-[1fr] opacity-100 mt-3'
                  : 'grid-rows-[0fr] opacity-0 mt-0'
              }`}
            >
              <div className="overflow-hidden">
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {explanations[metric.title as keyof typeof explanations]}
                  </p>
                </div>
              </div>
            </div>

            {index < metrics.length - 1 && (
              <div className="border-b border-gray-100 pt-2" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}