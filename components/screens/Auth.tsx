import React, { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseAuth } from '../../services/firebase';

const Auth: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const title = useMemo(() => (isSignUp ? 'Create Account' : 'Welcome Back'), [isSignUp]);

  const submit = async () => {
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !password) {
      setError('Please enter both email and password.');
      return;
    }

    if (isSignUp && password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(firebaseAuth, normalizedEmail, password);
      } else {
        await signInWithEmailAndPassword(firebaseAuth, normalizedEmail, password);
      }
    } catch (authError: any) {
      const code = authError?.code ?? '';

      if (code === 'auth/invalid-email') setError('Invalid email address.');
      else if (code === 'auth/email-already-in-use') setError('This email is already registered.');
      else if (code === 'auth/weak-password') setError('Password should be at least 6 characters.');
      else if (code === 'auth/invalid-credential') setError('Incorrect email or password.');
      else setError('Authentication failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.hero}>
          <View style={styles.heroIconWrap}>
            <FontAwesome6 name="shield-heart" size={32} color="#10b981" />
          </View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>
            Sign in to sync your smoking logs securely across devices.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>EMAIL</Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            keyboardType="email-address"
            placeholder="you@example.com"
            placeholderTextColor="#52525b"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>PASSWORD</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            placeholder="Enter password"
            placeholderTextColor="#52525b"
            value={password}
            onChangeText={setPassword}
          />

          {isSignUp && (
            <>
              <Text style={styles.label}>CONFIRM PASSWORD</Text>
              <TextInput
                style={styles.input}
                secureTextEntry
                placeholder="Confirm password"
                placeholderTextColor="#52525b"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
            </>
          )}

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <TouchableOpacity
            style={[styles.primaryButton, isSubmitting && styles.disabledButton]}
            onPress={submit}
            disabled={isSubmitting}
            activeOpacity={0.8}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#09090b" />
            ) : (
              <Text style={styles.primaryButtonText}>{isSignUp ? 'Create Account' : 'Login'}</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.switchModeButton}
            onPress={() => {
              setError('');
              setIsSignUp((prev) => !prev);
            }}
            activeOpacity={0.8}
          >
            <Text style={styles.switchModeText}>
              {isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign up"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#09090b',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 36,
  },
  hero: {
    marginBottom: 28,
    alignItems: 'center',
  },
  heroIconWrap: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.28)',
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fafafa',
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 22,
    color: '#a1a1aa',
    marginTop: 10,
    textAlign: 'center',
    maxWidth: 320,
  },
  card: {
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: '#27272a',
    backgroundColor: '#18181b',
  },
  label: {
    marginTop: 10,
    marginBottom: 6,
    color: '#a1a1aa',
    fontSize: 11,
    letterSpacing: 1.2,
    fontWeight: '700',
  },
  input: {
    borderWidth: 1,
    borderColor: '#27272a',
    backgroundColor: '#09090b',
    color: '#f4f4f5',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
  },
  primaryButton: {
    marginTop: 18,
    backgroundColor: '#10b981',
    borderRadius: 12,
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButton: {
    opacity: 0.6,
  },
  primaryButtonText: {
    color: '#09090b',
    fontWeight: '800',
    fontSize: 15,
  },
  switchModeButton: {
    marginTop: 14,
    alignItems: 'center',
  },
  switchModeText: {
    color: '#10b981',
    fontSize: 13,
    fontWeight: '600',
  },
  error: {
    marginTop: 12,
    color: '#f87171',
    fontSize: 13,
  },
});

export default Auth;
