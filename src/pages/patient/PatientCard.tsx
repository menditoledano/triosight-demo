import React from 'react';
import { Activity, Heart, FileText, Clock } from 'lucide-react';

export default function PatientCard() {
  const metrics = [
    { icon: Activity, label: 'Heart Rate', value: '72 bpm' },
    { icon: Heart, label: 'Blood Pressure', value: '120/80' },
    { icon: FileText, label: 'Last Check', value: '2 days ago' },
    { icon: Clock, label: 'Next Visit', value: 'In 5 days' },
  ];

  return (
    <div className="space-y-6">
      {/* Header with Wave Pattern */}
      <div className="relative -mx-6 -mt-6 mb-6">
        <img
          src="https://raw.githubusercontent.com/stackblitz/stackblitz-codeflow/main/wave-pattern.png"
          alt="Background Pattern"
          className="w-full h-32 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#4FD1C5]/90 to-[#4FD1C5]/90">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex items-center space-x-4">
              <img
                src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop"
                alt="John Doe"
                className="w-20 h-20 rounded-full border-4 border-white object-cover"
              />
              <div className="text-white">
                <h1 className="text-2xl font-bold">John Doe</h1>
                <p className="text-mint-50">Patient ID: #28391</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-4 gap-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-500">{metric.label}</span>
                <div className="p-2 bg-[#4FD1C5]/10 rounded-lg">
                  <Icon className="w-5 h-5 text-[#4FD1C5]" />
                </div>
              </div>
              <p className="text-2xl font-semibold">{metric.value}</p>
            </div>
          );
        })}
      </div>

      {/* Patient Details */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Full Name</p>
              <p className="font-medium">John Doe</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Date of Birth</p>
              <p className="font-medium">15 May 1985</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-medium">+1 (555) 000-0000</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">john.doe@example.com</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Medical History</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Blood Type</p>
              <p className="font-medium">A+</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Allergies</p>
              <p className="font-medium">Penicillin</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Current Medications</p>
              <p className="font-medium">Aspirin, Metformin</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}