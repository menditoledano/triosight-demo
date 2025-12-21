import React from 'react';
import { Search, Bell, Settings, Menu } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { mockUser } from '../api/mocks';

interface TopBarProps {
  onMenuClick: () => void;
}

export default function TopBar({ onMenuClick }: TopBarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const currentPage = pathSegments[0] || 'dashboard';
  
  const currentUser = user || mockUser;

  const handleSettingsClick = () => {
    navigate('/settings');
  };

  const handleNotificationsClick = () => {
    console.log('Notifications clicked');
  };

  const buildBreadcrumbs = () => {
    const breadcrumbs = [];
    
    if (pathSegments.length === 0) {
      return [{ label: 'Dashboard', path: '/dashboard', isActive: true }];
    }

    breadcrumbs.push({ label: 'Pages', path: '/dashboard', isActive: false });

    if (pathSegments[0] === 'dashboard') {
      breadcrumbs.push({ label: 'Dashboard', path: '/dashboard', isActive: true });
    } else if (pathSegments[0] === 'patient') {
      breadcrumbs.push({ label: 'Patient', path: '/dashboard', isActive: false });
      if (pathSegments[1]) {
        breadcrumbs.push({ label: `Patient #${pathSegments[1]}`, path: `/patient/${pathSegments[1]}`, isActive: true });
      }
    } else if (pathSegments[0] === 'statistics') {
      breadcrumbs.push({ label: 'Statistics', path: '/statistics', isActive: true });
    } else if (pathSegments[0] === 'settings') {
      breadcrumbs.push({ label: 'Settings', path: '/settings', isActive: true });
    }

    return breadcrumbs;
  };

  const breadcrumbs = buildBreadcrumbs();

  const handleBreadcrumbClick = (path: string, isActive: boolean) => {
    if (!isActive) {
      navigate(path);
    }
  };

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

            <nav className="flex items-center space-x-2 text-sm" aria-label="Breadcrumb">
              {breadcrumbs.map((crumb, index) => (
                <React.Fragment key={index}>
                  {index > 0 && (
                    <span className="text-gray-400" aria-hidden="true">/</span>
                  )}
                  {crumb.isActive ? (
                    <span className="text-gray-900 font-medium capitalize">
                      {crumb.label}
                    </span>
                  ) : (
                    <button
                      onClick={() => handleBreadcrumbClick(crumb.path, crumb.isActive)}
                      className="text-gray-500 hover:text-[#4FD1C5] transition-colors capitalize"
                    >
                      {crumb.label}
                    </button>
                  )}
                </React.Fragment>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <div className="relative hidden md:block">
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 w-64 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4FD1C5] focus:border-transparent"
              />
            </div>

            <button 
              onClick={handleNotificationsClick}
              className="p-2 hover:bg-gray-100 rounded-full relative"
              title="Notifications"
            >
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#4FD1C5] rounded-full"></span>
            </button>

            <button 
              onClick={handleSettingsClick}
              className="p-2 hover:bg-gray-100 rounded-full"
              title="Settings"
            >
              <Settings className="w-5 h-5 text-gray-600" />
            </button>

            <button className="md:hidden p-2 hover:bg-gray-100 rounded-full">
              <Search className="w-5 h-5 text-gray-600" />
            </button>

            <div className="flex items-center gap-2 md:gap-3 pl-2 border-l border-gray-200">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-sm font-medium">{currentUser.name}</span>
                <span className="text-xs text-gray-500">Senior heart surgeon</span>
              </div>
              <div className="relative">
                <img
                  src={currentUser.imageUrl || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop'}
                  alt="Profile"
                  className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover ring-2 ring-gray-100"
                />
                <span className="absolute bottom-0 right-0 w-2 h-2 md:w-2.5 md:h-2.5 bg-[#4FD1C5] border-2 border-white rounded-full"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}