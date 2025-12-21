import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Menu, ChevronLeft, ChevronRight } from 'lucide-react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();

  // Auto-collapse sidebar on patient card page
  useEffect(() => {
    if (location.pathname === '/patient-card') {
      setSidebarCollapsed(true);
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-800/50 lg:hidden z-20"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`
          fixed top-0 bottom-0 left-0 z-30 bg-white transform transition-all duration-300 ease-in-out lg:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          ${sidebarCollapsed ? 'w-20' : 'w-64'}
        `}
      >
        <Sidebar 
          collapsed={sidebarCollapsed} 
          onClose={() => setSidebarOpen(false)} 
        />
        
        {/* Collapse Toggle Button */}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="hidden lg:flex absolute -right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-md items-center justify-center text-gray-500 hover:text-[#00c7be] transition-colors"
        >
          {sidebarCollapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <ChevronLeft className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Main content */}
      <div 
        className={`
          flex flex-col min-h-screen transition-all duration-300
          ${sidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'}
        `}
      >
        <TopBar onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-x-hidden">
          <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}