import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { borderRadius, spacing } from '../theme/spacing';

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({ title, onPress, style }) => {
  const { colors } = useTheme();
  
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: colors.primaryButtonBg }, style]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[styles.text, { color: colors.primaryButtonText }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xxl,
    borderRadius: borderRadius.medium,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },
  text: {
    fontSize: 17,
    fontWeight: '600',
  },
});
