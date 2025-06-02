
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { SessionData, BlockedSite, UserSettings } from '@/types';

export const useSupabaseData = () => {
  const { user } = useAuth();
  const [sessions, setSessions] = useState<SessionData[]>([]);
  const [blockedSites, setBlockedSites] = useState<BlockedSite[]>([]);
  const [settings, setSettings] = useState<UserSettings>({
    workDuration: 25,
    shortBreak: 5,
    longBreak: 15,
    longBreakInterval: 4,
    isSoundEnabled: true,
  });
  const [loading, setLoading] = useState(true);

  // Load user data
  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const loadData = async () => {
      try {
        // Load sessions
        const { data: sessionsData } = await supabase
          .from('sessions')
          .select('*')
          .order('created_at', { ascending: false });

        // Load blocked sites
        const { data: blockedSitesData } = await supabase
          .from('blocked_sites')
          .select('*')
          .order('added_at', { ascending: false });

        // Load settings
        const { data: settingsData } = await supabase
          .from('user_settings')
          .select('*')
          .single();

        if (sessionsData) {
          const formattedSessions = sessionsData.map(session => ({
            id: session.id,
            type: session.type as 'work' | 'shortBreak' | 'longBreak',
            startTime: new Date(session.start_time),
            endTime: new Date(session.end_time),
            duration: session.duration,
            completed: session.completed,
            interrupted: session.interrupted,
            interruptionReason: session.interruption_reason,
            userId: session.user_id
          }));
          setSessions(formattedSessions);
        }

        if (blockedSitesData) {
          const formattedBlockedSites = blockedSitesData.map(site => ({
            id: site.id,
            domain: site.domain,
            category: site.category,
            addedAt: new Date(site.added_at),
            userId: site.user_id
          }));
          setBlockedSites(formattedBlockedSites);
        }

        if (settingsData) {
          setSettings({
            id: settingsData.id,
            userId: settingsData.user_id,
            workDuration: settingsData.work_duration,
            shortBreak: settingsData.short_break,
            longBreak: settingsData.long_break,
            longBreakInterval: settingsData.long_break_interval,
            isSoundEnabled: settingsData.is_sound_enabled,
            createdAt: new Date(settingsData.created_at),
            updatedAt: new Date(settingsData.updated_at)
          });
        }
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user]);

  const saveSession = async (sessionData: Omit<SessionData, 'id'>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('sessions')
        .insert({
          user_id: user.id,
          type: sessionData.type,
          start_time: sessionData.startTime.toISOString(),
          end_time: sessionData.endTime.toISOString(),
          duration: sessionData.duration,
          completed: sessionData.completed,
          interrupted: sessionData.interrupted,
          interruption_reason: sessionData.interruptionReason
        })
        .select()
        .single();

      if (!error && data) {
        const newSession: SessionData = {
          id: data.id,
          type: data.type as 'work' | 'shortBreak' | 'longBreak',
          startTime: new Date(data.start_time),
          endTime: new Date(data.end_time),
          duration: data.duration,
          completed: data.completed,
          interrupted: data.interrupted,
          interruptionReason: data.interruption_reason,
          userId: data.user_id
        };
        setSessions(prev => [newSession, ...prev]);
      }
    } catch (error) {
      console.error('Error saving session:', error);
    }
  };

  const saveBlockedSite = async (site: Omit<BlockedSite, 'id' | 'addedAt' | 'userId'>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('blocked_sites')
        .insert({
          user_id: user.id,
          domain: site.domain,
          category: site.category
        })
        .select()
        .single();

      if (!error && data) {
        const newSite: BlockedSite = {
          id: data.id,
          domain: data.domain,
          category: data.category,
          addedAt: new Date(data.added_at),
          userId: data.user_id
        };
        setBlockedSites(prev => [newSite, ...prev]);
      }
    } catch (error) {
      console.error('Error saving blocked site:', error);
    }
  };

  const removeBlockedSite = async (siteId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('blocked_sites')
        .delete()
        .eq('id', siteId);

      if (!error) {
        setBlockedSites(prev => prev.filter(site => site.id !== siteId));
      }
    } catch (error) {
      console.error('Error removing blocked site:', error);
    }
  };

  const updateSettings = async (newSettings: UserSettings) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('user_settings')
        .update({
          work_duration: newSettings.workDuration,
          short_break: newSettings.shortBreak,
          long_break: newSettings.longBreak,
          long_break_interval: newSettings.longBreakInterval,
          is_sound_enabled: newSettings.isSoundEnabled,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id);

      if (!error) {
        setSettings(newSettings);
      }
    } catch (error) {
      console.error('Error updating settings:', error);
    }
  };

  const clearSessions = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('sessions')
        .delete()
        .eq('user_id', user.id);

      if (!error) {
        setSessions([]);
      }
    } catch (error) {
      console.error('Error clearing sessions:', error);
    }
  };

  return {
    sessions,
    blockedSites,
    settings,
    loading,
    saveSession,
    saveBlockedSite,
    removeBlockedSite,
    updateSettings,
    clearSessions
  };
};
