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
      <div className="space-y-6">
        {/* Teal Banner with Patient Profile */}
        <div 
          className="relative -mx-4 sm:-mx-6 lg:-mx-8 xl:-mx-10 -mt-6 overflow-hidden"
          style={{
            backgroundImage: 'url("/patient-header-wave.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundColor: '#4FD1C5',
            minHeight: '160px'
          }}
        >
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to right, rgba(79, 209, 197, 0.4), rgba(79, 209, 197, 0.5))'
            }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-6 sm:py-8 h-full flex items-center">
              {/* Patient Info */}
              <div className="flex items-center gap-6">
                <div className="relative">
                  <img
                    src={patient.imageUrl}
                    alt={patient.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg object-cover border-3 border-white shadow-2xl ring-2 ring-white/50"
                  />
                </div>
                
              <div>
                <h2 
                  className="text-2xl sm:text-3xl font-bold text-white mb-1" 
                  style={{ textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}
                >
                  {patient.name}
                </h2>
                <p 
                  className="text-base sm:text-lg text-white font-medium" 
                  style={{ textShadow: '0 2px 6px rgba(0,0,0,0.3)' }}
                >
                  {patient.gender}, {patient.age}
                </p>
              </div>
            </div>
          </div>
        </div>
        </div>

        {/* Back Button - Outside Banner */}
        <div className="px-4 sm:px-6 lg:px-8 xl:px-10">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-gray-600 hover:text-mint-500 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Dashboard</span>
          </button>
        </div>

        {/* Rest of Content */}
        <div className="space-y-6 lg:space-y-8 px-4 sm:px-6 lg:px-8 xl:px-10 pb-6">

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-500 font-medium">{metric.label}</span>
                  <div className="p-2 bg-mint-500/10 rounded-lg flex-shrink-0">
                    <Icon className="w-5 h-5 text-mint-500" />
                  </div>
                </div>
                <p className="text-2xl font-semibold text-gray-900">{metric.value}</p>
              </div>
            );
          })}
        </div>

        {/* Detailed Metrics and TrioScore Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DetailedMetrics />
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
      </div>
    </MetricsProvider>
  );
}