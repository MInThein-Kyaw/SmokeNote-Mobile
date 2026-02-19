
import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AppView, SmokeLog, UserSettings } from './types';
import { storage } from './services/storage';
import Home from './components/screens/Home';
import DailyHistory from './components/screens/DailyHistory';
import MonthlySummary from './components/screens/MonthlySummary';
import Settings from './components/screens/Settings';
import Navbar from './components/Navbar';

const STORAGE_KEY = 'smokenote_logs';
const SETTINGS_KEY = 'smokenote_settings';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.HOME);
  const [logs, setLogs] = useState<SmokeLog[]>([]);
  const [settings, setSettings] = useState<UserSettings>({ name: 'User', remindersEnabled: true });
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Load initial state
  useEffect(() => {
    const loadData = async () => {
      const savedLogs = await storage.getItem(STORAGE_KEY);
      const savedSettings = await storage.getItem(SETTINGS_KEY);
      
      if (savedLogs) setLogs(savedLogs);
      if (savedSettings) setSettings(savedSettings);
      setIsLoaded(true);
    };
    loadData();
  }, []);

  // Persist data on changes (only after initial load)
  useEffect(() => {
    if (isLoaded) {
      storage.setItem(STORAGE_KEY, logs);
    }
  }, [logs, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      storage.setItem(SETTINGS_KEY, settings);
    }
  }, [settings, isLoaded]);

  const addLog = useCallback(() => {
    const newLog: SmokeLog = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now()
    };
    setLogs(prev => [...prev, newLog]);
  }, []);

  const removeLog = useCallback((id: string) => {
    setLogs(prev => prev.filter(log => log.id !== id));
  }, []);

  const clearLogs = useCallback(() => {
    setLogs([]);
    storage.removeItem(STORAGE_KEY);
  }, []);

  const renderView = () => {
    switch (currentView) {
      case AppView.HOME:
        return <Home logs={logs} onLog={addLog} />;
      case AppView.HISTORY:
        return <DailyHistory logs={logs} onRemove={removeLog} />;
      case AppView.SUMMARY:
        return <MonthlySummary logs={logs} />;
      case AppView.SETTINGS:
        return <Settings 
          settings={settings} 
          logs={logs}
          onUpdate={setSettings} 
          onClearData={clearLogs} 
        />;
      default:
        return <Home logs={logs} onLog={addLog} />;
    }
  };

  if (!isLoaded) return null;

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <ScrollView 
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {renderView()}
          </ScrollView>
        </View>
        <Navbar currentView={currentView} setView={setCurrentView} />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#09090b',
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100, // Space for navbar
  }
});

export default App;
