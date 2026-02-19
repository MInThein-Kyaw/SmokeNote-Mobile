import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface StatCardProps {
  value: string | number;
  label: string;
}

/**
 * StatCard Molecule Component
 * Displays a statistic value with a label
 * Reusable component for showing metrics
 */
const StatCard: React.FC<StatCardProps> = ({ value, label }) => {
  return (
    <View style={styles.stat}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  stat: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#f4f4f5', // High contrast for accessibility
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#a1a1aa', // WCAG AA compliant contrast ratio
    letterSpacing: 1,
    marginTop: 4,
    textAlign: 'center',
  },
});

export default StatCard;
