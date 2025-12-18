import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit } from 'lucide-react';

interface Patient {
  id: string;
  name: string;
  email: string;
  age: number;
  gender: string;
  date: string;
  imageUrl: string;
}

export default function PatientsList() {
  const navigate = useNavigate();
  
  const patients: Patient[] = [
    { 
      id: '28391',
      name: 'John Doe', 
      email: 'john.doe@gmail.com', 
      age: 38, 
      gender: 'Male', 
      date: '14/06/21',
      imageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop'
    },
    { 
      id: '28392',
      name: 'Esthera Jackson', 
      email: 'esthera@gmail.com', 
      age: 39, 
      gender: 'Female', 
      date: '14/06/21',
      imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop'
    },
    { 
      id: '28393',
      name: 'Alexa Liras', 
      email: 'alexa@gmail.com', 
      age: 27, 
      gender: 'Female', 
      date: '14/06/21',
      imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop'
    },
    { 
      id: '28394',
      name: 'Freduardo Hill', 
      email: 'freduardo@gmail.com', 
      age: 42, 
      gender: 'Male', 
      date: '14/06/21',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop'
    },
  ];

  const handlePatientClick = (patient: Patient) => {
    // Store patient data in localStorage for persistence
    localStorage.setItem('currentPatient', JSON.stringify(patient));
    navigate('/patient-card');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-4">Heart Team Patients</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500">
                <th className="pb-4">Patient Name</th>
                <th className="pb-4">General Info</th>
                <th className="pb-4">Explore Patient Dashboard</th>
                <th className="pb-4">Created Date</th>
                <th className="pb-4"></th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {patients.map((patient) => (
                <tr key={patient.id} className="border-t border-gray-100">
                  <td className="py-4">
                    <div 
                      className="flex items-center space-x-3 cursor-pointer group"
                      onClick={() => handlePatientClick(patient)}
                    >
                      <img
                        src={patient.imageUrl}
                        alt={patient.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium group-hover:text-[#00c7be] transition-colors">
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
                    <span className="px-3 py-1 bg-navy-900 text-white text-xs rounded-full">
                      TrioScore
                    </span>
                  </td>
                  <td className="py-4 text-gray-500">{patient.date}</td>
                  <td className="py-4">
                    <button className="text-[#00c7be] hover:text-[#00b3ab]">
                      <Edit className="w-4 h-4" />
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