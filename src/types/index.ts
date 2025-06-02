
export interface SessionData {
  id: string;
  type: 'work' | 'shortBreak' | 'longBreak';
  startTime: Date;
  endTime: Date;
  duration: number;
  completed: boolean;
  interrupted: boolean;
  interruptionReason?: string;
  userId?: string;
}

export interface BlockedSite {
  id: string;
  domain: string;
  category: string;
  addedAt: Date;
  userId?: string;
}

export interface UserSettings {
  id?: string;
  userId?: string;
  workDuration: number;
  shortBreak: number;
  longBreak: number;
  pomodorosBeforeLongBreak: number;
  autoStartBreaks: boolean;
  autoStartPomodoros: boolean;
  desktopNotifications: boolean;
  soundAlerts: boolean;
  alertVolume: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface User {
  id: string;
  email: string;
  createdAt: Date;
}
