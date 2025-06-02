
import React, { useState } from 'react';
import { AuthProvider, useAuth } from '@/hooks/useAuth';
import { AuthPage } from '@/components/AuthPage';
import { AppLayout } from '@/components/AppLayout';
import { PomodoroTimer } from '@/components/PomodoroTimer';
import { DistractionBlocker } from '@/components/DistractionBlocker';
import { SessionLogger } from '@/components/SessionLogger';
import { AnalyticsDashboard } from '@/components/AnalyticsDashboard';
import { Settings } from '@/components/Settings';
import FocusFlowLanding from '@/components/FocusFlowLanding';
import { useSupabaseData } from '@/hooks/useSupabaseData';
import { requestNotificationPermission } from '@/utils/notifications';
import { useEffect } from 'react';

const AppContent = () => {
  const { user, loading } = useAuth();
  const [currentView, setCurrentView] = useState('landing');
  const [isBlocking, setIsBlocking] = useState(false);
  
  const {
    sessions,
    blockedSites,
    settings,
    loading: dataLoading,
    saveSession,
    saveBlockedSite,
    removeBlockedSite,
    updateSettings,
    clearSessions
  } = useSupabaseData();

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  // Show loading spinner while checking auth
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  // Show auth page if not logged in
  if (!user) {
    return <AuthPage />;
  }

  const handleSessionStart = (type: string) => {
    console.log('Session started:', type);
    if (type === 'work') {
      setIsBlocking(true);
    }
  };

  const handleSessionEnd = (sessionData: Omit<import('@/types').SessionData, 'id'>) => {
    saveSession(sessionData);
    
    // Stop blocking when work session ends
    if (sessionData.type === 'work') {
      setIsBlocking(false);
    }

    console.log('Session ended:', sessionData);
  };

  const handleBlockedSitesChange = (sites: import('@/types').BlockedSite[]) => {
    // This function is called by DistractionBlocker when sites are added/removed
    // The actual saving is handled by individual add/remove functions
  };

  const renderCurrentView = () => {
    if (dataLoading) {
      return (
        <div className="text-center py-12">
          <div className="text-white">Loading your data...</div>
        </div>
      );
    }

    switch (currentView) {
      case 'timer':
        return (
          <PomodoroTimer
            onSessionStart={handleSessionStart}
            onSessionEnd={handleSessionEnd}
            isBlocking={isBlocking}
            settings={settings}
            onSettingsChange={updateSettings}
          />
        );
      case 'blocker':
        return (
          <DistractionBlocker
            isBlocking={isBlocking}
            onBlockingChange={setIsBlocking}
            blockedSites={blockedSites}
            onBlockedSitesChange={handleBlockedSitesChange}
            onAddSite={saveBlockedSite}
            onRemoveSite={removeBlockedSite}
          />
        );
      case 'sessions':
        return (
          <SessionLogger
            sessions={sessions}
            onClearSessions={clearSessions}
          />
        );
      case 'analytics':
        return <AnalyticsDashboard sessions={sessions} />;
      case 'settings':
        return (
          <Settings
            onSave={updateSettings}
          />
        );
      case 'landing':
      default:
        return <FocusFlowLanding />;
    }
  };

  // If on landing page, show full landing without layout
  if (currentView === 'landing') {
    return (
      <div>
        <FocusFlowLanding />
        {/* CTA to enter app */}
        <div className="fixed bottom-8 right-8 z-50">
          <button
            onClick={() => setCurrentView('timer')}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-2xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 font-bold text-lg"
          >
            Launch FocusFlow App →
          </button>
        </div>
      </div>
    );
  }

  return (
    <AppLayout currentView={currentView} onViewChange={setCurrentView}>
      {renderCurrentView()}
    </AppLayout>
  );
};

const Index = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default Index;
