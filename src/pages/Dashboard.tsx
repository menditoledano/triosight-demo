import React from 'react';
import { Clock, Users, AlertCircle, Activity } from 'lucide-react';
import PatientsList from '../components/PatientsList';

export default function Dashboard() {
  const stats = [
    { icon: Clock, label: "Today's Priority", value: 'John Doe' },
    { icon: Users, label: 'Next in line', value: '51', subtext: 'new patients' },
    { icon: AlertCircle, label: 'Requires vet attention', value: '10+' },
    { icon: Activity, label: 'TrioScore', value: '111111111?' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white p-4 rounded-xl shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-500 text-sm">{stat.label}</span>
                <Icon className="w-5 h-5 text-mint-500" />
              </div>
              <div>
                <p className="text-lg font-semibold">{stat.value}</p>
                {stat.subtext && <p className="text-sm text-gray-500">{stat.subtext}</p>}
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-mint-500 rounded-xl p-6 text-white">
          <h2 className="text-2xl font-bold mb-2">Welcome</h2>
          <h3 className="text-xl mb-4">Prof. Erez Kachel</h3>
          <p className="text-sm opacity-90 mb-4">
            An AI-driven data platform for medical decision support, empowering heart teams to make data-driven, personalized treatment decisions, aiming to optimize recovery while minimizing complications for each patient.
          </p>
          <button className="text-sm hover:underline">
            Read more →
          </button>
        </div>

        <div className="bg-navy-900 rounded-xl p-6 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-4">Work with the Triosight</h2>
            <p className="text-sm opacity-90 mb-4">
              We're here to Empower your Heart Team, Using AI, Performing the most precise surgery, with the least possible risk for the optimal recovery.
            </p>
            <button className="text-sm hover:underline">
              Read more →
            </button>
          </div>
          <img
            src="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=800&q=80"
            alt="Medical Team"
            className="absolute top-0 right-0 w-1/2 h-full object-cover opacity-20"
          />
        </div>
      </div>

      <PatientsList />
    </div>
  );
}