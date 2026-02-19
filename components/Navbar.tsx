import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { AppView } from '../types';

interface NavbarProps {
  currentView: AppView;
  setView: (view: AppView) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, setView }) => {
  const tabs = [
    { id: AppView.HOME, icon: 'house', label: 'Home' },
    { id: AppView.HISTORY, icon: 'clock-rotate-left', label: 'Daily' },
    { id: AppView.SUMMARY, icon: 'chart-simple', label: 'Monthly' },
    { id: AppView.SETTINGS, icon: 'gear', label: 'Settings' },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = currentView === tab.id;
        return (
          <TouchableOpacity
            key={tab.id}
            onPress={() => setView(tab.id)}
            style={styles.tab}
            activeOpacity={0.7}
          >
            <FontAwesome6 
              name={tab.icon as any} 
              size={20} 
              color={isActive ? '#10b981' : '#71717a'} 
            />
            <Text style={[styles.label, isActive && styles.activeLabel]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#18181b',
    borderTopWidth: 1,
    borderTopColor: '#27272a',
    paddingVertical: 12,
    paddingBottom: Platform.OS === 'ios' ? 30 : 12,
  },
  tab: {
    alignItems: 'center',
    flex: 1,
    gap: 4,
  },
  label: {
    fontSize: 10,
    fontWeight: '500',
    color: '#71717a',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  activeLabel: {
    color: '#10b981',
  }
});

export default Navbar;
