import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DetailedMetrics, MetricsSection, TrioScore } from '../components/patient';
import { MetricsProvider } from '../context/MetricsContext';
import { BarChart2 } from 'lucide-react';
import { usePatients } from '../context/PatientsContext';

export default function PatientCard() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getPatientById } = usePatients();
  
  const patient = id ? getPatientById(id) : undefined;

  if (!patient) {
    navigate('/dashboard');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-[#00c7be] via-[#00c7be] to-[#00b3ab] h-auto md:h-[220px] -mx-4 md:-mx-6 -mt-6 relative overflow-hidden py-6 md:py-0">
        <div className="absolute inset-0 bg-[url('https://raw.githubusercontent.com/stackblitz/stackblitz-codeflow/main/wave-pattern.png')] bg-cover opacity-10" />
        
        <div className="h-full px-4 md:px-8 flex flex-col justify-center relative z-10">
          <div className="flex items-center text-white/70 text-xs md:text-sm mb-4 md:mb-8">
            <span>Pages</span>
            <span className="mx-2">/</span>
            <span className="text-white">Patient Card</span>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4 md:space-x-8">
              <div className="relative">
                <div className="w-16 h-16 md:w-24 md:h-24 rounded-xl overflow-hidden ring-4 ring-white/20 shadow-lg">
                  <img
                    src={patient.imageUrl}
                    alt={patient.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="absolute bottom-1 right-1 md:bottom-1.5 md:right-1.5 w-3 h-3 md:w-3.5 md:h-3.5 bg-green-500 border-2 border-white rounded-full shadow-md"></span>
              </div>
              <div className="text-white">
                <h1 className="text-xl md:text-3xl font-bold mb-1 md:mb-2">{patient.name}</h1>
                <div className="flex flex-wrap items-center gap-2 md:gap-4 text-sm md:text-base text-white/80">
                  <span>{patient.gender}, {patient.age}</span>
                  <span className="hidden md:inline w-1 h-1 bg-current rounded-full"></span>
                  <span>ID: #{patient.id}</span>
                </div>
              </div>
            </div>
            <div className="flex space-x-2 md:space-x-4 w-full md:w-auto">
              <button className="flex-1 md:flex-none px-4 md:px-6 py-2 md:py-2.5 text-xs md:text-sm font-medium text-white bg-white/10 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 backdrop-blur-sm group">
                <span className="flex items-center justify-center">
                  <BarChart2 className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                  <span className="hidden md:inline">Overview</span>
                </span>
              </button>
              <button className="flex-1 md:flex-none px-4 md:px-6 py-2 md:py-2.5 text-xs md:text-sm font-medium text-[#00c7be] bg-white hover:bg-gray-50 rounded-xl transition-all duration-300 shadow-lg">
                <span className="hidden md:inline">Explanatory Panel</span>
                <span className="md:hidden">Panel</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-8 -mt-6 md:-mt-10 space-y-3 md:space-y-4 pb-6 md:pb-8">
        <MetricsSection />
        <MetricsProvider>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4">
            <div className="col-span-1">
              <DetailedMetrics />
            </div>
            <div className="col-span-1">
              <TrioScore patientId={patient.id} />
            </div>
          </div>
        </MetricsProvider>
      </div>
    </div>
  );
}