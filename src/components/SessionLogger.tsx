
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle, XCircle, Calendar, TrendingUp, Target } from 'lucide-react';

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

interface SessionLoggerProps {
  sessions: SessionData[];
  onClearSessions: () => void;
}

export const SessionLogger: React.FC<SessionLoggerProps> = ({
  sessions,
  onClearSessions
}) => {
  const [todaySessions, setTodaySessions] = useState<SessionData[]>([]);
  const [weekSessions, setWeekSessions] = useState<SessionData[]>([]);

  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    weekAgo.setHours(0, 0, 0, 0);

    const todayFiltered = sessions.filter(session => 
      session.startTime >= today
    );

    const weekFiltered = sessions.filter(session =>
      session.startTime >= weekAgo
    );

    setTodaySessions(todayFiltered);
    setWeekSessions(weekFiltered);
  }, [sessions]);

  const getSessionStats = (sessionList: SessionData[]) => {
    const workSessions = sessionList.filter(s => s.type === 'work');
    const completedSessions = workSessions.filter(s => s.completed);
    const totalFocusTime = completedSessions.reduce((acc, session) => acc + session.duration, 0);
    const completionRate = workSessions.length > 0 ? (completedSessions.length / workSessions.length) * 100 : 0;

    return {
      totalSessions: workSessions.length,
      completedSessions: completedSessions.length,
      totalFocusTime,
      completionRate,
      averageSessionTime: completedSessions.length > 0 ? totalFocusTime / completedSessions.length : 0
    };
  };

  const todayStats = getSessionStats(todaySessions);
  const weekStats = getSessionStats(weekSessions);

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const getSessionTypeColor = (type: string) => {
    switch (type) {
      case 'work': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'shortBreak': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'longBreak': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getSessionTypeLabel = (type: string) => {
    switch (type) {
      case 'work': return 'Focus';
      case 'shortBreak': return 'Short Break';
      case 'longBreak': return 'Long Break';
      default: return type;
    }
  };

  return (
    <div className="space-y-6">
      {/* Today's Overview */}
      <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-3">
            <Calendar className="w-6 h-6 text-purple-400" />
            <span className="text-xl font-bold text-slate-800">Today's Progress</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/5 rounded-lg p-4 text-center">
              <Target className="w-6 h-6 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-slate-800">{todayStats.totalSessions}</div>
              <div className="text-sm text-slate-600">Sessions Started</div>
            </div>
            <div className="bg-white/5 rounded-lg p-4 text-center">
              <CheckCircle className="w-6 h-6 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-700">{todayStats.completedSessions}</div>
              <div className="text-sm text-slate-600">Completed</div>
            </div>
            <div className="bg-white/5 rounded-lg p-4 text-center">
              <Clock className="w-6 h-6 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-700">{formatDuration(todayStats.totalFocusTime)}</div>
              <div className="text-sm text-slate-600">Focus Time</div>
            </div>
            <div className="bg-white/5 rounded-lg p-4 text-center">
              <TrendingUp className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-yellow-700">{todayStats.completionRate.toFixed(1)}%</div>
              <div className="text-sm text-slate-600">Success Rate</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Week Overview */}
      <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <TrendingUp className="w-6 h-6 text-green-400" />
              <span className="text-xl font-bold text-slate-800">Weekly Summary</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={onClearSessions}
              className="border-red-500/50 text-red-400 hover:bg-red-500/10"
            >
              Clear History
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white/5 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-slate-800">{weekStats.totalSessions}</div>
              <div className="text-sm text-slate-600">Total Sessions</div>
            </div>
            <div className="bg-white/5 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-700">{weekStats.completedSessions}</div>
              <div className="text-sm text-slate-600">Completed</div>
            </div>
            <div className="bg-white/5 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-700">{formatDuration(weekStats.totalFocusTime)}</div>
              <div className="text-sm text-slate-600">Total Focus</div>
            </div>
            <div className="bg-white/5 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-purple-700">{formatDuration(weekStats.averageSessionTime)}</div>
              <div className="text-sm text-slate-600">Avg Session</div>
            </div>
          </div>

          {/* Weekly Progress Bar */}
          <div className="bg-white/5 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-600">Weekly Goal Progress</span>
              <span className="text-sm text-slate-600">{weekStats.completedSessions}/25 sessions</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${Math.min((weekStats.completedSessions / 25) * 100, 100)}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Sessions */}
      <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-slate-800">Recent Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {sessions.slice(-10).reverse().map((session) => (
              <div
                key={session.id}
                className="flex items-center justify-between bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  {session.completed ? (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-400" />
                  )}
                  <div>
                    <div className="flex items-center space-x-2">
                      <Badge className={`${getSessionTypeColor(session.type)} border text-xs`}>
                        {getSessionTypeLabel(session.type)}
                      </Badge>
                      <span className="text-sm text-slate-600">
                        {formatDuration(session.duration)}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">
                      {session.startTime.toLocaleTimeString()} - {session.endTime.toLocaleTimeString()}
                    </p>
                    {session.interrupted && session.interruptionReason && (
                      <p className="text-xs text-red-400">Interrupted: {session.interruptionReason}</p>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-medium ${session.completed ? 'text-green-400' : 'text-red-400'}`}>
                    {session.completed ? 'Completed' : 'Interrupted'}
                  </div>
                  <div className="text-xs text-slate-500">
                    {session.startTime.toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {sessions.length === 0 && (
            <div className="text-center py-8">
              <Clock className="w-12 h-12 text-slate-500 mx-auto mb-3" />
              <p className="text-slate-500">No sessions recorded yet</p>
              <p className="text-sm text-slate-400">Start a focus session to begin tracking your progress</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
