
import React, { useState, useEffect } from 'react';
import { AppLayout } from '@/components/AppLayout';
import { PomodoroTimer } from '@/components/PomodoroTimer';
import { DistractionBlocker } from '@/components/DistractionBlocker';
import { SessionLogger } from '@/components/SessionLogger';
import { AnalyticsDashboard } from '@/components/AnalyticsDashboard';
import FocusFlowLanding from '@/components/FocusFlowLanding';
import { SessionData, BlockedSite, UserSettings } from '@/types';
import { storageService } from '@/utils/storage';
import { requestNotificationPermission } from '@/utils/notifications';

const Index = () => {
  const [currentView, setCurrentView] = useState('landing');
  const [sessions, setSessions] = useState<SessionData[]>([]);
  const [blockedSites, setBlockedSites] = useState<BlockedSite[]>([]);
  const [settings, setSettings] = useState<UserSettings>({
    workDuration: 25,
    shortBreak: 5,
    longBreak: 15,
    longBreakInterval: 4,
    isSoundEnabled: true,
  });
  const [isBlocking, setIsBlocking] = useState(false);

  // Load data on component mount
  useEffect(() => {
    const loadedSessions = storageService.getSessions();
    const loadedSites = storageService.getBlockedSites();
    const loadedSettings = storageService.getSettings();

    setSessions(loadedSessions);
    setBlockedSites(loadedSites);
    setSettings(loadedSettings);

    // Request notification permission
    requestNotificationPermission();
  }, []);

  // Save data when it changes
  useEffect(() => {
    if (sessions.length > 0) {
      storageService.saveSessions(sessions);
    }
  }, [sessions]);

  useEffect(() => {
    if (blockedSites.length > 0) {
      storageService.saveBlockedSites(blockedSites);
    }
  }, [blockedSites]);

  useEffect(() => {
    storageService.saveSettings(settings);
  }, [settings]);

  const handleSessionStart = (type: string) => {
    console.log('Session started:', type);
    if (type === 'work') {
      setIsBlocking(true);
    }
  };

  const handleSessionEnd = (sessionData: Omit<SessionData, 'id'>) => {
    const newSession: SessionData = {
      ...sessionData,
      id: Date.now().toString()
    };

    setSessions(prev => [...prev, newSession]);

    // Stop blocking when work session ends
    if (sessionData.type === 'work') {
      setIsBlocking(false);
    }

    console.log('Session ended:', newSession);
  };

  const handleClearSessions = () => {
    setSessions([]);
    storageService.saveSessions([]);
  };

  const handleBlockedSitesChange = (sites: BlockedSite[]) => {
    setBlockedSites(sites);
  };

  const handleSettingsChange = (newSettings: UserSettings) => {
    setSettings(newSettings);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'timer':
        return (
          <PomodoroTimer
            onSessionStart={handleSessionStart}
            onSessionEnd={handleSessionEnd}
            isBlocking={isBlocking}
            settings={settings}
            onSettingsChange={handleSettingsChange}
          />
        );
      case 'blocker':
        return (
          <DistractionBlocker
            isBlocking={isBlocking}
            onBlockingChange={setIsBlocking}
            blockedSites={blockedSites}
            onBlockedSitesChange={handleBlockedSitesChange}
          />
        );
      case 'sessions':
        return (
          <SessionLogger
            sessions={sessions}
            onClearSessions={handleClearSessions}
          />
        );
      case 'analytics':
        return <AnalyticsDashboard sessions={sessions} />;
      case 'settings':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-white mb-4">Settings</h2>
            <p className="text-gray-300">Settings panel coming soon...</p>
          </div>
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

export default Index;
