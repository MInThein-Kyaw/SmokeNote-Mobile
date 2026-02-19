import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';

interface SettingsRowProps {
  icon: string;
  title: string;
  subtitle: string;
  onPress?: () => void;
  rightComponent?: React.ReactNode;
  isDanger?: boolean;
}

const SettingsRow: React.FC<SettingsRowProps> = ({
  icon,
  title,
  subtitle,
  onPress,
  rightComponent,
  isDanger = false,
}) => {
  const content = (
    <>
      <View style={[styles.cardIcon, isDanger && styles.dangerIcon]}>
        <FontAwesome6 
          name={icon} 
          size={16} 
          color={isDanger ? '#ef4444' : '#a1a1aa'} 
        />
      </View>
      <View style={[styles.cardContent, rightComponent && styles.cardContentWithRight]}>
        <View style={styles.textContent}>
          <Text style={[styles.cardTitle, isDanger && styles.dangerTitle]}>
            {title}
          </Text>
          <Text style={[styles.cardSubtitle, isDanger && styles.dangerSubtitle]}>
            {subtitle}
          </Text>
        </View>
        {rightComponent}
      </View>
    </>
  );

  if (onPress) {
    return (
      <TouchableOpacity 
        style={[styles.card, isDanger && styles.dangerCard]} 
        onPress={onPress}
        activeOpacity={0.7}
      >
        {content}
      </TouchableOpacity>
    );
  }

  return (
    <View style={[styles.card, isDanger && styles.dangerCard]}>
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#18181b',
    borderWidth: 1,
    borderColor: '#27272a',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  dangerCard: {
    borderColor: 'rgba(239, 68, 68, 0.2)',
  },
  cardIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#27272a',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  dangerIcon: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
  },
  cardContent: {
    flex: 1,
  },
  cardContentWithRight: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#f4f4f5',
  },
  dangerTitle: {
    color: '#ef4444',
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#a1a1aa',
    marginTop: 2,
  },
  dangerSubtitle: {
    color: '#f87171',
  },
});

export default SettingsRow;
