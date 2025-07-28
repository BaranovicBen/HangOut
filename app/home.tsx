import { router } from 'expo-router'
import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native'

const screenHeight = Dimensions.get('window').height

const freeDays = [6, 10, 11, 14, 19, 20, 29, 31]
const daysInMonth = 31
const startDay = 1




const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const Home = () => {
  const [buttonActive, setButtonActive] = useState(false)
  const dynamicText = 'You have nothing planned on these days'
  const [currentDate, setCurrentDate] = useState(new Date())

  const renderCalendar = () => {
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const calendar = []
  let currentDay = 1
  let dayOffset = (firstDay + 6) % 7

  for (let week = 0; week < 6; week++) {
    const weekRow = []
    for (let day = 0; day < 7; day++) {
      if ((week === 0 && day < dayOffset) || currentDay > daysInMonth) {
        weekRow.push(
          <View
            style={styles.dayCell}
            key={`empty-${week}-${day}`}
          />
        )
      } else {
        const isFree = freeDays.includes(currentDay)
        weekRow.push(
          <View
            key={`${week}-${day}`}
            style={[styles.dayCell, isFree && styles.freeDay]}
          >
            <Text style={[styles.dayText, isFree && styles.freeDayText]}>
              {currentDay}
            </Text>
          </View>
        )
        currentDay++
      }
    }
    calendar.push(
      <View style={styles.weekRow} key={`week-${week}`}>
        {weekRow}
      </View>
    )
  }

  return calendar
 }

  return (
    <View style={styles.container}>
      {/* Navigation bar */}
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => router.push('/settings')}>
            <Text style={styles.sideIcon}>⚙️</Text>
        </TouchableOpacity>
            <Text style={styles.navTitle}>HangOut</Text>
        <TouchableOpacity onPress={()=> router.push('/account')}>
            <Text style={styles.sideIcon}>👤</Text>
        </TouchableOpacity>
      </View>

      {/* Info text */}
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>{dynamicText}</Text>
      </View>

      {/* Calendar */}
      <View style={styles.calendarWrapper}>
        <View style={styles.calendarHeader}>
        <TouchableOpacity onPress={() => 
          setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))
        }>
          <Text style={styles.arrow}>{'<'}</Text>
        </TouchableOpacity>
      <Text style={styles.monthLabel}>
        {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
      </Text>
        <TouchableOpacity onPress={() =>
          setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))
        }>
          <Text style={styles.arrow}>{'>'}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.calendarDivider} />

        <View style={styles.weekRow}>
          {weekdays.map((day) => (
            <Text style={styles.weekday} key={day}>
              {day}
            </Text>
          ))}
        </View>

        {renderCalendar()}
      </View>

      {/* Button */}
      <TouchableOpacity
        style={[
          styles.button,
          buttonActive ? styles.buttonActive : styles.buttonInactive,
        ]}
        onPress={() => setButtonActive(!buttonActive)}
      >
        <Text style={styles.buttonText}>Find time...</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  navBar: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    alignItems: 'center',
    marginBottom: 8,
  },
  navTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  sideIcon: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  infoBox: {
    maxWidth: '85%',
    minHeight: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  infoText: {
    fontSize: 16,
    textAlign: 'center',
  },
  calendarWrapper: {
    backgroundColor: '#000',
    borderRadius: 24,
    padding: 14,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    marginTop: 8,
    transform: [{ scale: 0.9 }],
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  arrow: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
      marginHorizontal: 30,
  },
  monthLabel: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 4,
  },
  weekday: {
    color: '#888',
    fontSize: 14,
    width: 32,
    textAlign: 'center',
  },
  dayCell: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginVertical: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayText: {
    color: 'white',
    fontSize: 14,
  },
  freeDay: {
    backgroundColor: '#00FF00',
  },
  freeDayText: {
    color: '#000',
    fontWeight: 'bold',
  },
  button: {
    marginTop: 10,
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 12,
  },
  buttonInactive: {
    backgroundColor: '#000',
  },
  buttonActive: {
    backgroundColor: '#00FF00',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: '600',
  },
 calendarDivider: {
  width: '100%',
  height: 1,
  backgroundColor: 'white',
  marginVertical: 8,
},
})

export default Home