import { router } from 'expo-router'
import React, { useState } from 'react'
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'


const freeDays = [6, 10, 11, 14, 19, 20, 29, 31]


const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const Home = () => {
  const [buttonActive, setButtonActive] = useState(false)
  const dynamicText = 'You have nothing planned on these days'
  const [currentDate, setCurrentDate] = useState(new Date())
  const [showPicker, setShowPicker] = useState(false)
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth())
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear())
  const monthLabels = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ]


  const renderCalendar = () => {
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const calendar = []
  let currentDay = 1
  let dayOffset = (firstDay + 6) % 7
  const totalCells = dayOffset + daysInMonth
  const totalWeeks = Math.ceil(totalCells / 7)
  
  for (let week = 0; week < totalWeeks; week++){
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
      const today = new Date()
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
  <View style={styles.container}>
    {/* Navigation bar */}
    <View style={styles.navBar}>
      <TouchableOpacity onPress={() => router.push('/settings')}>
        <Text style={styles.sideIcon}>⚙️</Text>
      </TouchableOpacity>
      <Text style={styles.navTitle}>HangOut</Text>
      <TouchableOpacity onPress={() => router.push('/account')}>
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
        <TouchableOpacity onPress={() => {
              setSelectedMonth(currentDate.getMonth())
              setSelectedYear(currentDate.getFullYear())
              setShowPicker(true)
            }}
          >
          <Text style={styles.monthLabel}>
            {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
          </Text>
        </TouchableOpacity>
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
      {showPicker && (
  <View style={styles.overlay} pointerEvents="box-none">
    <Pressable
      style={styles.dismissArea}
      onPress={() => setShowPicker(false)}
    />

    <View
      style={styles.pickerBox}
      onStartShouldSetResponder={() => true}
    >
      {/* Month picker */}
      <Text style={styles.pickerLabel}>Choose month</Text>
      <View style={styles.pickerRow}>
        {monthLabels.map((label, index) => (
          <TouchableOpacity
            key={label}
            style={[
              styles.pickerOption,
              selectedMonth === index && styles.selectedOption,
            ]}
            onPress={() => setSelectedMonth(index)}
          >
            <Text style={styles.monthText}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Year picker */}
      <Text style={styles.pickerLabel}>Choose year</Text>
      <View style={styles.pickerRow}>
        {Array.from({ length: 10 }).map((_, i) => {
          const year = new Date().getFullYear() + i
          return (
            <TouchableOpacity
              key={year}
              onPress={() => setSelectedYear(year)}
              style={[
                styles.pickerOption,
                selectedYear === year && styles.selectedOption,
              ]}
            >
              <Text style={styles.pickerText}>{year}</Text>
            </TouchableOpacity>
          )
        })}
      </View>

      {/* Go button */}
      <TouchableOpacity
        style={styles.confirmButton}
        onPress={() => {
          setCurrentDate(new Date(selectedYear, selectedMonth, 1))
          setShowPicker(false)
        }}
      >
        <Text style={styles.confirmButtonText}>Go</Text>
      </TouchableOpacity>
    </View>
  </View>
)}

      {renderCalendar()}
    </View>

    {/* Button */}
    <View style={styles.buttonWrapper}>
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
    justifyContent: 'flex-start',
    marginBottom: 24,
    marginTop: 8,
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
  buttonWrapper: {
    marginTop: 'auto',
    alignItems: 'center',
    marginBottom: 120,
  },
  button: {
    paddingVertical: 18,
    paddingHorizontal: 48,
    borderRadius: 16,
    minWidth: '70%',
    alignItems: 'center',
  },
  buttonInactive: {
    backgroundColor: '#000',
  },
  buttonActive: {
    backgroundColor: '#00FF00',
  },
  buttonText: {
    fontSize: 30,
    color: 'white',
    fontWeight: '600',
  },
 calendarDivider: {
  width: '100%',
  height: 1,
  backgroundColor: 'white',
  marginVertical: 8,
},
overlay: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 999,
},
dismissArea: {
  position: 'absolute',
  top: -180,
  left: -30,
  height: 1000,
  width: 420,
},
pickerBox: {
  backgroundColor: '#ced3ceff',
  padding: 16,
  borderRadius: 12,
  width: '85%',
  opacity: 0.97,
  alignItems: 'center',
},
pickerLabel: {
  fontWeight: 'bold',
  fontSize: 16,
  marginTop: 8,
  marginBottom: 4,
},
pickerRow: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'center',
  marginBottom: 10,
},
pickerOption: {
  backgroundColor: '#989898ff',
  padding: 8,
  borderRadius: 6,
  margin: 4,
},
pickerText: {
  fontSize: 14,
},
confirmButton: {
  backgroundColor: '#000',
  paddingVertical: 10,
  paddingHorizontal: 24,
  borderRadius: 10,
},
confirmButtonText: {
  color: 'white',
  fontSize: 16,
  fontWeight: 'bold',
},
selectedOption: {
  backgroundColor: '#00FF00',
},
})

export default Home