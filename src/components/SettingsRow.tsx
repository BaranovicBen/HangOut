import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { spacing } from '../theme/spacing';

interface SettingsRowProps {
  icon?: string;
  label: string;
  onPress?: () => void;
  showDivider?: boolean;
  rightElement?: React.ReactNode;
}

export const SettingsRow: React.FC<SettingsRowProps> = ({
  icon,
  label,
  onPress,
  showDivider = true,
  rightElement,
}) => {
  const { colors } = useTheme();
  
  const content = (
    <>
      <View style={styles.leftContent}>
        {icon && (
          <View style={[styles.iconContainer, { backgroundColor: colors.text }]}>
            <Text style={styles.icon}>{icon}</Text>
          </View>
        )}
        <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
      </View>
      {rightElement || <Text style={[styles.arrow, { color: colors.textSecondary }]}>›</Text>}
    </>
  );
  
  return (
    <View>
      {onPress ? (
        <TouchableOpacity
          style={styles.row}
          onPress={onPress}
          activeOpacity={0.7}
        >
          {content}
        </TouchableOpacity>
      ) : (
        <View style={styles.row}>{content}</View>
      )}
      {showDivider && <View style={[styles.divider, { backgroundColor: colors.divider }]} />}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    minHeight: 52,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 24,
    height: 24,
    borderRadius: 4,
    marginRight: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 14,
  },
  label: {
    fontSize: 16,
    fontWeight: '400',
  },
  arrow: {
    fontSize: 24,
    fontWeight: '300',
  },
  divider: {
    height: 1,
    marginLeft: spacing.xl + 24 + spacing.lg,
  },
});
