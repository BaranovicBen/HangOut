import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from '@/contexts/ThemeContext'
import { spacing, borderRadius } from '@/styles/spacing'
import { typography } from '@/styles/typography'
import { colors as colorPalette } from '@/styles/colors'

const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

type Props = {
  currentDate: Date
  onChangeMonth: (newDate: Date) => void
  freeDays: number[]
  selectedDays?: number[] // Days to highlight as selected (filled circles)
}

const CalendarView: React.FC<Props> = ({ currentDate, onChangeMonth, freeDays, selectedDays = [] }) => {
  const { colors } = useTheme()
  const today = new Date()
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const firstDay = new Date(year, month, 1).getDay()      // 0=Sun..6=Sat
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const todayDate = today.getDate()
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month

  const renderCalendar = () => {
    const calendar = []
    let currentDay = 1
    const dayOffset = (firstDay + 6) % 7                  // posun pre Mon..Sun
    const totalCells = dayOffset + daysInMonth
    const totalWeeks = Math.ceil(totalCells / 7)

    for (let week = 0; week < totalWeeks; week++) {
      const weekRow: React.ReactNode[] = []
      for (let day = 0; day < 7; day++) {
        if ((week === 0 && day < dayOffset) || currentDay > daysInMonth) {
          weekRow.push(<View style={styles.dayCell} key={`empty-${week}-${day}`} />)
        } else {
          const dateForCell = new Date(year, month, currentDay)
          const isPast = dateForCell < new Date(today.getFullYear(), today.getMonth(), today.getDate())
          const isToday = isCurrentMonth && currentDay === todayDate
          const isSelected = selectedDays.includes(currentDay) && !isPast

          // Determine cell styling
          let cellStyle = styles.dayCell
          let textColor = colors.textSecondary

          if (isSelected) {
            // Filled circle for selected days
            cellStyle = [styles.dayCell, styles.selectedDay]
            textColor = colors.text
          } else if (isToday) {
            // Outlined circle for current day
            cellStyle = [styles.dayCell, styles.todayDay]
            textColor = colorPalette.primary
          } else if (!isPast) {
            textColor = colors.textSecondary
          }

          weekRow.push(
            <View key={`${week}-${day}`} style={cellStyle}>
              <Text
                style={[
                  styles.dayText,
                  { color: textColor },
                  isPast && { opacity: 0.4 },
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
    <View style={[styles.calendarWrapper, { backgroundColor: colors.card }]}>
      <View style={styles.calendarHeader}>
        <TouchableOpacity
          onPress={() => onChangeMonth(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}
        >
          <Ionicons name="chevron-back" size={24} color={colors.text} />
        </TouchableOpacity>

        <Text style={[styles.monthLabel, { color: colors.text }]}>
          {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
        </Text>

        <TouchableOpacity
          onPress={() => onChangeMonth(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}
        >
          <Ionicons name="chevron-forward" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.weekRow}>
        {weekdays.map((day) => (
          <Text style={[styles.weekday, { color: colors.textSecondary }]} key={day}>
            {day}
          </Text>
        ))}
      </View>

      {renderCalendar()}
    </View>
  )
}

const styles = StyleSheet.create({
  calendarWrapper: {
    borderRadius: borderRadius.xxl,
    padding: spacing.md,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: spacing.md,
  },
  monthLabel: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: spacing.xs,
  },
  weekday: {
    fontSize: typography.sizes.sm,
    width: 36,
    textAlign: 'center',
    fontWeight: typography.weights.medium,
  },
  dayCell: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginVertical: spacing.xs,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayText: {
    fontSize: typography.sizes.sm,
  },
  selectedDay: {
    backgroundColor: colorPalette.primary,
  },
  todayDay: {
    borderWidth: 2,
    borderColor: colorPalette.primary,
  },
})

export default CalendarView