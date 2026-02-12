export const lightColors = {
  // Backgrounds
  background: '#F4F6FA',
  cardBackground: '#FFFFFF',
  
  // Gradients
  gradientStart: '#4F46E5', // Deep indigo
  gradientEnd: '#06B6D4', // Teal
  
  // Buttons
  primaryButtonBg: '#4F46E5',
  primaryButtonText: '#FFFFFF',
  secondaryButtonBg: '#F4F6FA',
  secondaryButtonBorder: '#E5E7EB',
  secondaryButtonText: '#1F2937',
  
  // Text
  text: '#111827',
  textSecondary: '#6B7280',
  textMuted: '#9CA3AF',
  
  // Accents
  accent: '#4F46E5',
  freeDayIndicator: '#10B981', // Emerald
  expiredDay: '#9CA3AF',
  
  // UI Elements
  divider: '#E5E7EB',
  shadow: 'rgba(0, 0, 0, 0.08)',
  
  // Glass effect
  glassBackground: 'rgba(255, 255, 255, 0.7)',
  glassBorder: 'rgba(255, 255, 255, 0.18)',
};

export const darkColors = {
  // Backgrounds
  background: '#0E1116',
  cardBackground: '#161B22',
  
  // Gradients
  gradientStart: '#4338CA', // Slightly desaturated indigo
  gradientEnd: '#0891B2', // Slightly desaturated teal
  
  // Buttons
  primaryButtonBg: '#4338CA',
  primaryButtonText: '#FFFFFF',
  secondaryButtonBg: '#1F2937',
  secondaryButtonBorder: '#374151',
  secondaryButtonText: '#F9FAFB',
  
  // Text
  text: '#F9FAFB',
  textSecondary: '#9CA3AF',
  textMuted: '#6B7280',
  
  // Accents
  accent: '#4338CA',
  freeDayIndicator: '#10B981',
  expiredDay: '#6B7280',
  
  // UI Elements
  divider: '#374151',
  shadow: 'rgba(0, 0, 0, 0.3)',
  
  // Glass effect
  glassBackground: 'rgba(22, 27, 34, 0.7)',
  glassBorder: 'rgba(255, 255, 255, 0.08)',
};

export type ColorScheme = typeof lightColors;
