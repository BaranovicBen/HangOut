import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { borderRadius, spacing, screenPadding } from '../theme/spacing';
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
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.cardBackground,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: isDark ? 3 : 6 },
          shadowOpacity: isDark ? 0.10 : 0.12,
          shadowRadius: isDark ? 8 : 16,
          elevation: 4,
        },
      ]}
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
              { color: canGoBack ? colors.text : colors.expiredDay },
            ]}
          >
            ‹
          </Text>
        </TouchableOpacity>
        
        <Text style={[styles.monthTitle, { color: colors.text }]}>
          {getMonthYearString(displayMonth)}
        </Text>
        
        <TouchableOpacity onPress={handleNextMonth} style={styles.navButton}>
          <Text style={[styles.navArrow, { color: colors.text }]}>›</Text>
        </TouchableOpacity>
      </View>
      
      {/* Weekday labels */}
      <View style={styles.weekdayRow}>
        {WEEKDAYS.map((day) => (
          <View key={day} style={[styles.weekdayCell, { width: cellSize }]}>
            <Text style={[styles.weekdayText, { color: colors.textSecondary }]}>
              {day}
            </Text>
          </View>
        ))}
      </View>
      
      {/* 4-week grid */}
      <View style={styles.gridContainer}>{renderWeeks()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: borderRadius.xlarge,
    padding: spacing.xl,
    marginHorizontal: screenPadding,
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
    fontSize: 22,
    fontWeight: '700',
    flex: 1,
    textAlign: 'center',
  },
  weekdayRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: spacing.md,
  },
  weekdayCell: {
    alignItems: 'center',
  },
  weekdayText: {
    fontSize: 11,
    fontWeight: '500',
    textTransform: 'uppercase',
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
