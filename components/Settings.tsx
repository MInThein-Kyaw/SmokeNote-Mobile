import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, Switch, ScrollView } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { UserSettings, SmokeLog } from '../types';
import Card from './atoms/Card';
import SectionHeader from './atoms/SectionHeader';

interface SettingsProps {
  settings: UserSettings;
  logs: SmokeLog[];
  onUpdate: (settings: UserSettings) => void;
  onClearData: () => void;
}

const Settings: React.FC<SettingsProps> = ({ settings, logs, onUpdate, onClearData }) => {
  const handleNameChange = (text: string) => {
    onUpdate({ ...settings, name: text });
  };

  const toggleReminders = () => {
    onUpdate({ ...settings, remindersEnabled: !settings.remindersEnabled });
  };

  const handleClearData = () => {
    Alert.alert(
      'Clear Data',
      'Are you sure you want to clear all history? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Clear All', 
          style: 'destructive',
          onPress: () => {
            onClearData();
            Alert.alert('Success', 'History successfully cleared.');
          }
        },
      ]
    );
  };

  const handleExportData = () => {
    Alert.alert('Export', 'Export functionality is coming soon to the mobile app.');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>Configure your profile and tracking preferences</Text>
      </View>

      <View style={styles.section}>
        <SectionHeader title="PROFILE" />
        <Card>
          <View style={styles.cardIcon}>
            <FontAwesome6 name="user" size={16} color="#a1a1aa" />
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.inputLabel}>YOUR NAME</Text>
            <TextInput 
              style={styles.input}
              value={settings.name}
              onChangeText={handleNameChange}
              placeholder="Enter name..."
              placeholderTextColor="#52525b"
            />
          </View>
        </Card>
      </View>

      <View style={styles.section}>
        <SectionHeader title="PREFERENCES" />
        
        <TouchableOpacity 
          style={styles.card} 
          onPress={toggleReminders}
          activeOpacity={0.7}
        >
          <View style={styles.cardIcon}>
            <FontAwesome6 name="bell" size={16} color="#a1a1aa" />
          </View>
          <View style={[styles.cardContent, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
            <View>
              <Text style={styles.cardTitle}>Notifications</Text>
              <Text style={styles.cardSubtitle}>Enable daily reminders</Text>
            </View>
            <Switch 
              value={settings.remindersEnabled} 
              onValueChange={toggleReminders}
              trackColor={{ false: '#27272a', true: '#10b981' }}
              thumbColor="#ffffff"
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.card} 
          onPress={handleExportData}
          activeOpacity={0.7}
        >
          <View style={styles.cardIcon}>
            <FontAwesome6 name="file-export" size={16} color="#a1a1aa" />
          </View>
          <View style={[styles.cardContent, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
            <View>
              <Text style={styles.cardTitle}>Export Data</Text>
              <Text style={styles.cardSubtitle}>Download CSV of logs</Text>
            </View>
            <FontAwesome6 name="chevron-right" size={12} color="#52525b" />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <SectionHeader title="MAINTENANCE" />
        
        <TouchableOpacity 
          style={[styles.card, styles.dangerCard]} 
          onPress={handleClearData}
          activeOpacity={0.7}
        >
          <View style={[styles.cardIcon, styles.dangerIcon]}>
            <FontAwesome6 name="trash-can" size={16} color="#ef4444" />
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.dangerTitle}>Clear All History</Text>
            <Text style={styles.dangerSubtitle}>This cannot be undone</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.versionText}>SMOKENOTE V1.0.4</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16, // Standardized padding
    paddingBottom: 32, // Extra bottom padding for scroll
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f4f4f5', // High contrast
  },
  subtitle: {
    fontSize: 14,
    color: '#a1a1aa', // Improved contrast
    marginTop: 4,
  },
  section: {
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#18181b',
    borderWidth: 1,
    borderColor: '#27272a',
    borderRadius: 16,
    padding: 16, // Standardized padding
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 16,
  },
  cardIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#27272a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContent: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#a1a1aa', // Better contrast
    letterSpacing: -0.2,
  },
  input: {
    color: '#f4f4f5',
    fontSize: 16,
    fontWeight: '500',
    padding: 0,
    marginTop: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f4f4f5',
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#a1a1aa', // Improved contrast
    marginTop: 2,
  },
  dangerCard: {
    backgroundColor: 'rgba(239, 68, 68, 0.05)',
    borderColor: 'rgba(239, 68, 68, 0.1)',
  },
  dangerIcon: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
  },
  dangerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ef4444',
  },
  dangerSubtitle: {
    fontSize: 12,
    color: 'rgba(239, 68, 68, 0.7)',
    marginTop: 2,
  },
  footer: {
    marginTop: 40,
    alignItems: 'center',
  },
  versionText: {
    fontSize: 10,
    color: '#52525b',
    fontWeight: 'bold',
    letterSpacing: 2,
  }
});

export default Settings;
