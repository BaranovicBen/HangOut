import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../theme/ThemeProvider';
import { borderRadius, spacing, screenPadding, shadows } from '../theme/spacing';
import { get4WeekGrid, toISODate, isPastDate, isPastMonth, getMonthYearString } from '../utils/dates';

interface CalendarFourWeekCardProps {
  freeDays: Set<string>;
}

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const CalendarFourWeekCard: React.FC<CalendarFourWeekCardProps> = ({ freeDays }) => {
  const { colors, isDark } = useTheme();
  const [displayMonth, setDisplayMonth] = useState(new Date());
  
  const today = new Date();
  const gridDates = get4WeekGrid(today);
  
  // Get display month info for navigation
  const displayMonthNum = displayMonth.getMonth();
  const displayYear = displayMonth.getFullYear();
  
  const canGoBack = !isPastMonth(displayYear, displayMonthNum);
  
  const handlePrevMonth = () => {
    if (!canGoBack) return;
    const newDate = new Date(displayMonth);
    newDate.setMonth(displayMonth.getMonth() - 1);
    setDisplayMonth(newDate);
  };
  
  const handleNextMonth = () => {
    const newDate = new Date(displayMonth);
    newDate.setMonth(displayMonth.getMonth() + 1);
    setDisplayMonth(newDate);
  };
  
  const screenWidth = Dimensions.get('window').width;
  const availableWidth = screenWidth - screenPadding * 2 - spacing.xl * 2;
  const cellSize = Math.floor(availableWidth / 7) - 4;
  
  const renderWeeks = () => {
    const weeks: React.ReactNode[] = [];
    
    for (let weekIndex = 0; weekIndex < 4; weekIndex++) {
      const weekDays: React.ReactNode[] = [];
      
      for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
        const dateIndex = weekIndex * 7 + dayIndex;
        const date = gridDates[dateIndex];
        const dateStr = toISODate(date);
        const dayNum = date.getDate();
        
        const isExpired = isPastDate(date);
        const isFree = freeDays.has(dateStr) && !isExpired;
        
        weekDays.push(
          <View
            key={`day-${dateIndex}`}
            style={[
              styles.dayCell,
              { width: cellSize, height: cellSize },
              isFree && { backgroundColor: colors.freeDayIndicator },
            ]}
          >
            <Text
              style={[
                styles.dayText,
                { color: isFree ? '#FFFFFF' : colors.text },
                isExpired && {
                  color: colors.expiredDay,
                  opacity: 0.4,
                },
              ]}
            >
              {dayNum}
            </Text>
          </View>
        );
      }
      
      weeks.push(
        <View key={`week-${weekIndex}`} style={styles.weekRow}>
          {weekDays}
        </View>
      );
    }
    
    return weeks;
  };
  
  return (
    <View style={[styles.cardContainer, shadows.medium]}>
      <LinearGradient
        colors={[colors.gradientStart, colors.gradientEnd]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientHeader}
      >
        {/* Month navigation */}
        <View style={styles.monthNav}>
          <TouchableOpacity
            onPress={handlePrevMonth}
            disabled={!canGoBack}
            style={styles.navButton}
          >
            <Text
              style={[
                styles.navArrow,
                { color: canGoBack ? '#FFFFFF' : 'rgba(255, 255, 255, 0.4)' },
              ]}
            >
              ‹
            </Text>
          </TouchableOpacity>
          
          <Text style={styles.monthTitle}>
            {getMonthYearString(displayMonth)}
          </Text>
          
          <TouchableOpacity onPress={handleNextMonth} style={styles.navButton}>
            <Text style={[styles.navArrow, { color: '#FFFFFF' }]}>›</Text>
          </TouchableOpacity>
        </View>
        
        {/* Weekday labels */}
        <View style={styles.weekdayRow}>
          {WEEKDAYS.map((day) => (
            <View key={day} style={[styles.weekdayCell, { width: cellSize }]}>
              <Text style={styles.weekdayText}>
                {day}
              </Text>
            </Text>
          </View>
        ))}
      </View>
      </LinearGradient>
      
      {/* Calendar Grid in white container */}
      <View style={[styles.calendarBody, { backgroundColor: colors.cardBackground }]}>
        <View style={styles.gridContainer}>{renderWeeks()}</View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: borderRadius.xlarge,
    marginHorizontal: screenPadding,
    overflow: 'hidden',
  },
  gradientHeader: {
    padding: spacing.xl,
    paddingBottom: spacing.lg,
  },
  calendarBody: {
    padding: spacing.xl,
    paddingTop: spacing.lg,
  },
  monthNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  navButton: {
    padding: spacing.sm,
    minWidth: 40,
    alignItems: 'center',
  },
  navArrow: {
    fontSize: 32,
    fontWeight: '300',
  },
  monthTitle: {
    fontSize: 24,
    fontWeight: '700',
    flex: 1,
    textAlign: 'center',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  weekdayRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: spacing.sm,
  },
  weekdayCell: {
    alignItems: 'center',
  },
  weekdayText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
    color: 'rgba(255, 255, 255, 0.9)',
    letterSpacing: 0.5,
  },
  gridContainer: {
    gap: spacing.sm,
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: spacing.sm,
  },
  dayCell: {
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
