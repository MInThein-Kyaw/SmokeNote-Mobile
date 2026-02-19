import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface CountDisplayProps {
  label: string;
  count: number;
  countColor?: string;
  labelColor?: string;
}

const CountDisplay: React.FC<CountDisplayProps> = ({
  label,
  count,
  countColor = '#10b981',
  labelColor = '#a1a1aa',
}) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: labelColor }]}>{label}</Text>
      <Text style={[styles.count, { color: countColor }]}>{count}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 2,
    marginBottom: 4,
  },
  count: {
    fontSize: 72,
    fontWeight: '900',
  },
});

export default CountDisplay;
