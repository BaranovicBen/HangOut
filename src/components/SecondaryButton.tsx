import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { borderRadius, spacing } from '../theme/spacing';

interface SecondaryButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
}

export const SecondaryButton: React.FC<SecondaryButtonProps> = ({ title, onPress, style }) => {
  const { colors } = useTheme();
  
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: colors.secondaryButtonBg,
          borderColor: colors.secondaryButtonBorder,
        },
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[styles.text, { color: colors.secondaryButtonText }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xxl,
    borderRadius: borderRadius.medium,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },
  text: {
    fontSize: 17,
    fontWeight: '600',
  },
});
