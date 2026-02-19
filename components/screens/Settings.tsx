import React from 'react';
import { View, Text, StyleSheet, TextInput, Alert, Switch, ScrollView } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { UserSettings, SmokeLog } from '../../types';
import SectionHeader from '../atoms/SectionHeader';
import SettingsRow from '../molecules/SettingsRow';
import ScreenHeader from '../molecules/ScreenHeader';

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
      <ScreenHeader
        title="Settings"
        subtitle="Configure your profile and tracking preferences"
      />

      <View style={styles.section}>
        <SectionHeader title="PROFILE" />
        <View style={styles.card}>
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
        </View>
      </View>

      <View style={styles.section}>
        <SectionHeader title="PREFERENCES" />
        
        <SettingsRow
          icon="bell"
          title="Notifications"
          subtitle="Enable daily reminders"
          onPress={toggleReminders}
          rightComponent={
            <Switch 
              value={settings.remindersEnabled} 
              onValueChange={toggleReminders}
              trackColor={{ false: '#27272a', true: '#10b981' }}
              thumbColor="#ffffff"
            />
          }
        />

        <SettingsRow
          icon="file-export"
          title="Export Data"
          subtitle="Download CSV of logs"
          onPress={handleExportData}
          rightComponent={
            <FontAwesome6 name="chevron-right" size={12} color="#52525b" />
          }
        />
      </View>

      <View style={styles.section}>
        <SectionHeader title="MAINTENANCE" />
        
        <SettingsRow
          icon="trash-can"
          title="Clear All History"
          subtitle="This cannot be undone"
          onPress={handleClearData}
          isDanger
        />
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
    padding: 16,
    paddingBottom: 32,
  },
  section: {
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#18181b',
    borderWidth: 1,
    borderColor: '#27272a',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
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
  cardContent: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#a1a1aa',
    letterSpacing: 1.5,
  },
  input: {
    color: '#f4f4f5',
    fontSize: 16,
    fontWeight: '500',
    padding: 0,
    marginTop: 4,
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
