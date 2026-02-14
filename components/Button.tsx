import React from 'react'
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from '@/contexts/ThemeContext'
import { spacing, borderRadius } from '@/styles/spacing'
import { typography } from '@/styles/typography'

type ButtonVariant = 'filled' | 'outlined'

type ButtonProps = {
  title: string
  onPress: () => void
  variant?: ButtonVariant
  icon?: keyof typeof Ionicons.glyphMap
  style?: ViewStyle
  textStyle?: TextStyle
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'filled',
  icon,
  style,
  textStyle,
}) => {
  const { colors, theme } = useTheme()

  const buttonStyle = [
    styles.button,
    variant === 'filled' && {
      backgroundColor: colors.primary,
    },
    variant === 'outlined' && {
      backgroundColor: 'transparent',
      borderWidth: 2,
      borderColor: theme === 'dark' ? colors.text : colors.textSecondary,
    },
    style,
  ]

  const textStyleCombined = [
    styles.text,
    {
      color: variant === 'filled' 
        ? (theme === 'dark' ? colors.text : colors.background) 
        : (theme === 'dark' ? colors.text : colors.text),
    },
    textStyle,
  ]

  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress} activeOpacity={0.7}>
      {icon && (
        <Ionicons
          name={icon}
          size={20}
          color={variant === 'filled' 
            ? (theme === 'dark' ? colors.text : colors.background) 
            : (theme === 'dark' ? colors.text : colors.text)}
          style={styles.icon}
        />
      )}
      <Text style={textStyleCombined}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.round,
    minWidth: 140,
  },
  text: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
  },
  icon: {
    marginRight: spacing.sm,
  },
})

export default Button
