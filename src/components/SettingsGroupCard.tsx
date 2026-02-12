import React, { ReactNode } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { borderRadius, spacing } from '../theme/spacing';

interface SettingsGroupCardProps {
  title: string;
  children: ReactNode;
}

export const SettingsGroupCard: React.FC<SettingsGroupCardProps> = ({ title, children }) => {
  const { colors } = useTheme();
  
  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.textSecondary }]}>{title}</Text>
      <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.xxl,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: spacing.sm,
    marginLeft: spacing.sm,
  },
  card: {
    borderRadius: borderRadius.xlarge,
    overflow: 'hidden',
  },
});
