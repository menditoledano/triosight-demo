import { useParams, useNavigate } from 'react-router-dom';
import { Activity, Heart, FileText, Clock, Search, Settings, Bell, ArrowLeft } from 'lucide-react';
import { usePatients } from '../../context/PatientsContext';
import { LoadingPage, ErrorMessage } from '../../components/common';
import { MetricsProvider } from '../../context/MetricsContext';
import TrioScore from '../../components/patient/TrioScore';
import DetailedMetrics from '../../components/patient/DetailedMetrics';
import { useAuth } from '../../context/AuthContext';
import { mockUser } from '../../api/mocks';

export default function PatientCard() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getPatientById, isLoading } = usePatients();
  const { user } = useAuth();
  const currentUser = user || mockUser;

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
      <div className="min-h-screen bg-gray-50">
        {/* Teal Banner with Breadcrumbs, Search and Icons */}
        <div 
          className="relative -mx-4 sm:-mx-6 lg:-mx-8 xl:-mx-10 rounded-t-xl overflow-hidden"
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
              background: 'linear-gradient(to right, rgba(79, 209, 197, 0.75), rgba(79, 209, 197, 0.75))'
            }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-4 sm:py-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
                {/* Left: Breadcrumbs */}
                <div className="flex items-center space-x-1.5 sm:space-x-2 text-white text-xs sm:text-sm flex-shrink-0">
                  <button 
                    onClick={() => navigate('/dashboard')}
                    className="text-white/90 hover:text-white transition-colors font-medium whitespace-nowrap"
                  >
                    Pages
                  </button>
                  <span className="text-white/70">/</span>
                  <button 
                    onClick={() => navigate('/dashboard')}
                    className="text-white/90 hover:text-white transition-colors font-medium whitespace-nowrap"
                  >
                    Patient Card
                  </button>
                  <span className="text-white/70">/</span>
                  <span className="text-white font-medium whitespace-nowrap">Profile</span>
                </div>

                {/* Right: Search Bar and Icons */}
                <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-end">
                  <div className="relative hidden md:block">
                    <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Type here..."
                      className="pl-10 pr-4 py-2 w-64 rounded-lg border-0 bg-white focus:outline-none focus:ring-2 focus:ring-white/50"
                    />
                  </div>
                  
                  <button 
                    onClick={() => navigate('/settings')}
                    className="p-1.5 sm:p-2 hover:bg-white/20 rounded-lg transition-colors flex-shrink-0"
                    title="Settings"
                  >
                    <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </button>

                  <div className="relative flex-shrink-0">
                    <img
                      src={currentUser.imageUrl || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop'}
                      alt="Profile"
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover ring-2 ring-white"
                    />
                  </div>

                  <button 
                    className="p-1.5 sm:p-2 hover:bg-white/20 rounded-lg transition-colors relative flex-shrink-0"
                    title="Notifications"
                  >
                    <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* White Patient Profile Card - Overlapping Banner (half over header) */}
        <div className="relative -mx-4 sm:-mx-6 lg:-mx-8 xl:-mx-10 px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="relative -mt-16 mb-6 z-10 mx-4 sm:mx-6 lg:mx-8 xl:mx-10">
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                {/* Left Side: Profile Picture and Info */}
                <div className="flex items-center gap-6 flex-1">
                  <div className="relative">
                    <img
                      src={patient.imageUrl}
                      alt={patient.name}
                      className="w-24 h-24 rounded-lg object-cover border border-gray-200"
                    />
                  </div>
                  
                  {/* Patient Name and Demographics */}
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">{patient.name}</h2>
                    <p className="text-base text-gray-600">{patient.gender}, {patient.age}</p>
                  </div>
                </div>

                {/* Right Side: Empty for now, can add buttons later */}
                <div className="flex-1"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Back Button - Positioned after the card */}
        <div className="px-4 sm:px-6 lg:px-8 xl:px-10 mb-6">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-gray-600 hover:text-mint-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Dashboard</span>
          </button>
        </div>

        {/* Rest of Content */}
        <div className="px-4 sm:px-6 lg:px-8 xl:px-10 space-y-6 lg:space-y-8 pb-6 lg:pb-8 pt-0">

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
      </div>
    </MetricsProvider>
  );
}