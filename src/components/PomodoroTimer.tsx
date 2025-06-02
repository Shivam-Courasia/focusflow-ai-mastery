
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Play, Pause, Square, SkipForward, Settings, Volume2, VolumeX } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { UserSettings, SessionData } from '@/types';
import { showNotification, playNotificationSound } from '@/utils/notifications';

interface PomodoroTimerProps {
  onSessionStart: (type: string) => void;
  onSessionEnd: (sessionData: Omit<SessionData, 'id'>) => void;
  isBlocking: boolean;
  settings: UserSettings;
  onSettingsChange: (settings: UserSettings) => void;
}

export const PomodoroTimer: React.FC<PomodoroTimerProps> = ({
  onSessionStart,
  onSessionEnd,
  isBlocking,
  settings,
  onSettingsChange
}) => {
  const [timeLeft, setTimeLeft] = useState(settings.workDuration * 60);
  const [isActive, setIsActive] = useState(false);
  const [currentSession, setCurrentSession] = useState<'work' | 'shortBreak' | 'longBreak'>('work');
  const [completedSessions, setCompletedSessions] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { toast } = useToast();

  // Update timeLeft when settings change and timer is not active
  useEffect(() => {
    if (!isActive) {
      setTimeLeft(getDurationInMinutes() * 60);
    }
  }, [settings, currentSession, isActive]);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleSessionComplete();
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, timeLeft]);

  const handleSessionComplete = () => {
    setIsActive(false);
    
    if (sessionStartTime) {
      const sessionData = {
        type: currentSession,
        startTime: sessionStartTime,
        endTime: new Date(),
        duration: getDurationInMinutes(),
        completed: true,
        interrupted: false
      };
      onSessionEnd(sessionData);
    }

    if (settings.isSoundEnabled) {
      playNotificationSound();
    }

    const sessionTitle = getSessionTitle();
    
    if (currentSession === 'work') {
      setCompletedSessions(prev => prev + 1);
      const isLongBreak = (completedSessions + 1) % settings.longBreakInterval === 0;
      const nextSession = isLongBreak ? 'longBreak' : 'shortBreak';
      setCurrentSession(nextSession);
      setTimeLeft(isLongBreak ? settings.longBreak * 60 : settings.shortBreak * 60);
      
      const message = isLongBreak ? "Time for a long break!" : "Time for a short break!";
      
      toast({
        title: "Work Session Complete! 🎉",
        description: message,
      });

      showNotification("Work Session Complete! 🎉", {
        body: message,
        tag: 'pomodoro-complete'
      });
    } else {
      setCurrentSession('work');
      setTimeLeft(settings.workDuration * 60);
      
      toast({
        title: "Break Time Over! 💪",
        description: "Ready for another focus session?",
      });

      showNotification("Break Time Over! 💪", {
        body: "Ready for another focus session?",
        tag: 'break-complete'
      });
    }
  };

  const getDurationInMinutes = () => {
    switch (currentSession) {
      case 'work': return settings.workDuration;
      case 'shortBreak': return settings.shortBreak;
      case 'longBreak': return settings.longBreak;
      default: return settings.workDuration;
    }
  };

  const startTimer = () => {
    setIsActive(true);
    setSessionStartTime(new Date());
    onSessionStart(currentSession);

    toast({
      title: `${getSessionTitle()} Started! 🚀`,
      description: `Focus for ${getDurationInMinutes()} minutes`,
    });
  };

  const pauseTimer = () => {
    setIsActive(false);
    
    toast({
      title: "Timer Paused ⏸️",
      description: "Take a moment if you need to",
    });
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(getDurationInMinutes() * 60);
    
    if (sessionStartTime) {
      const sessionData = {
        type: currentSession,
        startTime: sessionStartTime,
        endTime: new Date(),
        duration: getDurationInMinutes(),
        completed: false,
        interrupted: true,
        interruptionReason: 'Manual reset'
      };
      onSessionEnd(sessionData);
    }
    
    setSessionStartTime(null);
    
    toast({
      title: "Timer Reset 🔄",
      description: "Ready to start fresh",
    });
  };

  const skipSession = () => {
    if (sessionStartTime) {
      const sessionData = {
        type: currentSession,
        startTime: sessionStartTime,
        endTime: new Date(),
        duration: getDurationInMinutes(),
        completed: false,
        interrupted: true,
        interruptionReason: 'Session skipped'
      };
      onSessionEnd(sessionData);
    }
    
    handleSessionComplete();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getSessionColor = () => {
    switch (currentSession) {
      case 'work': return 'from-red-500 to-orange-500';
      case 'shortBreak': return 'from-green-500 to-emerald-500';
      case 'longBreak': return 'from-blue-500 to-cyan-500';
      default: return 'from-red-500 to-orange-500';
    }
  };

  const getSessionTitle = () => {
    switch (currentSession) {
      case 'work': return 'Focus Session';
      case 'shortBreak': return 'Short Break';
      case 'longBreak': return 'Long Break';
      default: return 'Focus Session';
    }
  };

  const progress = ((getDurationInMinutes() * 60 - timeLeft) / (getDurationInMinutes() * 60)) * 100;

  const handleSettingsUpdate = (field: keyof UserSettings, value: any) => {
    const newSettings = { ...settings, [field]: value };
    onSettingsChange(newSettings);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="text-2xl font-bold text-white">{getSessionTitle()}</span>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSettingsUpdate('isSoundEnabled', !settings.isSoundEnabled)}
                className="text-white hover:bg-white/10"
              >
                {settings.isSoundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSettings(!showSettings)}
                className="text-white hover:bg-white/10"
              >
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Timer Display */}
          <div className="text-center">
            <div className="relative w-64 h-64 mx-auto">
              {/* Progress Circle */}
              <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                <circle
                  cx="128"
                  cy="128"
                  r="120"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-white/20"
                />
                <circle
                  cx="128"
                  cy="128"
                  r="120"
                  stroke="url(#progressGradient)"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${(progress / 100) * 754} 754`}
                  className="transition-all duration-1000"
                />
                <defs>
                  <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#EF4444" />
                    <stop offset="100%" stopColor="#F97316" />
                  </linearGradient>
                </defs>
              </svg>
              
              {/* Timer Text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl font-bold text-white mb-2">
                    {formatTime(timeLeft)}
                  </div>
                  <div className={`text-lg font-medium bg-gradient-to-r ${getSessionColor()} bg-clip-text text-transparent`}>
                    {currentSession === 'work' && isBlocking ? 'Blocking Active' : getSessionTitle()}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center space-x-4">
            {!isActive ? (
              <Button
                onClick={startTimer}
                className={`bg-gradient-to-r ${getSessionColor()} hover:opacity-90 text-white px-8 py-3 text-lg`}
              >
                <Play className="w-5 h-5 mr-2" />
                Start
              </Button>
            ) : (
              <Button
                onClick={pauseTimer}
                variant="outline"
                className="border-orange-500 text-orange-500 hover:bg-orange-500/10 px-8 py-3 text-lg"
              >
                <Pause className="w-5 h-5 mr-2" />
                Pause
              </Button>
            )}
            
            <Button
              onClick={resetTimer}
              variant="outline"
              className="border-red-500 text-red-500 hover:bg-red-500/10 px-6 py-3"
            >
              <Square className="w-5 h-5 mr-2" />
              Reset
            </Button>
            
            <Button
              onClick={skipSession}
              variant="outline"
              className="border-blue-500 text-blue-500 hover:bg-blue-500/10 px-6 py-3"
            >
              <SkipForward className="w-5 h-5 mr-2" />
              Skip
            </Button>
          </div>

          {/* Session Info */}
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-white/5 rounded-lg p-3">
              <div className="text-2xl font-bold text-white">{completedSessions}</div>
              <div className="text-sm text-gray-300">Completed Sessions</div>
            </div>
            <div className="bg-white/5 rounded-lg p-3">
              <div className="text-2xl font-bold text-white">
                {Math.ceil(completedSessions / settings.longBreakInterval)}
              </div>
              <div className="text-sm text-gray-300">Cycles Complete</div>
            </div>
          </div>

          {/* Settings Panel */}
          {showSettings && (
            <div className="bg-white/5 rounded-lg p-4 space-y-4">
              <h3 className="text-lg font-semibold text-white">Timer Settings</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Work Duration (min)</label>
                  <Input
                    type="number"
                    value={settings.workDuration}
                    onChange={(e) => handleSettingsUpdate('workDuration', parseInt(e.target.value) || 25)}
                    className="bg-white/10 border-white/20 text-white"
                    min="1"
                    max="120"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Short Break (min)</label>
                  <Input
                    type="number"
                    value={settings.shortBreak}
                    onChange={(e) => handleSettingsUpdate('shortBreak', parseInt(e.target.value) || 5)}
                    className="bg-white/10 border-white/20 text-white"
                    min="1"
                    max="30"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Long Break (min)</label>
                  <Input
                    type="number"
                    value={settings.longBreak}
                    onChange={(e) => handleSettingsUpdate('longBreak', parseInt(e.target.value) || 15)}
                    className="bg-white/10 border-white/20 text-white"
                    min="1"
                    max="60"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Long Break Interval</label>
                  <Input
                    type="number"
                    value={settings.longBreakInterval}
                    onChange={(e) => handleSettingsUpdate('longBreakInterval', parseInt(e.target.value) || 4)}
                    className="bg-white/10 border-white/20 text-white"
                    min="2"
                    max="10"
                  />
                </div>
              </div>
              <Button
                onClick={() => {
                  setTimeLeft(getDurationInMinutes() * 60);
                  setShowSettings(false);
                  toast({
                    title: "Settings Saved! ✅",
                    description: "Your preferences have been updated",
                  });
                }}
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                Save Settings
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
