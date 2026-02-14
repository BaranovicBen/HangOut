import React, { useEffect, useMemo, useState } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native'
import { router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import CalendarView from '@/components/CalendarView'
import Button from '@/components/Button'
import EventCard from '@/components/EventCard'
import ProfileAvatar from '@/components/ProfileAvatar'
import { useTheme } from '@/contexts/ThemeContext'
import { spacing, borderRadius } from '@/styles/spacing'
import { typography } from '@/styles/typography'
import { colors as colorPalette } from '@/styles/colors'
import { DateTime } from 'luxon';
import {sessionTimezone} from '../config/user.settings.json';

import * as FileSystem from 'expo-file-system'
import { Asset } from 'expo-asset'

import { parseIcsAndNormalize } from '@/utils/parseiCal.mjs'
import { getAvailabilityMap } from '@/utils/getAvailabilityMap.js'
import { resolveOptions } from '@/utils/settings.js'
import testIcs from '../assets/test.ics'

async function loadIcsTextFromAssets(): Promise<string> {
  const asset = Asset.fromModule(testIcs);
  await asset.downloadAsync();
  const uri = asset.localUri ?? asset.uri;
  return FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.UTF8 });
}

async function getFreeDaysForMonth(date: Date): Promise<number[]> {
  const tz = sessionTimezone; 
  const icsText = await loadIcsTextFromAssets()

  const startLocal = DateTime.fromObject(
    { year: date.getFullYear(), month: date.getMonth() + 1, day: 1, hour: 0, minute: 0, second: 0, millisecond: 0 },
    { zone: tz }
  );
  const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const endLocal = DateTime.fromObject(
    { year: date.getFullYear(), month: date.getMonth() + 1, day: daysInMonth, hour: 23, minute: 59, second: 59, millisecond: 999 },
    { zone: tz }
  );

const rangeStartUTC = startLocal.toUTC().toJSDate();
const rangeEndUTC = endLocal.toUTC().toJSDate();
  // parse + normalise
  const events = parseIcsAndNormalize(icsText, {
    rangeStartUTC,
    rangeEndUTC,
    includeTransparentAsBusy: false,
    includeTentative: false,
  })

  // options pre "trip" s požiadavkou na 1440 min
  const options = resolveOptions('trip', {
    rangeStartUTC,
    rangeEndUTC,
    minDurationMin: 1440,
  })

  // availability
  const result = getAvailabilityMap([events], { ...options, occasion: 'trip' as const })
  // ... po getAvailabilityMap(...)
  const monthStr = String(date.getMonth() + 1).padStart(2, '0');

  // vezmi iba dni tohto mesiaca a uisti sa, že dateISO je string
  const dayIsos: string[] = (result?.days ?? [])
    .filter(d => d?.hasAvailability === true && typeof d?.dateISO === 'string')
    .map(d => d.dateISO as string)
    .filter(iso => iso.slice(5, 7) === monthStr);

  // ← Set<string>, teda žiadne (string|null)[] chyby
  const base = new Set<string>(dayIsos);

  // DST fix (napr. posledná nedeľa v marci = 1380 min)
  const first = DateTime.fromObject(
    { year: date.getFullYear(), month: date.getMonth() + 1, day: 1 },
    { zone: tz }
  );

  for (let day = 1; day <= daysInMonth; day++) {
    const dStartLocal = first.set({ day }).startOf('day');
    const dNextLocal = dStartLocal.plus({ days: 1 });
    const minutesInDay = Math.round(dNextLocal.diff(dStartLocal, 'minutes').minutes);

    if (minutesInDay !== 1440) {
      const iso = dStartLocal.toISODate();          // string | null
      if (iso && !base.has(iso)) {                  // ⬅️ ošetrené
        const dayStartUTC = dStartLocal.toUTC().toJSDate();
        const dayEndUTC = dNextLocal.toUTC().toJSDate();
        const overlaps = Array.isArray(events) &&
          events.some(ev => ev?.startUTC < dayEndUTC && ev?.endUTC > dayStartUTC);
        if (!overlaps) base.add(iso);
      }
    }
  }

  return Array.from(base)
    .map(iso => parseInt(iso.slice(8, 10), 10))     // iso je string, žiadne „possibly null“
    .sort((a, b) => a - b);
}

