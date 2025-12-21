import { useParams, useNavigate } from 'react-router-dom';
import { Activity, Heart, FileText, Clock, ArrowLeft } from 'lucide-react';
import { usePatients } from '../../context/PatientsContext';
import { LoadingPage, ErrorMessage } from '../../components/common';
import { MetricsProvider } from '../../context/MetricsContext';
import TrioScore from '../../components/patient/TrioScore';
import DetailedMetrics from '../../components/patient/DetailedMetrics';

export default function PatientCard() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getPatientById, isLoading } = usePatients();

  const patient = id ? getPatientById(id) : undefined;

  const metrics = [
    { icon: Activity, label: 'Heart Rate', value: '72 bpm' },
    { icon: Heart, label: 'Blood Pressure', value: '120/80' },
    { icon: FileText, label: 'Last Check', value: '2 days ago' },
    { icon: Clock, label: 'Next Visit', value: 'In 5 days' },
  ];

  if (isLoading) {
    return <LoadingPage />;
  }

  if (!patient) {
    return (
      <ErrorMessage 
        title="Patient not found" 
        message="The patient you're looking for doesn't exist or has been removed."
      />
    );
  }

  return (
    <MetricsProvider>
      <div className="py-6 lg:py-8 space-y-6 lg:space-y-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-gray-600 hover:text-mint-600 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Dashboard</span>
        </button>

        {/* Header with Wave Pattern */}
        <div className="relative -mx-4 sm:-mx-6 lg:-mx-8 xl:-mx-10 -mt-6 lg:-mt-8 mb-6 lg:mb-8 bg-gradient-to-r from-[#00c7be] to-[#00b3ab] rounded-xl overflow-hidden">
          <img
            src="https://raw.githubusercontent.com/stackblitz/stackblitz-codeflow/main/wave-pattern.png"
            alt="Background Pattern"
            className="w-full h-40 object-cover opacity-20"
          />
          <div className="absolute inset-0">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-6 lg:py-8 h-full flex items-center">
              <div className="flex items-center space-x-5">
                <img
                  src={patient.imageUrl}
                  alt={patient.name}
                  className="w-24 h-24 rounded-full border-4 border-white object-cover shadow-lg flex-shrink-0"
                />
                <div className="text-white">
                  <h1 className="text-2xl font-bold mb-1">{patient.name}</h1>
                  <p className="text-base text-white/90 mb-0.5">{patient.gender}, {patient.age}</p>
                  <p className="text-sm text-white/80">ID: #{patient.id}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-500 font-medium">{metric.label}</span>
                <div className="p-2 bg-[#4FD1C5]/10 rounded-lg flex-shrink-0">
                  <Icon className="w-5 h-5 text-[#4FD1C5]" />
                </div>
              </div>
              <p className="text-2xl font-semibold text-gray-900">{metric.value}</p>
            </div>
          );
        })}
      </div>

      {/* Detailed Metrics and TrioScore Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Detailed Metrics - Left Side */}
        <DetailedMetrics />

        {/* TrioScore Section - Right Side */}
        <TrioScore patientId={id} />
      </div>

      {/* Patient Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Full Name</p>
              <p className="font-medium">{patient.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Date</p>
              <p className="font-medium">{patient.date}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Age</p>
              <p className="font-medium">{patient.age}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{patient.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Gender</p>
              <p className="font-medium">{patient.gender}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Treatment Information</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Selected Strategy</p>
              {patient.selectedStrategy ? (
                <span className="inline-block px-3 py-1 bg-mint-500 text-white text-sm rounded-full font-medium">
                  Strategy {patient.selectedStrategy}
                </span>
              ) : (
                <p className="font-medium text-gray-400">Not Selected</p>
              )}
            </div>
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${patient.selectedStrategy ? 'bg-mint-500' : 'bg-gray-400'}`}></div>
                <p className="font-medium">
                  {patient.selectedStrategy ? 'Strategy Selected' : 'Awaiting Strategy'}
                </p>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500">Current TrioScore</p>
              {patient.trioScore !== null ? (
                <p className="font-bold text-3xl text-navy-900">{patient.trioScore.toFixed(1)}</p>
              ) : (
                <p className="font-medium text-gray-400">Calculate score by selecting a strategy above</p>
              )}
            </div>
          </div>
        </div>
      </div>
      </div>
    </MetricsProvider>
  );
}