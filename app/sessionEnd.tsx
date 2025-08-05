import styles from '@/styles/sessionEndStyles';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

const SessionEnd = () => {
  const freeDates = {
    '2025-07': [10, 11, 19, 20],
    '2025-08': [8, 9, 16],
  };

  
  const getCalendarGrid = (year, month) => {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0); 
    const startDay = (startDate.getDay() + 6) % 7; 
    const daysInMonth = endDate.getDate();

    const days = [];
    for (let i = 0; i < startDay; i++) {
      days.push(null); 
    }
    for (let d = 1; d <= daysInMonth; d++) {
      days.push(d);
    }
    return days;
  };

  const renderCalendar = (year, month) => {
    const key = `${year}-${month.toString().padStart(2, '0')}`;
    const days = getCalendarGrid(year, month);
    const free = freeDates[key] || [];
    const monthName = new Date(year, month - 1).toLocaleString('default', { month: 'long' });

    return (
      <View key={key} style={styles.monthBlock}>
        <Text style={styles.monthTitle}>{monthName}</Text>
        <View style={styles.divider} />
        <View style={styles.calendarHeader}>
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
            <Text key={d} style={styles.dayName}>{d}</Text>
          ))}
        </View>
        <View style={styles.calendarGrid}>
          {days.map((day, idx) => (
            <View key={idx} style={styles.dayCell}>
              {day ? (
                <View style={[
                  styles.circle,
                  free.includes(day) && styles.highlightedCircle
                ]}>
                  <Text style={[
                    styles.dayNumber,
                    free.includes(day) && styles.highlightedText
                  ]}>{day}</Text>
                </View>
              ) : <Text style={styles.dayNumber}></Text>}
            </View>
          ))}
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <View style={styles.navBar}>
        <TouchableOpacity><Text style={styles.icon}>⚙️</Text></TouchableOpacity>
        <Text style={styles.navTitle}>HangOut</Text>
        <TouchableOpacity><Text style={styles.icon}>👤</Text></TouchableOpacity>
      </View>

      <View style={styles.partyBubble}>
        <Text style={styles.bubbleText}>👤 👤 👤</Text>
      </View>

      <Text style={styles.header}>Found your free days!</Text>
      <Text style={styles.emoji}>🎉🎉🎉</Text>

      {renderCalendar(2025, 7)}
      {renderCalendar(2025, 8)}

      <TouchableOpacity style={styles.endButton} onPress={() => router.push("/Home")}>
        <Text style={styles.endButtonText}>End Session</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SessionEnd;