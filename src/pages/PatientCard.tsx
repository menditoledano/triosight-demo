import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DetailedMetrics, MetricsSection, TrioScore } from '../components/patient';
import { MetricsProvider } from '../context/MetricsContext';
import { BarChart2 } from 'lucide-react';

interface Patient {
  id: string;
  name: string;
  email: string;
  age: number;
  gender: string;
  date: string;
  imageUrl: string;
}

export default function PatientCard() {
  const navigate = useNavigate();
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const storedPatient = localStorage.getItem('currentPatient');
    if (storedPatient) {
      setPatient(JSON.parse(storedPatient));
    } else {
      // Redirect to dashboard if no patient data is found
      navigate('/dashboard');
    }
  }, [navigate]);

  if (!patient) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Gradient Header */}
      <div className="bg-gradient-to-br from-[#00c7be] via-[#00c7be] to-[#00b3ab] h-[220px] -mx-6 -mt-6 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 bg-[url('https://raw.githubusercontent.com/stackblitz/stackblitz-codeflow/main/wave-pattern.png')] bg-cover opacity-10" />
        
        <div className="h-full px-8 flex flex-col justify-center relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center text-white/70 text-sm mb-8">
            <span>Pages</span>
            <span className="mx-2">/</span>
            <span className="text-white">Patient Card</span>
          </div>

          {/* Patient Info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className="relative">
                <div className="w-24 h-24 rounded-xl overflow-hidden ring-4 ring-white/20 shadow-lg">
                  <img
                    src={patient.imageUrl}
                    alt={patient.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="absolute bottom-1.5 right-1.5 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full shadow-md"></span>
              </div>
              <div className="text-white">
                <h1 className="text-3xl font-bold mb-2">{patient.name}</h1>
                <div className="flex items-center space-x-4 text-white/80">
                  <span>{patient.gender}, {patient.age}</span>
                  <span className="w-1 h-1 bg-current rounded-full"></span>
                  <span>ID: #{patient.id}</span>
                </div>
              </div>
            </div>
            <div className="flex space-x-4">
              <button className="px-6 py-2.5 text-sm font-medium text-white bg-white/10 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 backdrop-blur-sm group">
                <span className="flex items-center">
                  <BarChart2 className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                  Overview
                </span>
              </button>
              <button className="px-6 py-2.5 text-sm font-medium text-[#00c7be] bg-white hover:bg-gray-50 rounded-xl transition-all duration-300 shadow-lg">
                Explanatory Panel
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-8 -mt-10 space-y-6 pb-8">
        <MetricsSection />
        <MetricsProvider>
          <div className="grid grid-cols-2 gap-6">
            <div className="col-span-1">
              <DetailedMetrics />
            </div>
            <div className="col-span-1">
              <TrioScore />
            </div>
          </div>
        </MetricsProvider>
      </div>
    </div>
  );
}