import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';

import { UserSettings } from '@/types';

interface SettingsProps {
  onSave: (settings: UserSettings) => void;
}

export const Settings: React.FC<SettingsProps> = ({ onSave }) => {
  const [activeTab, setActiveTab] = useState('pomodoro');
  const [settings, setSettings] = useState<UserSettings>({
    workDuration: 25,
    shortBreak: 5,
    longBreak: 15,
    pomodorosBeforeLongBreak: 4,
    autoStartBreaks: false,
    autoStartPomodoros: false,
    desktopNotifications: true,
    soundAlerts: true,
    alertVolume: 50,
    createdAt: new Date(),
    updatedAt: new Date()
  });

  const handleSave = () => {
    onSave(settings);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-6">
      <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-8">Settings</h1>
      
      {/* Tab Navigation */}
      <div className="flex space-x-4 mb-6 bg-black/20 backdrop-blur-xl p-2 rounded-lg">
        <button
          onClick={() => setActiveTab('pomodoro')}
          className={`px-4 py-2 rounded-md transition-colors ${activeTab === 'pomodoro' ? 'bg-purple-500/20 text-purple-300' : 'text-gray-400 hover:text-white'}`}
        >
          🕒 Pomodoro
        </button>
        <button
          onClick={() => setActiveTab('notifications')}
          className={`px-4 py-2 rounded-md transition-colors ${activeTab === 'notifications' ? 'bg-purple-500/20 text-purple-300' : 'text-gray-400 hover:text-white'}`}
        >
          🔔 Notifications
        </button>
      </div>

      <div className="bg-black/20 backdrop-blur-xl rounded-xl p-6 space-y-6">
        {activeTab === 'pomodoro' ? (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-purple-300">Pomodoro Timer Settings</h2>
            <p className="text-gray-400">Customize your work and break intervals.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm text-gray-300">Work Duration (minutes)</label>
                <input
                  type="number"
                  value={settings.workDuration}
                  onChange={(e) => setSettings({ ...settings, workDuration: parseInt(e.target.value) })}
                  className="w-full bg-black/30 border border-purple-500/20 rounded-md px-3 py-2 text-white"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm text-gray-300">Short Break (minutes)</label>
                <input
                  type="number"
                  value={settings.shortBreak}
                  onChange={(e) => setSettings({ ...settings, shortBreak: parseInt(e.target.value) })}
                  className="w-full bg-black/30 border border-purple-500/20 rounded-md px-3 py-2 text-white"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm text-gray-300">Long Break (minutes)</label>
                <input
                  type="number"
                  value={settings.longBreak}
                  onChange={(e) => setSettings({ ...settings, longBreak: parseInt(e.target.value) })}
                  className="w-full bg-black/30 border border-purple-500/20 rounded-md px-3 py-2 text-white"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm text-gray-300">Pomodoros before Long Break</label>
                <input
                  type="number"
                  value={settings.pomodorosBeforeLongBreak}
                  onChange={(e) => setSettings({ ...settings, pomodorosBeforeLongBreak: parseInt(e.target.value) })}
                  className="w-full bg-black/30 border border-purple-500/20 rounded-md px-3 py-2 text-white"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-300">Auto-start Breaks</h3>
                  <p className="text-xs text-gray-400">Automatically start breaks after a work session ends.</p>
                </div>
                <Switch
                  checked={settings.autoStartBreaks}
                  onCheckedChange={(checked) => setSettings({ ...settings, autoStartBreaks: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-300">Auto-start Pomodoros</h3>
                  <p className="text-xs text-gray-400">Automatically start work sessions after a break ends.</p>
                </div>
                <Switch
                  checked={settings.autoStartPomodoros}
                  onCheckedChange={(checked) => setSettings({ ...settings, autoStartPomodoros: checked })}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-purple-300">Notifications & Sounds</h2>
            <p className="text-gray-400">Manage how you get alerted for session changes.</p>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-300">Desktop Notifications</h3>
                  <p className="text-xs text-gray-400">Show notifications when sessions start or end.</p>
                </div>
                <Switch
                  checked={settings.desktopNotifications}
                  onCheckedChange={(checked) => setSettings({ ...settings, desktopNotifications: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-300">Sound Alerts</h3>
                  <p className="text-xs text-gray-400">Play a sound when sessions start or end.</p>
                </div>
                <Switch
                  checked={settings.soundAlerts}
                  onCheckedChange={(checked) => setSettings({ ...settings, soundAlerts: checked })}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-300">Alert Volume</label>
                  <span className="text-sm text-gray-400">{settings.alertVolume}%</span>
                </div>
                <Slider
                  value={[settings.alertVolume]}
                  onValueChange={(value) => setSettings({ ...settings, alertVolume: value[0] })}
                  max={100}
                  step={1}
                  className="[&_.bg-primary]:bg-purple-500"
                />
              </div>
            </div>
          </div>
        )}

        <div className="pt-6 border-t border-purple-500/20">
          <Button
            onClick={handleSave}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
          >
            Save All Settings
          </Button>
        </div>
      </div>
    </div>
  );
};