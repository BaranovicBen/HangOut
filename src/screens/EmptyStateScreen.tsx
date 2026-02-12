import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeProvider';
import { PrimaryButton } from '../components/PrimaryButton';
import { spacing, screenPadding } from '../theme/spacing';

interface EmptyStateScreenProps {
  navigation: any;
}

export const EmptyStateScreen: React.FC<EmptyStateScreenProps> = ({ navigation }) => {
  const { colors } = useTheme();
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <View style={styles.content}>
        <View style={styles.illustration}>
          <Text style={styles.emoji}>📅</Text>
        </View>
        <Text style={[styles.title, { color: colors.text }]}>No sessions yet.</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Create your first session to get started
        </Text>
        <View style={styles.buttonContainer}>
          <PrimaryButton
            title="Create Session"
            onPress={() => navigation.navigate('CreateSession')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: screenPadding * 2,
  },
  illustration: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(79, 70, 229, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xxxl,
  },
  emoji: {
    fontSize: 56,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: spacing.md,
    letterSpacing: 0.3,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: spacing.huge,
    lineHeight: 24,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 280,
  },
});
