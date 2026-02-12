import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeProvider';
import { AppHeader } from '../components/AppHeader';
import { CalendarFourWeekCard } from '../components/CalendarFourWeekCard';
import { PrimaryButton } from '../components/PrimaryButton';
import { SecondaryButton } from '../components/SecondaryButton';
import { EventCard } from '../components/EventCard';
import { spacing, screenPadding } from '../theme/spacing';
import { freeDays } from '../data/dummy';

interface HomeScreenProps {
  navigation: any;
}

// Dummy events for today
const todayEvents = [
  { id: '1', title: 'Work', time: '9:00 – 17:00', color: '#4F46E5' },
  { id: '2', title: 'Gym', time: '18:00 – 19:30', color: '#10B981' },
  { id: '3', title: 'Study Block', time: '20:00 – 22:00', color: '#F59E0B' },
];

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { colors } = useTheme();
  
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
        {/* Calendar card */}
        <CalendarFourWeekCard freeDays={freeDays} />
        
        {/* Today section */}
        <View style={styles.todaySection}>
          <View style={styles.todayHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Today</Text>
            <Text style={[styles.eventCount, { color: colors.textSecondary }]}>
              {todayEvents.length} events
            </Text>
          </View>
          
          {todayEvents.map((event) => (
            <EventCard
              key={event.id}
              title={event.title}
              time={event.time}
              color={event.color}
            />
          ))}
        </View>
        
        {/* Action buttons */}
        <View style={styles.buttonsContainer}>
          <PrimaryButton
            title="Create Session"
            onPress={() => navigation.navigate('CreateSession')}
            style={styles.button}
          />
          <SecondaryButton
            title="Join Session"
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
    paddingBottom: spacing.huge + spacing.xxl,
  },
  todaySection: {
    paddingHorizontal: screenPadding,
    marginTop: spacing.xxxl,
  },
  todayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  eventCount: {
    fontSize: 14,
    fontWeight: '500',
  },
  buttonsContainer: {
    paddingHorizontal: screenPadding,
    marginTop: spacing.xxxl,
    gap: spacing.md,
  },
  button: {
    width: '100%',
  },
});
