import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../theme/ThemeProvider';
import { borderRadius, shadows } from '../theme/spacing';

interface GradientCardProps {
  children: ReactNode;
  style?: ViewStyle;
  useGradient?: boolean;
}

export const GradientCard: React.FC<GradientCardProps> = ({ 
  children, 
  style, 
  useGradient = false 
}) => {
  const { colors } = useTheme();
  
  if (useGradient) {
    return (
      <LinearGradient
        colors={[colors.gradientStart, colors.gradientEnd]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.card, shadows.soft, style]}
      >
        {children}
      </LinearGradient>
    );
  }
  
  return (
    <View
      style={[
        styles.card,
        shadows.soft,
        { backgroundColor: colors.cardBackground },
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: borderRadius.xlarge,
    padding: 20,
  },
});
