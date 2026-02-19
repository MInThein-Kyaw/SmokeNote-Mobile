import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';

interface IconButtonProps {
  iconName: string;
  onPress: () => void;
  size?: number;
  color?: string;
  backgroundColor?: string;
  style?: any;
}

const IconButton: React.FC<IconButtonProps> = ({
  iconName,
  onPress,
  size = 16,
  color = '#a1a1aa',
  backgroundColor = 'transparent',
  style,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, { backgroundColor }, style]}
      activeOpacity={0.7}
    >
      <FontAwesome6 name={iconName} size={size} color={color} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default IconButton;
