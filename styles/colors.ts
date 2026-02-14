// Color palette for HangOut app
export const colors = {
  // Primary orange/yellow accent
  primary: '#f5a623',
  
  // Dark theme
  dark: {
    background: '#1a1a1a',
    card: '#2a2a2a',
    text: '#ffffff',
    textSecondary: '#999999',
    border: '#3a3a3a',
  },
  
  // Light theme
  light: {
    background: '#f5f5f5',
    card: '#ffffff',
    text: '#000000',
    textSecondary: '#666666',
    border: '#e0e0e0',
  },
  
  // Shared colors
  white: '#ffffff',
  black: '#000000',
  gray: '#888888',
  
  // Event indicator colors
  eventTeal: '#4ecdc4',
  eventGreen: '#45b649',
  eventBlue: '#4a90e2',
  eventPurple: '#9b59b6',
}

export type ThemeMode = 'dark' | 'light'

export const getThemeColors = (mode: ThemeMode) => {
  return {
    background: mode === 'dark' ? colors.dark.background : colors.light.background,
    card: mode === 'dark' ? colors.dark.card : colors.light.card,
    text: mode === 'dark' ? colors.dark.text : colors.light.text,
    textSecondary: mode === 'dark' ? colors.dark.textSecondary : colors.light.textSecondary,
    border: mode === 'dark' ? colors.dark.border : colors.light.border,
    primary: colors.primary,
  }
}
