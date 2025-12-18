import React from 'react';
import { Search, Bell, Settings, Menu } from 'lucide-react';
import { useLocation } from 'react-router-dom';

interface TopBarProps {
  onMenuClick: () => void;
}

export default function TopBar({ onMenuClick }: TopBarProps) {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const currentPage = pathSegments[0] || 'dashboard';

  return (
    <header className="sticky top-0 z-10 bg-white border-b border-gray-200">
      <div className="px-4 md:px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onMenuClick}
              className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-lg lg:hidden"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span>Pages</span>
              <span>/</span>
              <span className="capitalize">{currentPage.replace('-', ' ')}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <div className="relative hidden md:block">
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 w-64 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00c7be] focus:border-transparent"
              />
            </div>

            <button className="p-2 hover:bg-gray-100 rounded-full relative">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#00c7be] rounded-full"></span>
            </button>

            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Settings className="w-5 h-5 text-gray-600" />
            </button>

            <button className="md:hidden p-2 hover:bg-gray-100 rounded-full">
              <Search className="w-5 h-5 text-gray-600" />
            </button>

            <div className="flex items-center gap-3 pl-2 border-l border-gray-200">
              <div className="flex flex-col items-end">
                <span className="text-sm font-medium">Prof. Erez Kachel</span>
                <span className="text-xs text-gray-500">Senior heart surgeon</span>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop"
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-100"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#00c7be] border-2 border-white rounded-full"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}