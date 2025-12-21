import React from 'react';
import { Search, Bell, Settings, Menu } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { usePatients } from '../context/PatientsContext';

interface TopBarProps {
  onMenuClick: () => void;
}

export default function TopBar({ onMenuClick }: TopBarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { getPatientById } = usePatients();
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const currentPage = pathSegments[0] || 'dashboard';
  
  const getBreadcrumbs = () => {
    const crumbs = [];

    if (currentPage === 'patient' && pathSegments[1]) {
      const patient = getPatientById(pathSegments[1]);
      crumbs.push({ label: 'Dashboard', path: '/dashboard', clickable: true });
      crumbs.push({ label: patient?.name || 'Patient', path: '', clickable: false });
    } else if (currentPage === 'dashboard') {
      crumbs.push({ label: 'Dashboard', path: '/dashboard', clickable: false });
    } else if (currentPage === 'settings') {
      crumbs.push({ label: 'Settings', path: '/settings', clickable: false });
    } else if (currentPage === 'statistics') {
      crumbs.push({ label: 'Statistics', path: '/statistics', clickable: false });
    } else {
      crumbs.push({ label: currentPage.replace('-', ' '), path: '', clickable: false });
    }

    return crumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <header className="sticky top-0 z-10 bg-white border-b border-gray-200">
      <div className="px-3 sm:px-4 md:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-4 min-w-0">
            <button
              onClick={onMenuClick}
              className="p-1.5 sm:p-2 -ml-1 sm:-ml-2 text-gray-600 hover:bg-gray-100 rounded-lg lg:hidden flex-shrink-0"
            >
              <Menu className="w-5 h-5" />
            </button>

            <nav className="flex items-center space-x-1.5 sm:space-x-2 text-xs sm:text-sm min-w-0" aria-label="Breadcrumb">
              {breadcrumbs.map((crumb, index) => (
                <React.Fragment key={index}>
                  {index > 0 && <span className="text-gray-400 flex-shrink-0">/</span>}
                  {crumb.clickable ? (
                    <button
                      onClick={() => navigate(crumb.path)}
                      className="text-gray-500 hover:text-mint-500 transition-colors font-medium flex-shrink-0"
                    >
                      {crumb.label}
                    </button>
                  ) : (
                    <span className="text-gray-700 font-semibold capitalize truncate">
                      {crumb.label}
                    </span>
                  )}
                </React.Fragment>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 md:gap-4 flex-shrink-0">
            <div className="relative hidden md:block">
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 w-64 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-mint-500 focus:border-transparent"
              />
            </div>

            <button className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-full relative flex-shrink-0">
              <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
              <span className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-mint-500 rounded-full"></span>
            </button>

            <button 
              onClick={() => navigate('/settings')}
              className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-full flex-shrink-0"
              title="Settings"
            >
              <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
            </button>

            <button className="md:hidden p-1.5 sm:p-2 hover:bg-gray-100 rounded-full flex-shrink-0">
              <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
            </button>

            <div className="flex items-center gap-2 sm:gap-3 pl-1.5 sm:pl-2 md:pl-3 border-l border-gray-200 flex-shrink-0">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-sm font-medium">Prof. David Brown</span>
                <span className="text-xs text-gray-500">Senior heart surgeon</span>
              </div>
              <button 
                onClick={() => navigate('/settings')}
                className="relative flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-mint-500 rounded-full"
                title="Profile"
              >
                <img
                  src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop"
                  alt="Profile"
                  className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full object-cover ring-2 ring-gray-100 hover:ring-mint-500 transition-all cursor-pointer"
                />
                <span className="absolute bottom-0 right-0 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-mint-500 border-2 border-white rounded-full"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}