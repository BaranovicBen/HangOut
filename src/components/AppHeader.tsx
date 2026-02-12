import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { spacing } from '../theme/spacing';
import { Avatar } from './Avatar';

interface AppHeaderProps {
  title: string;
  leftIcon?: 'settings' | 'back' | 'home';
  rightIcon?: 'profile' | 'home';
  onLeftPress?: () => void;
  onRightPress?: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  leftIcon,
  rightIcon,
  onLeftPress,
  onRightPress,
}) => {
  const { colors } = useTheme();
  
  const getIconText = (icon?: string) => {
    switch (icon) {
      case 'settings':
        return '⚙️';
      case 'back':
        return '←';
      case 'home':
        return '🏠';
      case 'profile':
        return null; // Will use Avatar component
      default:
        return '';
    }
  };
  
  return (
    <View style={[styles.header, { backgroundColor: colors.background }]}>
      <View style={styles.leftContainer}>
        {leftIcon && onLeftPress && (
          <TouchableOpacity onPress={onLeftPress} style={styles.iconButton}>
            <Text style={styles.iconText}>{getIconText(leftIcon)}</Text>
          </TouchableOpacity>
        )}
      </View>
      
      <View style={styles.centerContainer}>
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      </View>
      
      <View style={styles.rightContainer}>
        {rightIcon && onRightPress && (
          <TouchableOpacity onPress={onRightPress} style={styles.iconButton}>
            {rightIcon === 'profile' ? (
              <Avatar size={32} emoji="👤" />
            ) : (
              <Text style={styles.iconText}>{getIconText(rightIcon)}</Text>
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    height: 60,
  },
  leftContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  centerContainer: {
    flex: 2,
    alignItems: 'center',
  },
  rightContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  iconButton: {
    padding: spacing.sm,
  },
  iconText: {
    fontSize: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
  },
});
