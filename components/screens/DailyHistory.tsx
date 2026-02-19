import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SmokeLog } from '../../types';
import ScreenHeader from '../molecules/ScreenHeader';
import Badge from '../atoms/Badge';
import LogList from '../organisms/LogList';

interface DailyHistoryProps {
  logs: SmokeLog[];
  onRemove: (id: string) => void;
}

const DailyHistory: React.FC<DailyHistoryProps> = ({ logs, onRemove }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const logsToday = logs
    .filter(log => log.timestamp >= today.getTime())
    .sort((a, b) => b.timestamp - a.timestamp);

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Daily History"
        subtitle="Reviewing your logs for today"
        rightComponent={
          <Badge text={`${logsToday.length} Logs`} />
        }
      />
      
      <LogList logs={logsToday} onRemove={onRemove} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
});

export default DailyHistory;
