
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Target, Clock, Award, Calendar, Zap } from 'lucide-react';

interface SessionData {
  id: string;
  type: 'work' | 'shortBreak' | 'longBreak';
  startTime: Date;
  endTime: Date;
  duration: number;
  completed: boolean;
  interrupted: boolean;
}

interface AnalyticsDashboardProps {
  sessions: SessionData[];
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ sessions }) => {
  const [dailyData, setDailyData] = useState<any[]>([]);
  const [weeklyData, setWeeklyData] = useState<any[]>([]);
  const [productivityInsights, setProductivityInsights] = useState<any>({});

  useEffect(() => {
    generateAnalyticsData();
  }, [sessions]);

  const generateAnalyticsData = () => {
    // Generate daily data for the last 7 days
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return date;
    });

    const dailyStats = last7Days.map(date => {
      const dayStart = new Date(date);
      dayStart.setHours(0, 0, 0, 0);
      const dayEnd = new Date(date);
      dayEnd.setHours(23, 59, 59, 999);

      const daySessions = sessions.filter(session => 
        session.startTime >= dayStart && session.startTime <= dayEnd && session.type === 'work'
      );

      const completedSessions = daySessions.filter(s => s.completed);
      const totalFocusTime = completedSessions.reduce((acc, session) => acc + session.duration, 0);

      return {
        date: date.toLocaleDateString('en-US', { weekday: 'short' }),
        fullDate: date.toLocaleDateString(),
        sessions: daySessions.length,
        completed: completedSessions.length,
        focusTime: totalFocusTime,
        completionRate: daySessions.length > 0 ? (completedSessions.length / daySessions.length) * 100 : 0
      };
    });

    setDailyData(dailyStats);

    // Generate weekly data for the last 4 weeks
    const weeklyStats = Array.from({ length: 4 }, (_, i) => {
      const weekStart = new Date();
      weekStart.setDate(weekStart.getDate() - (weekStart.getDay() + 7 * i));
      weekStart.setHours(0, 0, 0, 0);
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekEnd.getDate() + 6);
      weekEnd.setHours(23, 59, 59, 999);

      const weekSessions = sessions.filter(session =>
        session.startTime >= weekStart && session.startTime <= weekEnd && session.type === 'work'
      );

      const completedSessions = weekSessions.filter(s => s.completed);
      const totalFocusTime = completedSessions.reduce((acc, session) => acc + session.duration, 0);

      return {
        week: `Week ${4 - i}`,
        sessions: weekSessions.length,
        completed: completedSessions.length,
        focusTime: Math.round(totalFocusTime / 60), // Convert to hours
        completionRate: weekSessions.length > 0 ? (completedSessions.length / weekSessions.length) * 100 : 0
      };
    }).reverse();

    setWeeklyData(weeklyStats);

    // Generate productivity insights
    const workSessions = sessions.filter(s => s.type === 'work');
    const completedWorkSessions = workSessions.filter(s => s.completed);
    const totalFocusTime = completedWorkSessions.reduce((acc, session) => acc + session.duration, 0);
    
    // Find most productive hour
    const hourlyData = Array.from({ length: 24 }, (_, hour) => ({
      hour,
      sessions: workSessions.filter(session => session.startTime.getHours() === hour).length
    }));
    const mostProductiveHour = hourlyData.reduce((max, current) => 
      current.sessions > max.sessions ? current : max, { hour: 0, sessions: 0 }
    );

    // Calculate streaks
    const today = new Date();
    let currentStreak = 0;
    for (let i = 0; i < 30; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(checkDate.getDate() - i);
      checkDate.setHours(0, 0, 0, 0);
      const nextDate = new Date(checkDate);
      nextDate.setDate(nextDate.getDate() + 1);

      const dayHasSessions = workSessions.some(session =>
        session.startTime >= checkDate && session.startTime < nextDate && session.completed
      );

      if (dayHasSessions) {
        currentStreak++;
      } else {
        break;
      }
    }

    setProductivityInsights({
      totalSessions: workSessions.length,
      completedSessions: completedWorkSessions.length,
      totalFocusTime,
      averageSessionTime: completedWorkSessions.length > 0 ? totalFocusTime / completedWorkSessions.length : 0,
      completionRate: workSessions.length > 0 ? (completedWorkSessions.length / workSessions.length) * 100 : 0,
      mostProductiveHour: mostProductiveHour.hour,
      currentStreak,
      longestStreak: Math.max(currentStreak, 5) // Simplified calculation
    });
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const formatHour = (hour: number) => {
    if (hour === 0) return '12 AM';
    if (hour < 12) return `${hour} AM`;
    if (hour === 12) return '12 PM';
    return `${hour - 12} PM`;
  };

  // Data for session type breakdown
  const sessionTypeData = [
    { name: 'Completed', value: productivityInsights.completedSessions, color: '#10B981' },
    { name: 'Interrupted', value: productivityInsights.totalSessions - productivityInsights.completedSessions, color: '#EF4444' }
  ];

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur-xl border border-purple-500/30">
          <CardContent className="p-4 text-center">
            <Target className="w-6 h-6 text-purple-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{productivityInsights.totalSessions || 0}</div>
            <div className="text-sm text-purple-200">Total Sessions</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur-xl border border-green-500/30">
          <CardContent className="p-4 text-center">
            <Clock className="w-6 h-6 text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{formatTime(productivityInsights.totalFocusTime || 0)}</div>
            <div className="text-sm text-green-200">Focus Time</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-xl border border-blue-500/30">
          <CardContent className="p-4 text-center">
            <TrendingUp className="w-6 h-6 text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{(productivityInsights.completionRate || 0).toFixed(1)}%</div>
            <div className="text-sm text-blue-200">Success Rate</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 backdrop-blur-xl border border-yellow-500/30">
          <CardContent className="p-4 text-center">
            <Award className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{productivityInsights.currentStreak || 0}</div>
            <div className="text-sm text-yellow-200">Day Streak</div>
          </CardContent>
        </Card>
      </div>

      {/* Daily Focus Trends */}
      <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-3">
            <Calendar className="w-6 h-6 text-purple-400" />
            <span className="text-xl font-bold text-white">Daily Focus Trends</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F9FAFB'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="focusTime" 
                  stroke="#8B5CF6" 
                  strokeWidth={3}
                  dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }}
                  name="Focus Time (min)"
                />
                <Line 
                  type="monotone" 
                  dataKey="completed" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                  name="Completed Sessions"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Weekly Progress */}
        <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <TrendingUp className="w-6 h-6 text-green-400" />
              <span className="text-lg font-bold text-white">Weekly Progress</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="week" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#F9FAFB'
                    }} 
                  />
                  <Bar 
                    dataKey="focusTime" 
                    fill="url(#colorGradient)"
                    radius={[4, 4, 0, 0]}
                    name="Focus Hours"
                  />
                  <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#EC4899" stopOpacity={0.6}/>
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Session Completion Rate */}
        <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <Target className="w-6 h-6 text-blue-400" />
              <span className="text-lg font-bold text-white">Session Breakdown</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sessionTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {sessionTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#F9FAFB'
                    }} 
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Productivity Insights */}
      <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-3">
            <Zap className="w-6 h-6 text-yellow-400" />
            <span className="text-xl font-bold text-white">Productivity Insights</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-2">Peak Performance</h4>
              <p className="text-2xl font-bold text-purple-400">
                {formatHour(productivityInsights.mostProductiveHour || 9)}
              </p>
              <p className="text-sm text-gray-300">Most productive hour</p>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-2">Average Session</h4>
              <p className="text-2xl font-bold text-green-400">
                {formatTime(productivityInsights.averageSessionTime || 0)}
              </p>
              <p className="text-sm text-gray-300">Typical focus duration</p>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-2">Consistency</h4>
              <div className="flex items-center space-x-2">
                <p className="text-2xl font-bold text-blue-400">{productivityInsights.currentStreak || 0}</p>
                <span className="text-gray-300">/</span>
                <p className="text-lg text-gray-400">{productivityInsights.longestStreak || 0}</p>
              </div>
              <p className="text-sm text-gray-300">Current / Best streak</p>
            </div>
          </div>

          <div className="mt-6 grid md:grid-cols-2 gap-4">
            {productivityInsights.completionRate >= 80 && (
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30 p-3 justify-center">
                🎉 Excellent Focus! You're completing 80%+ of your sessions
              </Badge>
            )}
            
            {productivityInsights.currentStreak >= 7 && (
              <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 p-3 justify-center">
                🔥 Weekly Warrior! 7+ day streak maintained
              </Badge>
            )}
            
            {productivityInsights.totalFocusTime >= 300 && (
              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 p-3 justify-center">
                ⏰ Time Master! 5+ hours of total focus time
              </Badge>
            )}
            
            {productivityInsights.averageSessionTime >= 20 && (
              <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 p-3 justify-center">
                🎯 Deep Focus! Average sessions over 20 minutes
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
