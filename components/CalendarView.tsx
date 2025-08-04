import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import styles from '../styles/homeStyles'

const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const freeDays = [6, 10, 11, 14, 19, 20, 29, 31]

const CalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date())

  const today = new Date()
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const renderCalendar = () => {
    const calendar = []
    let currentDay = 1
    const dayOffset = (firstDay + 6) % 7
    const totalCells = dayOffset + daysInMonth
    const totalWeeks = Math.ceil(totalCells / 7)

    for (let week = 0; week < totalWeeks; week++) {
      const weekRow = []
      for (let day = 0; day < 7; day++) {
        if ((week === 0 && day < dayOffset) || currentDay > daysInMonth) {
          weekRow.push(<View style={styles.dayCell} key={`empty-${week}-${day}`} />)
        } else {
          const dateForCell = new Date(year, month, currentDay)
          const isPast = dateForCell < new Date(today.getFullYear(), today.getMonth(), today.getDate())
          const isFree = !isPast && freeDays.includes(currentDay)

          weekRow.push(
            <View
              key={`${week}-${day}`}
              style={[styles.dayCell, isFree && styles.freeDay]}
            >
              <Text
                style={[
                  styles.dayText,
                  isFree && styles.freeDayText,
                  isPast && { opacity: 0.4, color: '#FFFFFF' },
                ]}
              >
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
    <View style={styles.calendarWrapper}>
      <View style={styles.calendarHeader}>
        <TouchableOpacity
          onPress={() =>
            setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))
          }
        >
          <Text style={styles.arrow}>{'<'}</Text>
        </TouchableOpacity>

        <Text style={styles.monthLabel}>
          {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
        </Text>

        <TouchableOpacity
          onPress={() =>
            setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))
          }
        >
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
  )
}

export default CalendarView
