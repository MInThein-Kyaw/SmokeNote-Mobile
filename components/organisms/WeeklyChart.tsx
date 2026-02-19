import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';

interface WeeklyData {
  [key: number]: number;
}

interface WeeklyChartProps {
  weeklyData: WeeklyData;
}

const WeeklyChart: React.FC<WeeklyChartProps> = ({ weeklyData }) => {
  if (Object.keys(weeklyData).length === 0) {
    return (
      <View style={styles.emptyState}>
        <FontAwesome6 name="chart-simple" size={32} color="#3f3f46" />
        <Text style={styles.emptyText}>No data this month yet</Text>
      </View>
    );
  }

  const maxCount = Math.max(...Object.values(weeklyData));

  return (
    <>
      {Object.entries(weeklyData).map(([week, count]) => (
        <View key={week} style={styles.weekCard}>
          <View style={styles.weekInfo}>
            <FontAwesome6 name="calendar-week" size={14} color="#a1a1aa" />
            <Text style={styles.weekLabel}>Week {parseInt(week) + 1}</Text>
          </View>
          <View style={styles.weekBar}>
            <View 
              style={[
                styles.weekBarFill, 
                { width: `${Math.min((count / maxCount) * 100, 100)}%` }
              ]} 
            />
            <Text style={styles.weekCount}>{count}</Text>
          </View>
        </View>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  weekCard: {
    backgroundColor: '#18181b',
    borderWidth: 1,
    borderColor: '#27272a',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  weekInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  weekLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#f4f4f5',
    marginLeft: 8,
  },
  weekBar: {
    height: 28,
    backgroundColor: '#27272a',
    borderRadius: 6,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  weekBarFill: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#10b981',
    borderRadius: 6,
  },
  weekCount: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#f4f4f5',
    marginLeft: 8,
    zIndex: 1,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyText: {
    marginTop: 12,
    fontSize: 14,
    color: '#a1a1aa',
  },
});

export default WeeklyChart;
