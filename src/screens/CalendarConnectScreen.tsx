import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeProvider';
import { PrimaryButton } from '../components/PrimaryButton';
import { screenPadding, spacing, borderRadius } from '../theme/spacing';
import * as Calendar from 'expo-calendar';

interface CalendarConnectScreenProps {
  navigation: any;
}

interface CalendarItem {
  id: string;
  title: string;
  color: string;
}

export const CalendarConnectScreen: React.FC<CalendarConnectScreenProps> = ({ navigation }) => {
  const { colors } = useTheme();
  const [calendars, setCalendars] = useState<CalendarItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const [selectedCalendar, setSelectedCalendar] = useState<string | null>(null);
  
  const requestPermission = async () => {
    setLoading(true);
    try {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === 'granted') {
        setHasPermission(true);
        await loadCalendars();
      }
    } catch (error) {
      console.error('Permission error:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const loadCalendars = async () => {
    try {
      const deviceCalendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
      const calendarItems: CalendarItem[] = deviceCalendars.map((cal) => ({
        id: cal.id,
        title: cal.title,
        color: cal.color || '#999999',
      }));
      setCalendars(calendarItems);
      if (calendarItems.length > 0 && !selectedCalendar) {
        setSelectedCalendar(calendarItems[0].id);
      }
    } catch (error) {
      console.error('Load calendars error:', error);
    }
  };
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={[styles.backArrow, { color: colors.text }]}>‹</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Apple Calendar</Text>
        <View style={styles.placeholder} />
      </View>
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {!hasPermission ? (
          <View style={styles.permissionContainer}>
            <PrimaryButton
              title={loading ? 'Requesting...' : 'Request permission'}
              onPress={requestPermission}
            />
          </View>
        ) : loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.text} />
          </View>
        ) : calendars.length > 0 ? (
          <View>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Your Calendars</Text>
            {calendars.map((cal) => (
              <View
                key={cal.id}
                style={[styles.calendarItem, { backgroundColor: colors.cardBackground }]}
              >
                <View style={styles.calendarInfo}>
                  <View style={[styles.colorDot, { backgroundColor: cal.color }]} />
                  <Text style={[styles.calendarName, { color: colors.text }]}>{cal.title}</Text>
                </View>
                {selectedCalendar === cal.id && (
                  <Text style={[styles.connected, { color: colors.freeDayIndicator }]}>
                    Connected
                  </Text>
                )}
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
              No calendars found
            </Text>
          </View>
        )}
      </ScrollView>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: screenPadding,
    paddingBottom: spacing.huge,
  },
  permissionContainer: {
    marginTop: spacing.huge,
  },
  loadingContainer: {
    marginTop: spacing.huge,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: spacing.lg,
  },
  calendarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.large,
    marginBottom: spacing.md,
  },
  calendarInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  colorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: spacing.md,
  },
  calendarName: {
    fontSize: 16,
    fontWeight: '400',
  },
  connected: {
    fontSize: 14,
    fontWeight: '600',
  },
  emptyContainer: {
    marginTop: spacing.huge,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '400',
  },
});
