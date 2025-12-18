import React from 'react';
import { Bell, Moon, Globe, Lock, UserCircle, Mail, Phone } from 'lucide-react';

export default function Settings() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white rounded-xl p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Settings</h2>
        
        <div className="space-y-6">
          {/* Profile Section */}
          <div className="pb-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop"
                    alt="Profile"
                    className="w-20 h-20 rounded-full object-cover ring-4 ring-gray-50"
                  />
                  <span className="absolute bottom-0 right-0 w-4 h-4 bg-mint-500 border-2 border-white rounded-full"></span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">Prof. Erez Kachel</h3>
                  <p className="text-gray-500">erez.kachel@triosight.com</p>
                </div>
              </div>
              <button className="px-4 py-2 bg-mint-50 text-mint-600 rounded-lg hover:bg-mint-100 transition-colors font-medium">
                Change Photo
              </button>
            </div>
          </div>

          {/* Account Settings */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800">Account Settings</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <div className="relative">
                  <UserCircle className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    defaultValue="Prof. Erez Kachel"
                    className="pl-10 w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-mint-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <div className="relative">
                  <Mail className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    defaultValue="erez.kachel@triosight.com"
                    className="pl-10 w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-mint-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <div className="relative">
                  <Phone className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="tel"
                    defaultValue="+1 (555) 000-0000"
                    className="pl-10 w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-mint-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <div className="relative">
                  <Lock className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    defaultValue="••••••••"
                    className="pl-10 w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-mint-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div className="space-y-4 pt-6">
            <h3 className="font-semibold text-gray-800">Preferences</h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white rounded-lg">
                    <Bell className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Notifications</p>
                    <p className="text-sm text-gray-500">Manage your notification preferences</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}