import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Activity, FileText, Settings, User, LogOut, X } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { usePatients } from '../context/PatientsContext';

interface SidebarProps {
  onClose?: () => void;
  collapsed?: boolean;
}

export default function Sidebar({ onClose, collapsed }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const { signOut } = useAuth();
  const { patients } = usePatients();

  const firstPatient = patients[0];
  const patientPath = firstPatient ? `/patient/${firstPatient.id}` : '/dashboard';

  const menuItems = [
    { icon: LayoutDashboard, name: 'Dashboard', path: '/dashboard' },
    { icon: Activity, name: 'Patient Card', path: patientPath },
    { icon: FileText, name: 'Statistics', path: '/statistics' },
    { icon: Settings, name: 'Settings', path: '/settings' },
  ];

  const handleLogout = async () => {
    await signOut();
    if (onClose) onClose();
  };

  const handleProfileClick = () => {
    navigate('/settings');
    if (onClose) onClose();
  };

  return (
    <div className="h-full flex flex-col bg-white border-r border-gray-200">
      <div className={`p-6 flex items-center ${collapsed ? 'justify-center' : 'justify-between'}`}>
        {!collapsed && (
          <h1 className="text-[28px] font-bold tracking-tight">
            <span className="text-gray-900">Trio</span>
            <span className="text-mint-500">sight</span>
          </h1>
        )}
        {collapsed && (
          <span className="text-[28px] font-bold text-mint-500">T</span>
        )}
        {!collapsed && (
          <button 
            onClick={onClose}
            className="lg:hidden p-2 rounded-lg text-gray-400 hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
      
      <nav className="flex-1 overflow-y-auto px-4">
        <div className="space-y-6">
          <div>
            {!collapsed && (
              <p className="px-2 text-xs font-semibold text-gray-400 uppercase mb-4">Main Menu</p>
            )}
            <ul className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPath === item.path;
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      onClick={onClose}
                      className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
                        isActive
                          ? 'text-mint-500 bg-mint-500/10'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                      title={collapsed ? item.name : undefined}
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      {!collapsed && <span className="ml-3 truncate">{item.name}</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          
          <div>
            {!collapsed && (
              <p className="px-2 text-xs font-semibold text-gray-400 uppercase mb-4">Account Pages</p>
            )}
            <ul className="space-y-1">
              <li>
                <button 
                  onClick={handleProfileClick}
                  className="w-full flex items-center px-3 py-2 text-gray-600 rounded-lg hover:bg-gray-50"
                  title={collapsed ? 'Profile' : undefined}
                >
                  <User className="w-5 h-5 flex-shrink-0" />
                  {!collapsed && <span className="ml-3 truncate">Profile</span>}
                </button>
              </li>
              <li>
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center px-3 py-2 text-gray-600 rounded-lg hover:bg-gray-50"
                  title={collapsed ? 'Logout' : undefined}
                >
                  <LogOut className="w-5 h-5 flex-shrink-0" />
                  {!collapsed && <span className="ml-3 truncate">Logout</span>}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}