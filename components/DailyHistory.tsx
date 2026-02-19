import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { SmokeLog } from '../types';

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

  const renderItem = ({ item }: { item: SmokeLog }) => (
    <View style={styles.logCard}>
      <View style={styles.logInfo}>
        <View style={styles.iconContainer}>
          <FontAwesome6 name="clock" size={16} color="#a1a1aa" />
        </View>
        <View>
          <Text style={styles.logTime}>
            {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
          </Text>
          <Text style={styles.logSubtitle}>RECORDED</Text>
        </View>
      </View>
      <View style={styles.logActions}>
        <FontAwesome6 name="check" size={16} color="#10b981" style={{ marginRight: 15 }} />
        <TouchableOpacity onPress={() => onRemove(item.id)} style={styles.deleteButton}>
          <FontAwesome6 name="trash-can" size={16} color="#a1a1aa" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Daily History</Text>
          <Text style={styles.subtitle}>Reviewing your logs for today</Text>
        </View>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{logsToday.length} Logs</Text>
        </View>
      </View>

      {logsToday.length === 0 ? (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIconCircle}>
            <FontAwesome6 name="list-check" size={32} color="#27272a" />
          </View>
          <Text style={styles.emptyText}>No logs recorded today yet.</Text>
          <Text style={styles.emptySubtext}>Records will appear here as you log them.</Text>
        </View>
      ) : (
        <View style={styles.listContainer}>
          {logsToday.map(log => (
            <React.Fragment key={log.id}>
              {renderItem({ item: log })}
            </React.Fragment>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16, // Standardized padding
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f4f4f5',
  },
  subtitle: {
    fontSize: 14,
    color: '#a1a1aa', // Improved contrast
  },
  badge: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 99,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.2)',
  },
  badgeText: {
    color: '#10b981',
    fontSize: 12,
    fontWeight: 'bold',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  emptyIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#18181b',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  emptyText: {
    color: '#a1a1aa',
    fontWeight: '600',
    fontSize: 16,
  },
  emptySubtext: {
    color: '#52525b',
    fontSize: 14,
    marginTop: 4,
  },
  listContainer: {
    gap: 12,
  },
  logCard: {
    backgroundColor: '#18181b',
    borderWidth: 1,
    borderColor: '#27272a',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  logInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#27272a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logTime: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f4f4f5',
  },
  logSubtitle: {
    fontSize: 10,
    color: '#a1a1aa', // Improved contrast
    fontWeight: '600',
  },
  logActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteButton: {
    padding: 8,
  }
});

export default DailyHistory;
