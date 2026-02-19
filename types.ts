
export interface SmokeLog {
  id: string;
  timestamp: number; // ms since epoch
}

export enum AppView {
  HOME = 'home',
  HISTORY = 'history',
  SUMMARY = 'summary',
  SETTINGS = 'settings'
}

export interface UserSettings {
  name: string;
  remindersEnabled: boolean;
}

export interface HealthInsight {
  text: string;
  category: 'motivation' | 'health' | 'savings';
}
