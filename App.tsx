
import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AppView, SmokeLog, UserSettings } from './types';
import { User, onAuthStateChanged, signOut } from 'firebase/auth';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  writeBatch,
} from 'firebase/firestore';
import { firebaseAuth, firebaseDb } from './services/firebase';
import Landing from './components/screens/Landing';
import Home from './components/screens/Home';
import DailyHistory from './components/screens/DailyHistory';
import MonthlySummary from './components/screens/MonthlySummary';
import Settings from './components/screens/Settings';
import Auth from './components/screens/Auth';
import Navbar from './components/Navbar';

const DEFAULT_SETTINGS: UserSettings = { name: 'User', remindersEnabled: true };

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.HOME);
  const [logs, setLogs] = useState<SmokeLog[]>([]);
  const [settings, setSettings] = useState<UserSettings>(DEFAULT_SETTINGS);
  const [user, setUser] = useState<User | null>(null);
  const [hasSeenLanding, setHasSeenLanding] = useState(false);
  const [isAuthLoaded, setIsAuthLoaded] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (authUser) => {
      setUser(authUser);
      setIsAuthLoaded(true);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!user) {
      setLogs([]);
      setSettings(DEFAULT_SETTINGS);
      setCurrentView(AppView.HOME);
      return;
    }

    const settingsRef = doc(firebaseDb, 'users', user.uid, 'settings', 'profile');
    const logsRef = collection(firebaseDb, 'users', user.uid, 'logs');
    const logsQuery = query(logsRef, orderBy('timestamp', 'asc'));

    const unsubscribeSettings = onSnapshot(settingsRef, (snapshot) => {
      if (snapshot.exists()) {
        setSettings({ ...DEFAULT_SETTINGS, ...(snapshot.data() as Partial<UserSettings>) });
        return;
      }

      setDoc(settingsRef, DEFAULT_SETTINGS).catch((error) => {
        console.error('Failed to initialize settings', error);
      });
    });

    const unsubscribeLogs = onSnapshot(logsQuery, (snapshot) => {
      const firestoreLogs: SmokeLog[] = snapshot.docs.map((item) => ({
        id: item.id,
        timestamp: item.data().timestamp ?? Date.now(),
      }));
      setLogs(firestoreLogs);
    });

    return () => {
      unsubscribeSettings();
      unsubscribeLogs();
    };
  }, [user]);

  const addLog = useCallback(() => {
    if (!user) return;

    addDoc(collection(firebaseDb, 'users', user.uid, 'logs'), {
      timestamp: Date.now(),
    }).catch((error) => {
      console.error('Failed to add log', error);
    });
  }, [user]);

  const removeLog = useCallback((id: string) => {
    if (!user) return;

    deleteDoc(doc(firebaseDb, 'users', user.uid, 'logs', id)).catch((error) => {
      console.error('Failed to remove log', error);
    });
  }, [user]);

  const clearLogs = useCallback(() => {
    if (!user) return;

    const logsRef = collection(firebaseDb, 'users', user.uid, 'logs');

    getDocs(logsRef)
      .then((snapshot) => {
        const batch = writeBatch(firebaseDb);
        snapshot.forEach((item) => batch.delete(item.ref));
        return batch.commit();
      })
      .catch((error) => {
        console.error('Failed to clear logs', error);
      });
  }, [user]);

  const handleGetStarted = useCallback(() => {
    setHasSeenLanding(true);
  }, []);

  const updateSettings = useCallback((nextSettings: UserSettings) => {
    setSettings(nextSettings);

    if (!user) return;

    setDoc(doc(firebaseDb, 'users', user.uid, 'settings', 'profile'), nextSettings, { merge: true }).catch(
      (error) => {
        console.error('Failed to update settings', error);
      }
    );
  }, [user]);

  const handleSignOut = useCallback(() => {
    signOut(firebaseAuth).catch((error) => {
      console.error('Failed to sign out', error);
    });
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
          onUpdate={updateSettings}
          onClearData={clearLogs}
          onSignOut={handleSignOut}
        />;
      default:
        return <Home logs={logs} onLog={addLog} />;
    }
  };

  if (!isAuthLoaded) return null;

  if (!hasSeenLanding) {
    return (
      <View style={styles.container}>
        <StatusBar style="light" />
        <Landing onGetStarted={handleGetStarted} />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <StatusBar style="light" />
        <Auth />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          {renderView()}
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
});

export default App;
