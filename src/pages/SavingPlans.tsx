import React from 'react';
import { PiggyBank, TrendingUp, DollarSign, CreditCard } from 'lucide-react';

export default function SavingPlans() {
  const stats = [
    {
      title: 'Total Savings',
      value: '$12,426',
      change: '+8.2%',
      icon: PiggyBank,
    },
    {
      title: 'Monthly Growth',
      value: '$2,128',
      change: '+14.2%',
      icon: TrendingUp,
    },
    {
      title: 'Annual Projection',
      value: '$148,000',
      change: '+23.8%',
      icon: DollarSign,
    },
    {
      title: 'Active Plans',
      value: '842',
      change: '+12.5%',
      icon: CreditCard,
    },
  ];

  const plans = [
    {
      title: 'Basic Plan',
      price: '$199',
      period: 'per month',
      features: [
        'Basic health monitoring',
        'Emergency support',
        'Online consultations',
        'Monthly check-ups',
      ],
    },
    {
      title: 'Pro Plan',
      price: '$399',
      period: 'per month',
      features: [
        'Advanced health monitoring',
        '24/7 Emergency support',
        'Unlimited consultations',
        'Weekly check-ups',
        'Specialist referrals',
      ],
      recommended: true,
    },
    {
      title: 'Enterprise',
      price: 'Custom',
      period: 'custom plan',
      features: [
        'Full health monitoring suite',
        'Dedicated support team',
        'Custom solutions',
        'Daily check-ups',
        'Priority access',
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-xl">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-500">{stat.title}</span>
                <div className="p-2 bg-mint-50 rounded-lg">
                  <Icon className="w-5 h-5 text-mint-500" />
                </div>
              </div>
              <p className="text-2xl font-semibold mb-1">{stat.value}</p>
              <p className="text-sm text-mint-500">{stat.change} from last month</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-3 gap-6">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`bg-white rounded-xl p-6 ${
              plan.recommended ? 'ring-2 ring-mint-500' : ''
            }`}
          >
            {plan.recommended && (
              <span className="inline-block px-3 py-1 bg-mint-50 text-mint-500 text-sm rounded-full mb-4">
                Recommended
              </span>
            )}
            <h3 className="text-xl font-semibold mb-2">{plan.title}</h3>
            <div className="mb-6">
              <span className="text-3xl font-bold">{plan.price}</span>
              <span className="text-gray-500 ml-2">{plan.period}</span>
            </div>
            <ul className="space-y-4">
              {plan.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-center text-gray-600">
                  <div className="w-2 h-2 bg-mint-500 rounded-full mr-3"></div>
                  {feature}
                </li>
              ))}
            </ul>
            <button
              className={`w-full mt-6 py-2 rounded-lg transition-colors ${
                plan.recommended
                  ? 'bg-mint-500 text-white hover:bg-mint-600'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              Get Started
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}