// app/sessionEnd.tsx
import React, { useMemo } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import styles from '@/styles/sessionEndStyles';

// ---- typ parametrov, ktoré posielame zo sessionStart ----
type Params = {
  occasion?: string;
  tz?: string;
  from?: string; // "YYYY-MM-DD"
  to?: string;   // "YYYY-MM-DD"
  count?: string;
  days?: string; // JSON.stringify(string[]) => ["YYYY-MM-DD", ...]
};

// "YYYY-MM-DD" -> { "YYYY-MM": [day,...] }
function groupByMonth(isoDates: string[]): Record<string, number[]> {
  const out: Record<string, number[]> = {};
  for (const iso of isoDates) {
    const [yStr, mStr, dStr] = (iso || '').split('-');
    const y = Number(yStr), m = Number(mStr), d = Number(dStr);
    if (!y || !m || !d) continue;
    const key = `${y}-${String(m).padStart(2, '0')}`;
    (out[key] ||= []).includes(d) ? null : out[key].push(d);
  }
  for (const k in out) out[k].sort((a, b) => a - b);
  return out;
}

// m = 1..12, vráti bunky (null = prázdna bunka pred 1.)
function getCalendarGrid(year: number, month: number): Array<number | null> {
  const start = new Date(year, month - 1, 1);
  const end   = new Date(year, month, 0);
  const offset = (start.getDay() + 6) % 7; // pondelok=0
  const cells: Array<number | null> = Array(offset).fill(null);
  for (let d = 1; d <= end.getDate(); d++) cells.push(d);
  return cells;
}

export default function SessionEnd() {
  const { occasion = '', tz = 'UTC', from = '', to = '', days = '[]' } =
    useLocalSearchParams<Params>();

  // bezpečne rozparsuj pole ISO dátumov
  const isoDays: string[] = useMemo(() => {
    try { return JSON.parse(String(days)) as string[]; } catch { return []; }
  }, [days]);

  const freeByMonth = useMemo(() => groupByMonth(isoDays), [isoDays]);
  const monthKeys   = useMemo(() => Object.keys(freeByMonth).sort(), [freeByMonth]); // "YYYY-MM"

  // 1 kalendár pre daný mesiac
  const renderCalendar = (year: number, month: number, freeDays: number[]) => {
    const key = `${year}-${String(month).padStart(2, '0')}`;
    const cells = getCalendarGrid(year, month);
    const monthName = new Date(year, month - 1, 1).toLocaleString('default', { month: 'long' });

    return (
      <View key={key} style={styles.monthBlock}>
        <Text style={styles.monthTitle}>{monthName} {year}</Text>
        <View style={styles.divider} />
        <View style={styles.calendarHeader}>
          {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map((d) => (
            <Text key={d} style={styles.dayName}>{d}</Text>
          ))}
        </View>
        <View style={styles.calendarGrid}>
          {cells.map((day, idx) => (
            <View key={`${key}-${idx}`} style={styles.dayCell}>
              {day != null ? (
                <View
                  style={[
                    styles.circle,
                    freeDays.includes(day) && styles.highlightedCircle,
                  ]}
                >
                  <Text
                    style={[
                      styles.dayNumber,
                      freeDays.includes(day) && styles.highlightedText,
                    ]}
                  >
                    {day}
                  </Text>
                </View>
              ) : (
                <Text style={styles.dayNumber}> </Text>
              )}
            </View>
          ))}
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      {/* Nav */}
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => router.push('/settings')}>
          <Text style={styles.icon}>⚙️</Text>
        </TouchableOpacity>
        <Text style={styles.navTitle}>HangOut</Text>
        <TouchableOpacity onPress={() => router.push('/account')}>
          <Text style={styles.icon}>👤</Text>
        </TouchableOpacity>
      </View>

      {/* Header */}
      <Text style={styles.header}>
        {occasion ? `\tFor ${occasion} • ` : ''}{from} → {to} ({tz})
      </Text>
      <Text style={styles.emoji}>{isoDays.length ? '🎉' : '🤷‍♂️'}</Text>

      {monthKeys.length === 0 ? (
        <Text style={styles.noData}>No available days in this range.</Text>
      ) : (
        monthKeys.map((key) => {
          const [yStr, mStr] = key.split('-');
          const year  = Number(yStr);
          const month = Number(mStr); // 1..12
          const free  = freeByMonth[key] || [];
          return renderCalendar(year, month, free);
        })
      )}

      <TouchableOpacity style={styles.endButton} onPress={() => router.push('/home')}>
        <Text style={styles.endButtonText}>End Session</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}