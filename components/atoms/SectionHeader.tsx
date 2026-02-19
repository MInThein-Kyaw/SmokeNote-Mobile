import React from 'react';
import { Text, StyleSheet } from 'react-native';

interface SectionHeaderProps {
  title: string;
}

/**
 * SectionHeader Atom Component
 * Standardized section header with consistent spacing
 */
const SectionHeader: React.FC<SectionHeaderProps> = ({ title }) => {
  return (
    <Text style={styles.sectionTitle}>{title}</Text>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#a1a1aa', // Accessible contrast
    letterSpacing: 1.5,
    marginBottom: 12,
    paddingLeft: 4,
  },
});

export default SectionHeader;
