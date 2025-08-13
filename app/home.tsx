import React, { useEffect, useMemo, useState } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { router } from 'expo-router'
import CalendarView from '@/components/CalendarView'
import styles from '@/styles/homeStyles'
import { DateTime } from 'luxon';
import {sessionTimezone} from '../config/user.settings.json';


import * as FileSystem from 'expo-file-system'
import { Asset } from 'expo-asset'

// utils – tieto súbory už máš
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

const tz = sessionTimezone; // alebo z configs

// Spočítaj celé voľné dni (1440 min) pre daný mesiac cez "trip"
async function getFreeDaysForMonth(date: Date): Promise<number[]> {
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

  // jedinečné dni, ktoré majú dostupnosť (tzn. celý deň voľný, keďže minDuration=1440)
  const uniqueIsoDays = Array.from(
    new Set((result?.days || []).filter(d => d.hasAvailability).map(d => d.dateISO))
  )

  // pre mapovanie do kalendára vrátime čísla dňa (1..31)
  return uniqueIsoDays
    .map(iso => {
      // iso: YYYY-MM-DD
      const parts = iso.split('-')
      return parseInt(parts[2], 10) // "06" -> 6
    })
    .sort((a, b) => a - b)
}

const Home = () => {
  const [buttonActive, setButtonActive] = useState(false)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [freeDays, setFreeDays] = useState<number[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

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
    <View style={styles.container}>
      {/* Navigation Bar */}
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => router.push('/settings')}>
          <Text style={styles.sideIcon}>⚙️</Text>
        </TouchableOpacity>
        <Text style={styles.navTitle}>HangOut</Text>
        <TouchableOpacity onPress={() => router.push('/account')}>
          <Text style={styles.sideIcon}>👤</Text>
        </TouchableOpacity>
      </View>

      {/* Info Text */}
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>{infoText}</Text>
      </View>

      {/* Calendar */}
      <CalendarView
        currentDate={currentDate}
        onChangeMonth={setCurrentDate}
        freeDays={freeDays}
      />

      {/* Button */}
      <TouchableOpacity
        style={[
          styles.button,
          buttonActive ? styles.buttonActive : styles.buttonInactive,
        ]}
        onPress={() => { setButtonActive(!buttonActive); router.push('/sessionStart'); }}
      >
        <Text style={styles.buttonText}>Find time...</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Home