
import { SessionData, BlockedSite, UserSettings } from '@/types';

// This will be replaced with Supabase functions once connected
export const storageService = {
  // Sessions
  getSessions: (): SessionData[] => {
    try {
      const sessions = localStorage.getItem('focusflow-sessions');
      if (sessions) {
        return JSON.parse(sessions).map((session: any) => ({
          ...session,
          startTime: new Date(session.startTime),
          endTime: new Date(session.endTime)
        }));
      }
      return [];
    } catch (error) {
      console.error('Error loading sessions:', error);
      return [];
    }
  },

  saveSessions: (sessions: SessionData[]): void => {
    try {
      localStorage.setItem('focusflow-sessions', JSON.stringify(sessions));
    } catch (error) {
      console.error('Error saving sessions:', error);
    }
  },

  // Blocked Sites
  getBlockedSites: (): BlockedSite[] => {
    try {
      const sites = localStorage.getItem('focusflow-blocked-sites');
      if (sites) {
        return JSON.parse(sites).map((site: any) => ({
          ...site,
          addedAt: new Date(site.addedAt)
        }));
      }
      return [
        { id: '1', domain: 'facebook.com', category: 'Social Media', addedAt: new Date() },
        { id: '2', domain: 'twitter.com', category: 'Social Media', addedAt: new Date() },
        { id: '3', domain: 'youtube.com', category: 'Entertainment', addedAt: new Date() },
        { id: '4', domain: 'reddit.com', category: 'Social Media', addedAt: new Date() },
        { id: '5', domain: 'netflix.com', category: 'Entertainment', addedAt: new Date() },
      ];
    } catch (error) {
      console.error('Error loading blocked sites:', error);
      return [];
    }
  },

  saveBlockedSites: (sites: BlockedSite[]): void => {
    try {
      localStorage.setItem('focusflow-blocked-sites', JSON.stringify(sites));
    } catch (error) {
      console.error('Error saving blocked sites:', error);
    }
  },

  // Settings
  getSettings: (): UserSettings => {
    try {
      const settings = localStorage.getItem('focusflow-settings');
      if (settings) {
        return JSON.parse(settings);
      }
      return {
        workDuration: 25,
        shortBreak: 5,
        longBreak: 15,
        longBreakInterval: 4,
        isSoundEnabled: true,
      };
    } catch (error) {
      console.error('Error loading settings:', error);
      return {
        workDuration: 25,
        shortBreak: 5,
        longBreak: 15,
        longBreakInterval: 4,
        isSoundEnabled: true,
      };
    }
  },

  saveSettings: (settings: UserSettings): void => {
    try {
      localStorage.setItem('focusflow-settings', JSON.stringify(settings));
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  },

  // Clear all data
  clearAllData: (): void => {
    try {
      localStorage.removeItem('focusflow-sessions');
      localStorage.removeItem('focusflow-blocked-sites');
      localStorage.removeItem('focusflow-settings');
    } catch (error) {
      console.error('Error clearing data:', error);
    }
  }
};
