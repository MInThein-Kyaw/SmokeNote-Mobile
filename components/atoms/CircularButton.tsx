import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions, Platform } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';

interface CircularButtonProps {
  onPress: () => void;
  size?: number;
  iconName?: string;
  iconSize?: number;
  iconColor?: string;
  borderColor?: string;
  backgroundColor?: string;
  label?: string;
}

const { width } = Dimensions.get('window');
const DEFAULT_SIZE = width * 0.6;

const CircularButton: React.FC<CircularButtonProps> = ({
  onPress,
  size = DEFAULT_SIZE,
  iconName = 'smoking',
  iconSize = 48,
  iconColor = '#34d399',
  borderColor = '#10b981',
  backgroundColor = '#18181b',
  label = 'LOG\nCIGARETTE',
}) => {
  return (
    <TouchableOpacity 
      onPress={onPress}
      activeOpacity={0.8}
      style={[
        styles.button,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          borderColor,
          backgroundColor,
        }
      ]}
    >
      <FontAwesome6 name={iconName} size={iconSize} color={iconColor} style={styles.icon} />
      {label.split('\n').map((line, index) => (
        <Text key={index} style={[styles.buttonText, { color: iconColor }]}>
          {line}
        </Text>
      ))}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderWidth: 4,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#10b981',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 15,
      },
      android: {
        elevation: 8,
      }
    }),
  },
  icon: {
    marginBottom: 16,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
});

export default CircularButton;
