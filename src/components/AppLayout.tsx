
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Timer, Shield, BarChart3, Clock, Settings, Home } from 'lucide-react';

interface AppLayoutProps {
  children: React.ReactNode;
  currentView: string;
  onViewChange: (view: string) => void;
}

export const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  currentView,
  onViewChange
}) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const navigationItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'timer', label: 'Timer', icon: Timer },
    { id: 'blocker', label: 'Blocker', icon: Shield },
    { id: 'sessions', label: 'Sessions', icon: Clock },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex">
      {/* Sidebar */}
      <div className={`${sidebarCollapsed ? 'w-16' : 'w-64'} transition-all duration-300 bg-black/20 backdrop-blur-xl border-r border-white/10`}>
        <div className="p-4">
          {/* Logo */}
          <div className="flex items-center space-x-3 mb-8">
            {!sidebarCollapsed && (
              <>
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Timer className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    FocusFlow
                  </span>
                  <div className="text-xs text-purple-300">AI-Powered</div>
                </div>
              </>
            )}
            {sidebarCollapsed && (
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto">
                <Timer className="w-6 h-6" />
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {navigationItems.map((item) => {
              const isActive = currentView === item.id;
              return (
                <Button
                  key={item.id}
                  variant="ghost"
                  onClick={() => onViewChange(item.id)}
                  className={`w-full justify-start ${
                    isActive
                      ? 'bg-purple-500/20 text-purple-300 border-r-2 border-purple-500'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  } ${sidebarCollapsed ? 'px-3' : 'px-4'}`}
                >
                  <item.icon className={`${sidebarCollapsed ? 'w-5 h-5' : 'w-5 h-5 mr-3'}`} />
                  {!sidebarCollapsed && item.label}
                </Button>
              );
            })}
          </nav>
        </div>

        {/* Collapse Toggle */}
        <div className="absolute bottom-4 left-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="text-gray-400 hover:text-white"
          >
            {sidebarCollapsed ? '→' : '←'}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto p-6">
          {children}
        </div>
      </div>

      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 left-1/3 w-72 h-72 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>
    </div>
  );
};
