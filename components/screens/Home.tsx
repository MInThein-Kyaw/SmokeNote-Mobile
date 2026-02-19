import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { SmokeLog } from '../../types';
import ScreenHeader from '../molecules/ScreenHeader';
import CircularButton from '../atoms/CircularButton';
import CountDisplay from '../atoms/CountDisplay';

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
      <View style={styles.headerWrapper}>
        <ScreenHeader
          title="Home"
          subtitle={today.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
        />
      </View>

      <View style={styles.buttonWrapper}>
        <View style={styles.buttonGlow} />
        <CircularButton
          onPress={onLog}
          size={BUTTON_SIZE}
        />
      </View>

      <CountDisplay
        label="TODAY'S TOTAL"
        count={logsToday.length}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  headerWrapper: {
    alignItems: 'center',
    marginBottom: 60,
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
});

export default Home;
