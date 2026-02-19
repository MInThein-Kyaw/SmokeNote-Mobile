import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Platform } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { SmokeLog } from '../types';

interface HomeProps {
  logs: SmokeLog[];
  onLog: () => void;
}

const { width } = Dimensions.get('window');
const BUTTON_SIZE = width * 0.6;

const Home: React.FC<HomeProps> = ({ logs, onLog }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const logsToday = logs.filter(log => log.timestamp >= today.getTime());

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Home</Text>
        <Text style={styles.subtitle}>
          {today.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
        </Text>
      </View>

      <View style={styles.buttonWrapper}>
        <View style={styles.buttonGlow} />
        <TouchableOpacity 
          onPress={onLog}
          activeOpacity={0.8}
          style={styles.logButton}
        >
          <FontAwesome6 name="smoking" size={48} color="#34d399" style={styles.icon} />
          <Text style={styles.buttonText}>LOG</Text>
          <Text style={styles.buttonText}>CIGARETTE</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.progressArea}>
        <Text style={styles.progressLabel}>TODAY'S TOTAL</Text>
        <Text style={styles.progressCount}>{logsToday.length}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#f4f4f5',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#71717a',
    marginTop: 4,
  },
  buttonWrapper: {
    position: 'relative',
    marginBottom: 60,
  },
  buttonGlow: {
    position: 'absolute',
    top: -10,
    left: -10,
    right: -10,
    bottom: -10,
    backgroundColor: 'rgba(16, 185, 129, 0.05)',
    borderRadius: (BUTTON_SIZE + 20) / 2,
  },
  logButton: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    borderWidth: 4,
    borderColor: '#10b981',
    backgroundColor: '#18181b',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#10b981',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 15,
      },
      android: {
        elevation: 8,
      }
    }),
  },
  icon: {
    marginBottom: 16,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#34d399',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  progressArea: {
    alignItems: 'center',
  },
  progressLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#a1a1aa',
    letterSpacing: 2,
    marginBottom: 4,
  },
  progressCount: {
    fontSize: 72,
    fontWeight: '900',
    color: '#10b981',
  }
});

export default Home;
