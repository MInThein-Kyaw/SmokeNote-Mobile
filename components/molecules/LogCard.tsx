import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import IconButton from '../atoms/IconButton';

interface LogCardProps {
  timestamp: number;
  onRemove: () => void;
}

const LogCard: React.FC<LogCardProps> = ({ timestamp, onRemove }) => {
  return (
    <View style={styles.logCard}>
      <View style={styles.logInfo}>
        <View style={styles.iconContainer}>
          <FontAwesome6 name="clock" size={16} color="#a1a1aa" />
        </View>
        <View>
          <Text style={styles.logTime}>
            {new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
          </Text>
          <Text style={styles.logSubtitle}>RECORDED</Text>
        </View>
      </View>
      <View style={styles.logActions}>
        <FontAwesome6 name="check" size={16} color="#10b981" style={{ marginRight: 15 }} />
        <IconButton
          iconName="trash-can"
          onPress={onRemove}
          size={16}
          color="#a1a1aa"
          style={styles.deleteButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logCard: {
    backgroundColor: '#18181b',
    borderWidth: 1,
    borderColor: '#27272a',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#27272a',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  logTime: {
    fontSize: 16,
    fontWeight: '600',
    color: '#f4f4f5',
  },
  logSubtitle: {
    fontSize: 10,
    color: '#a1a1aa',
    marginTop: 2,
    letterSpacing: 1,
  },
  logActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteButton: {
    padding: 0,
  },
});

export default LogCard;
