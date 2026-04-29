import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';

interface PrivacyPolicyProps {
  onStartApp: () => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onStartApp }) => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>PRIVACY POLICY</Text>
          </View>
          <Text style={styles.title}>Your Data, Your Control</Text>
          <Text style={styles.subtitle}>Effective: January 1, 2025</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>What We Store</Text>
          <Text style={styles.bodyText}>- Cigarette logs and timestamps</Text>
          <Text style={styles.bodyText}>- Display name and reminder preferences</Text>
          <Text style={styles.bodyText}>- Onboarding completion status</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Where Data Lives</Text>
          <Text style={styles.bodyText}>
            All SmokeNote data is securely stored in Firebase. Your data is encrypted and isolated per user account, ensuring your information remains private and protected.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Your Rights</Text>
          <Text style={styles.bodyText}>- Access your records anytime</Text>
          <Text style={styles.bodyText}>- Clear all history from Settings</Text>
          <Text style={styles.bodyText}>- Delete your account to remove all Firebase data</Text>
        </View>

        <View style={styles.endArea}>
          <Text style={styles.endText}>You have reached the end of the privacy page.</Text>
          <TouchableOpacity style={styles.startButton} onPress={onStartApp} activeOpacity={0.85}>
            <FontAwesome6 name="rocket" size={18} color="#18181b" />
            <Text style={styles.startButtonText}>Start Using App</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#09090b',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 48,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 24,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.35)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    marginBottom: 16,
  },
  badgeText: {
    color: '#10b981',
    fontSize: 11,
    letterSpacing: 1,
    fontWeight: '700',
  },
  title: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    color: '#a1a1aa',
    fontSize: 13,
  },
  card: {
    backgroundColor: '#18181b',
    borderWidth: 1,
    borderColor: '#27272a',
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
  },
  sectionTitle: {
    color: '#f4f4f5',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  bodyText: {
    color: '#a1a1aa',
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 6,
  },
  endArea: {
    marginTop: 18,
    alignItems: 'center',
  },
  endText: {
    color: '#71717a',
    fontSize: 13,
    marginBottom: 14,
    textAlign: 'center',
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#10b981',
    paddingHorizontal: 22,
    paddingVertical: 14,
    borderRadius: 28,
  },
  startButtonText: {
    color: '#18181b',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default PrivacyPolicy;
