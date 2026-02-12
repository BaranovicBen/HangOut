import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../theme/ThemeProvider';
import { borderRadius, spacing, shadows } from '../theme/spacing';

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  useGradient?: boolean;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({ 
  title, 
  onPress, 
  style,
  useGradient = true 
}) => {
  const { colors } = useTheme();
  
  if (useGradient) {
    return (
      <TouchableOpacity
        style={[styles.button, shadows.soft, style]}
        onPress={onPress}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={[colors.gradientStart, colors.gradientEnd]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        >
          <Text style={[styles.text, { color: colors.primaryButtonText }]}>{title}</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }
  
  return (
    <TouchableOpacity
      style={[
        styles.button,
        shadows.soft,
        { backgroundColor: colors.primaryButtonBg },
        style
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[styles.text, { color: colors.primaryButtonText }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: borderRadius.medium,
    overflow: 'hidden',
    minHeight: 54,
  },
  gradient: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xxl,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 54,
  },
  text: {
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
});