const Home = () => {
  const { colors, toggleTheme } = useTheme()
  const [buttonActive, setButtonActive] = useState(false)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [freeDays, setFreeDays] = useState<number[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Mock selected days for demonstration (matching design spec: 14, 16, 18, 20, 22, 23, 25, 26, 27, 28)
  const selectedDays = [16, 18, 20, 22, 23, 25, 26, 27, 28]

  // Mock events for "Your week ahead" section
  const upcomingEvents = [
    { id: '1', title: 'Coffee with Sam', time: 'Sun, Feb 16 · 10:00 AM', dotColor: colorPalette.eventTeal },
    { id: '2', title: 'Team standup', time: 'Sun, Feb 16 · 2:00 PM', dotColor: colorPalette.eventGreen },
  ]

  useEffect(() => {
    let alive = true
    setLoading(true)
    setError(null)
    getFreeDaysForMonth(currentDate)
      .then(days => {
        if (alive) setFreeDays(days)
      })
      .catch(e => {
        if (alive) setError(e?.message || 'Failed to load free days')
      })
      .finally(() => {
        if (alive) setLoading(false)
      })
    return () => {
      alive = false
    }
  }, [currentDate])

  const infoText = useMemo(() => {
    if (loading) return 'Checking your calendar...'
    if (error) return `Error: ${error}`

    const today = new Date()
    const y = currentDate.getFullYear()
    const m = currentDate.getMonth()

    // porovnanie mesiaca na obrazovke vs dnešný mesiac
    const isPastMonth =
      y < today.getFullYear() || (y === today.getFullYear() && m < today.getMonth())
    const isFutureMonth =
      y > today.getFullYear() || (y === today.getFullYear() && m > today.getMonth())
    const isCurrentMonth = !isPastMonth && !isFutureMonth

    let upcomingCount = 0
    if (isPastMonth) {
      upcomingCount = 0
    } else if (isFutureMonth) {
      upcomingCount = freeDays.length
    } else {
      // aktuálny mesiac: rátaj len dni >= dnešok
      const todayDay = today.getDate()
      upcomingCount = freeDays.filter(d => d >= todayDay).length
    }

    if (upcomingCount === 0) return 'No upcoming fully free days this month.'
    if (upcomingCount === 1) return 'You have 1 upcoming fully free day this month.'
    return `You have ${upcomingCount} upcoming fully free days this month.`
  }, [loading, error, freeDays, currentDate])

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <ProfileAvatar text="ME" size={40} />
        <Text style={[styles.appTitle, { color: colors.text }]}>HangOut</Text>
        <TouchableOpacity onPress={toggleTheme}>
          <Ionicons name="settings-outline" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Calendar */}
        <CalendarView
          currentDate={currentDate}
          onChangeMonth={setCurrentDate}
          freeDays={freeDays}
          selectedDays={selectedDays}
        />

        {/* Your week ahead section */}
        <View style={styles.eventsSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Your week ahead</Text>
          {upcomingEvents.map((event) => (
            <EventCard
              key={event.id}
              title={event.title}
              time={event.time}
              dotColor={event.dotColor}
            />
          ))}
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonsContainer}>
          <Button
            title="Create Session"
            icon="calendar"
            variant="filled"
            onPress={() => { setButtonActive(!buttonActive); router.push('/sessionStart'); }}
            style={styles.button}
          />
          <Button
            title="Join Session"
            icon="people"
            variant="outlined"
            onPress={() => { router.push('/sessionStart'); }}
            style={styles.button}
          />
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  appTitle: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    alignItems: 'center',
    paddingBottom: spacing.xxxl,
  },
  eventsSection: {
    width: '90%',
    marginTop: spacing.lg,
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    marginBottom: spacing.md,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: spacing.md,
    gap: spacing.md,
  },
  button: {
    flex: 1,
    minWidth: 0,
  },
})

export default Home