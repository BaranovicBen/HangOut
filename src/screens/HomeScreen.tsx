import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeProvider';
import { AppHeader } from '../components/AppHeader';
import { CalendarFourWeekCard } from '../components/CalendarFourWeekCard';
import { PrimaryButton } from '../components/PrimaryButton';
import { SecondaryButton } from '../components/SecondaryButton';
import { spacing, screenPadding } from '../theme/spacing';
import { freeDays } from '../data/dummy';

interface HomeScreenProps {
  navigation: any;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { colors } = useTheme();
  
  const statusText = freeDays.size > 0 ? 'Your next 4 weeks' : 'No free full days found';
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <AppHeader
        title="HangOut"
        leftIcon="settings"
        rightIcon="profile"
        onLeftPress={() => navigation.navigate('Settings')}
        onRightPress={() => navigation.navigate('Profile')}
      />
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Status text */}
        <View style={styles.statusContainer}>
          <Text style={[styles.statusText, { color: colors.text }]}>
            {statusText}
          </Text>
        </View>
        
        {/* Calendar card */}
        <CalendarFourWeekCard freeDays={freeDays} />
        
        {/* Action buttons */}
        <View style={styles.buttonsContainer}>
          <PrimaryButton
            title="Create session"
            onPress={() => navigation.navigate('CreateSession')}
            style={styles.button}
          />
          <SecondaryButton
            title="Join session"
            onPress={() => navigation.navigate('JoinSession')}
            style={styles.button}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.huge,
  },
  statusContainer: {
    paddingHorizontal: screenPadding,
    paddingVertical: spacing.lg,
    alignItems: 'center',
  },
  statusText: {
    fontSize: 16,
    fontWeight: '400',
  },
  buttonsContainer: {
    paddingHorizontal: screenPadding,
    marginTop: spacing.xxxl,
    gap: spacing.lg,
  },
  button: {
    width: '100%',
  },
});
