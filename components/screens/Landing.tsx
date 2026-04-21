import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';

interface LandingProps {
  onGetStarted: () => void;
}

const { width, height } = Dimensions.get('window');

const Landing: React.FC<LandingProps> = ({ onGetStarted }) => {
  const benefits = [
    {
      icon: 'chart-line',
      title: 'Track Your Progress',
      description: 'See your smoke-free journey unfold with intuitive daily, weekly, and monthly tracking.',
    },
    {
      icon: 'calendar-check',
      title: 'Build Better Habits',
      description: 'Replace smoking with healthy routines using our smart tracking and reminders.',
    },
    {
      icon: 'trophy',
      title: 'Celebrate Milestones',
      description: 'Recognize your achievements and stay motivated with every smoke-free day.',
    },
    {
      icon: 'piggy-bank',
      title: 'Save Money',
      description: 'Watch your savings grow as you invest in your health instead of cigarettes.',
    },
    {
      icon: 'shield-heart',
      title: 'Privacy First',
      description: 'Your data stays on your device. No accounts, no tracking, complete privacy.',
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <View style={styles.hero}>
          <View style={styles.iconContainer}>
            <View style={styles.iconGlow} />
            <FontAwesome6 name="wind" size={60} color="#10b981" />
          </View>
          
          <Text style={styles.appName}>SmokeNote</Text>
          <Text style={styles.tagline}>Your Journey to Freedom</Text>
          <Text style={styles.subtitle}>
            Break free from smoking, one breath at a time
          </Text>
        </View>

        {/* Why Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <FontAwesome6 name="lightbulb" size={20} color="#f59e0b" />
            <Text style={styles.sectionTitle}>Why SmokeNote?</Text>
          </View>
          <Text style={styles.whyText}>
            Quitting smoking is one of the best decisions you'll ever make. SmokeNote helps you 
            stay accountable, visualize your progress, and celebrate every victory on your path 
            to a healthier, smoke-free life.
          </Text>
        </View>

        {/* Benefits Grid */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <FontAwesome6 name="star" size={20} color="#10b981" />
            <Text style={styles.sectionTitle}>What You'll Get</Text>
          </View>
          
          <View style={styles.benefitsGrid}>
            {benefits.map((benefit, index) => (
              <View key={index} style={styles.benefitCard}>
                <View style={styles.benefitIconContainer}>
                  <FontAwesome6 name={benefit.icon as any} size={24} color="#10b981" />
                </View>
                <Text style={styles.benefitTitle}>{benefit.title}</Text>
                <Text style={styles.benefitDescription}>{benefit.description}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* CTA Section */}
        <View style={styles.ctaSection}>
          <Text style={styles.ctaText}>
            Ready to take control of your health?
          </Text>
          <TouchableOpacity 
            style={styles.button}
            onPress={onGetStarted}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Get Started</Text>
            <FontAwesome6 name="arrow-right" size={18} color="#18181b" />
          </TouchableOpacity>
          
          <Text style={styles.footerText}>
            No sign-up required • Completely free • Private & secure
          </Text>
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
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  hero: {
    alignItems: 'center',
    marginBottom: 50,
  },
  iconContainer: {
    position: 'relative',
    marginBottom: 24,
  },
  iconGlow: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    top: -30,
    left: -30,
  },
  appName: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
    letterSpacing: -1,
  },
  tagline: {
    fontSize: 20,
    fontWeight: '600',
    color: '#10b981',
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#a1a1aa',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 280,
  },
  section: {
    marginBottom: 40,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  whyText: {
    fontSize: 16,
    color: '#d4d4d8',
    lineHeight: 26,
    backgroundColor: '#18181b',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#27272a',
  },
  benefitsGrid: {
    gap: 16,
  },
  benefitCard: {
    backgroundColor: '#18181b',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#27272a',
  },
  benefitIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  benefitTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 6,
  },
  benefitDescription: {
    fontSize: 14,
    color: '#a1a1aa',
    lineHeight: 22,
  },
  ctaSection: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  ctaText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 24,
    textAlign: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#10b981',
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 30,
    shadowColor: '#10b981',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#18181b',
  },
  footerText: {
    fontSize: 13,
    color: '#71717a',
    marginTop: 20,
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default Landing;
