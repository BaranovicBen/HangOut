import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeProvider';
import { screenPadding, spacing, borderRadius } from '../theme/spacing';

interface ThemeScreenProps {
  navigation: any;
}

type ThemeMode = 'light' | 'dark' | 'system';

export const ThemeScreen: React.FC<ThemeScreenProps> = ({ navigation }) => {
  const { colors, themeMode, setThemeMode } = useTheme();
  
  const options: { value: ThemeMode; label: string }[] = [
    { value: 'system', label: 'System' },
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
  ];
  
  const handleSelect = (mode: ThemeMode) => {
    setThemeMode(mode);
  };
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={[styles.backArrow, { color: colors.text }]}>‹</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Theme</Text>
        <View style={styles.placeholder} />
      </View>
      
      <View style={styles.content}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.option,
              { backgroundColor: colors.cardBackground },
              index < options.length - 1 && { marginBottom: spacing.lg },
            ]}
            onPress={() => handleSelect(option.value)}
            activeOpacity={0.7}
          >
            <Text style={[styles.optionText, { color: colors.text }]}>{option.label}</Text>
            <View style={styles.radioContainer}>
              <View
                style={[
                  styles.radioOuter,
                  { borderColor: colors.text },
                  themeMode === option.value && { borderColor: colors.freeDayIndicator },
                ]}
              >
                {themeMode === option.value && (
                  <View style={[styles.radioInner, { backgroundColor: colors.freeDayIndicator }]} />
                )}
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: screenPadding,
    paddingVertical: spacing.lg,
    height: 60,
  },
  backButton: {
    padding: spacing.sm,
  },
  backArrow: {
    fontSize: 32,
    fontWeight: '300',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: screenPadding,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.xlarge,
    minHeight: 70,
  },
  optionText: {
    fontSize: 18,
    fontWeight: '600',
  },
  radioContainer: {
    padding: spacing.sm,
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});
