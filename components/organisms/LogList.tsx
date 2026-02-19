import React from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { SmokeLog } from '../../types';
import LogCard from '../molecules/LogCard';

interface LogListProps {
  logs: SmokeLog[];
  onRemove: (id: string) => void;
}

const LogList: React.FC<LogListProps> = ({ logs, onRemove }) => {
  if (logs.length === 0) {
    return (
      <View style={styles.emptyState}>
        <FontAwesome6 name="calendar-day" size={48} color="#3f3f46" />
        <Text style={styles.emptyTitle}>No Logs Yet</Text>
        <Text style={styles.emptySubtitle}>Your cigarettes logged today will appear here</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={logs}
      renderItem={({ item }) => (
        <LogCard
          timestamp={item.timestamp}
          onRemove={() => onRemove(item.id)}
        />
      )}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContent}
    />
  );
};

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 16,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 64,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f4f4f5',
    marginTop: 16,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#a1a1aa',
    marginTop: 8,
    textAlign: 'center',
  },
});

export default LogList;
