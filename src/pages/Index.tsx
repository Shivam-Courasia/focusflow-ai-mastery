
import React, { useState, useEffect } from 'react';
import { AppLayout } from '@/components/AppLayout';
import { PomodoroTimer } from '@/components/PomodoroTimer';
import { DistractionBlocker } from '@/components/DistractionBlocker';
import { SessionLogger } from '@/components/SessionLogger';
import { AnalyticsDashboard } from '@/components/AnalyticsDashboard';
import FocusFlowLanding from '@/components/FocusFlowLanding';

interface SessionData {
  id: string;
  type: 'work' | 'shortBreak' | 'longBreak';
  startTime: Date;
  endTime: Date;
  duration: number;
  completed: boolean;
  interrupted: boolean;
  interruptionReason?: string;
}

const Index = () => {
  const [currentView, setCurrentView] = useState('landing');
  const [sessions, setSessions] = useState<SessionData[]>([]);
  const [isBlocking, setIsBlocking] = useState(false);

  // Load sessions from localStorage on component mount
  useEffect(() => {
    const savedSessions = localStorage.getItem('focusflow-sessions');
    if (savedSessions) {
      try {
        const parsedSessions = JSON.parse(savedSessions).map((session: any) => ({
          ...session,
          startTime: new Date(session.startTime),
          endTime: new Date(session.endTime)
        }));
        setSessions(parsedSessions);
      } catch (error) {
        console.error('Error loading sessions:', error);
      }
    }
  }, []);

  // Save sessions to localStorage whenever sessions change
  useEffect(() => {
    localStorage.setItem('focusflow-sessions', JSON.stringify(sessions));
  }, [sessions]);

  const handleSessionStart = (type: string) => {
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
  };

  const handleClearSessions = () => {
    setSessions([]);
    localStorage.removeItem('focusflow-sessions');
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'timer':
        return (
          <PomodoroTimer
            onSessionStart={handleSessionStart}
            onSessionEnd={handleSessionEnd}
            isBlocking={isBlocking}
          />
        );
      case 'blocker':
        return (
          <DistractionBlocker
            isBlocking={isBlocking}
            onBlockingChange={setIsBlocking}
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
