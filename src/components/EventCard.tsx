import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { spacing, borderRadius, shadows } from '../theme/spacing';

interface EventCardProps {
  title: string;
  time: string;
  color?: string;
}

export const EventCard: React.FC<EventCardProps> = ({ 
  title, 
  time, 
  color = '#4F46E5' 
}) => {
  const { colors } = useTheme();
  
  return (
    <View style={[styles.card, shadows.soft, { backgroundColor: colors.cardBackground }]}>
      <View style={[styles.colorIndicator, { backgroundColor: color }]} />
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
        <Text style={[styles.time, { color: colors.textSecondary }]}>{time}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    borderRadius: borderRadius.medium,
    padding: spacing.lg,
    marginBottom: spacing.md,
    overflow: 'hidden',
  },
  colorIndicator: {
    width: 4,
    borderRadius: 2,
    marginRight: spacing.md,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    letterSpacing: 0.2,
  },
  time: {
    fontSize: 14,
    fontWeight: '400',
  },
});
