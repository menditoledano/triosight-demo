import React from 'react';
import { wavePattern } from '@/assets';
import type { PatientHeaderProps } from '@/types';

export default function PatientHeader({ name, id, imageUrl }: PatientHeaderProps) {
  return (
    <div className="relative -mx-6 -mt-6 mb-6">
      <img
        src={wavePattern}
        className="w-full h-32 object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-mint-500/90 to-mint-600/90">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center space-x-4">
            <img
              src={imageUrl}
              alt={name}
              className="w-20 h-20 rounded-full border-4 border-white object-cover"
            />
            <div className="text-white">
              <h1 className="text-2xl font-bold">{name}</h1>
              <p className="text-mint-50">Patient ID: #{id}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}