import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { usePatients } from '../context/PatientsContext';

export default function PatientsList() {
  const navigate = useNavigate();
  const { patients } = usePatients();

  const handlePatientClick = (patientId: string) => {
    navigate(`/patient/${patientId}`);
  };

  const handleEditClick = (patientId: string) => {
    navigate(`/patient/${patientId}`);
  };

  const sortedPatients = [...patients].sort((a, b) => {
    if (a.trioScore === null && b.trioScore === null) return 0;
    if (a.trioScore === null) return 1;
    if (b.trioScore === null) return -1;
    return b.trioScore - a.trioScore;
  });

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-4 md:p-6">
        <h3 className="text-lg font-semibold mb-4">Heart Team Patients</h3>
        
        {/* Mobile Card View */}
        <div className="block lg:hidden space-y-4">
          {sortedPatients.map((patient) => (
            <div
              key={patient.id}
              className={`p-4 rounded-lg border-2 transition-colors cursor-pointer ${
                patient.selectedStrategy
                  ? 'bg-mint-50 border-mint-200 hover:bg-mint-100'
                  : 'bg-white border-gray-200 hover:bg-gray-50'
              }`}
              onClick={() => handlePatientClick(patient.id)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <img
                    src={patient.imageUrl}
                    alt={patient.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">{patient.name}</p>
                    <p className="text-sm text-gray-500">{patient.email}</p>
                  </div>
                </div>
                <button
                  className={`transition-colors ${
                    patient.selectedStrategy
                      ? 'text-mint-500'
                      : 'text-gray-400'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditClick(patient.id);
                  }}
                >
                  <CheckCircle className="w-6 h-6" />
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-gray-500">Age:</span>
                  <span className="ml-2 font-medium">{patient.age}</span>
                </div>
                <div>
                  <span className="text-gray-500">Gender:</span>
                  <span className="ml-2 font-medium">{patient.gender}</span>
                </div>
                <div>
                  <span className="text-gray-500">Strategy:</span>
                  {patient.selectedStrategy ? (
                    <span className="ml-2 px-2 py-0.5 bg-mint-500 text-white text-xs rounded-full font-medium">
                      {patient.selectedStrategy}
                    </span>
                  ) : (
                    <span className="ml-2 text-gray-400 text-xs">Not Selected</span>
                  )}
                </div>
                <div>
                  <span className="text-gray-500">TrioScore:</span>
                  {patient.trioScore !== null ? (
                    <span className="ml-2 text-xl font-bold text-navy-900">
                      {patient.trioScore.toFixed(1)}
                    </span>
                  ) : (
                    <span className="ml-2 text-gray-400 text-xs">Pending</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500">
                <th className="pb-4">Patient Name</th>
                <th className="pb-4">General Info</th>
                <th className="pb-4">Strategy</th>
                <th className="pb-4">TrioScore</th>
                <th className="pb-4">Created Date</th>
                <th className="pb-4">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {sortedPatients.map((patient) => (
                <tr 
                  key={patient.id} 
                  onClick={() => handlePatientClick(patient.id)}
                  className={`border-t border-gray-100 transition-colors cursor-pointer ${
                    patient.selectedStrategy 
                      ? 'bg-mint-50 hover:bg-mint-100' 
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <td className="py-4">
                    <div 
                      className="flex items-center space-x-3 group"
                    >
                      <img
                        src={patient.imageUrl}
                        alt={patient.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium group-hover:text-mint-500 transition-colors">
                          {patient.name}
                        </p>
                        <p className="text-gray-500">{patient.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <p>{patient.age}</p>
                    <p className="text-gray-500">{patient.gender}</p>
                  </td>
                  <td className="py-4">
                    {patient.selectedStrategy ? (
                      <span className="px-3 py-1 bg-mint-500 text-white text-xs rounded-full font-medium">
                        Strategy {patient.selectedStrategy}
                      </span>
                    ) : (
                      <span className="text-gray-400 text-xs">Not Selected</span>
                    )}
                  </td>
                  <td className="py-4">
                    {patient.trioScore !== null ? (
                      <span className="text-2xl font-bold text-navy-900">
                        {patient.trioScore.toFixed(1)}
                      </span>
                    ) : (
                      <span className="text-gray-400 text-xs">Pending</span>
                    )}
                  </td>
                  <td className="py-4 text-gray-500">{patient.date}</td>
                  <td className="py-4">
                    <button 
                      className={`transition-colors ${
                        patient.selectedStrategy
                          ? 'text-mint-500 hover:text-mint-600'
                          : 'text-gray-400 hover:text-gray-600'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditClick(patient.id);
                      }}
                    >
                      <CheckCircle className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}