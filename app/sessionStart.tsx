import React, { useMemo, useState } from 'react';
import { router } from 'expo-router';
import {
  View, Text, TouchableOpacity, ScrollView, Switch, Alert, Modal, StyleSheet, Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from '@/styles/sessionStartStyles';

import userSettings from '@/config/user.settings.json';
import { listOccasions, buildOptionsFromForm, getSessionTimezone } from '@/utils/settings.js';
import { DateTime } from 'luxon';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import testIcs from '@/assets/test.ics';

import { parseIcsAndNormalize } from '@/utils/parseiCal.mjs';
import { getAvailabilityMap } from '@/utils/getAvailabilityMap.js';

/* ----------------- helpers ----------------- */
async function loadIcsTextFromAssets(): Promise<string> {
  const asset = Asset.fromModule(testIcs);
  await asset.downloadAsync();
  const uri = asset.localUri ?? asset.uri;
  return FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.UTF8 });
}
function toISODate(d: Date, tz: string) {
  return DateTime.fromJSDate(d, { zone: tz }).toISODate()!;
}
/* --------------- SwiftUI-like dropdown --------------- */
type MenuProps = { value: string; options: string[]; onSelect: (v: string) => void; label?: string };
const TypeMenu: React.FC<MenuProps> = ({ value, options, onSelect, label = 'Type' }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Text style={styles.filterLabel}>{label}</Text>
      <TouchableOpacity style={local.trigger} onPress={() => setOpen(true)}>
        <Text style={local.triggerValue}>{value || 'Choose type…'}</Text>
        <Text style={local.chevron}>▾</Text>
      </TouchableOpacity>

      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <TouchableOpacity style={local.backdrop} activeOpacity={1} onPress={() => setOpen(false)} />
        <View style={local.sheet}>
          <Text style={local.sheetTitle}>{label}</Text>
          <View style={local.menuList}>
            {options.map(opt => {
              const selected = opt === value;
              return (
                <TouchableOpacity
                  key={opt}
                  style={[local.menuItem, selected && local.menuItemSel]}
                  onPress={() => { onSelect(opt); setOpen(false); }}
                >
                  <Text style={[local.menuText, selected && local.menuTextSel]}>{opt}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <TouchableOpacity style={local.closeBtn} onPress={() => setOpen(false)}>
            <Text style={local.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
};
/* ----------------------------------------------------- */

const SessionStart = () => {
  // timezone z configu (default v settings: UTC)
  const tz = getSessionTimezone({ sessionTimezone: (userSettings as any).sessionTimezone });

  // limity na výber dátumu (dnes..dnes+2y) – v sessionTimezone
  const todayLocal = DateTime.now().setZone(tz).startOf('day');
  const maxLocal   = todayLocal.plus({ years: 2 }).endOf('day');
  const minDate = todayLocal.toJSDate();
  const maxDate = maxLocal.toJSDate();

  // typy udalostí z defaults + user overrides
  const occList = useMemo(() => listOccasions(userSettings.occasions), []);
  const [occasion, setOccasion] = useState(occList.includes('night') ? 'night' : occList[0] || 'lunch');
  const isNight = (occasion || '').toLowerCase().includes('night');
  const [nextMorningFree, setNextMorningFree] = useState(false);

  // dátumy (po tapnutí sa otvorí DateTimePicker)
  const initFrom = todayLocal.toJSDate();
  const initTo   = DateTime.max(todayLocal.endOf('month'), todayLocal).toJSDate();

  const [fromDate, setFromDate] = useState<Date>(initFrom);
  const [toDate, setToDate]     = useState<Date>(initTo);

  const [openFrom, setOpenFrom] = useState(false);
  const [openTo, setOpenTo]     = useState(false);
  const [tempFrom, setTempFrom] = useState<Date>(initFrom);
  const [tempTo, setTempTo]     = useState<Date>(initTo);

  // friends placeholder
  const [friends] = useState<string[]>(['@Janni33','@pinkIEwinkie','@alleexx1']);
  const [party, setParty] = useState<string[]>([]);
  const toggleFriend = (friend: string) =>
    setParty((prev) => prev.includes(friend) ? prev.filter(x => x !== friend) : [...prev, friend]);

  function validateRange(f: Date, t: Date): string | null {
    const fDT = DateTime.fromJSDate(f, { zone: tz }).startOf('day');
    const tDT = DateTime.fromJSDate(t, { zone: tz }).startOf('day');

    if (fDT < todayLocal) return 'Start date cannot be in the past.';
    if (tDT < todayLocal) return 'End date cannot be in the past.';
    if (tDT > maxLocal.startOf('day')) return 'End date cannot be more than 2 years ahead.';
    if (fDT > tDT) return 'Start date must be before or the same as end date.';
    return null;
  }

  async function onRun() {
    const err = validateRange(fromDate, toDate);
    if (err) { Alert.alert('Invalid dates', err); return; }

    try {
      // From/To v sessionTimezone → UTC range (exkluzívny koniec = To + 1 deň 00:00)
      const startLocal = DateTime.fromJSDate(fromDate, { zone: tz }).startOf('day');
      const endLocalExclusive = DateTime.fromJSDate(toDate, { zone: tz }).plus({ days: 1 }).startOf('day');

      const rangeStartUTC = startLocal.toUTC().toJSDate();
      const rangeEndUTC   = endLocalExclusive.toUTC().toJSDate();

      const options = buildOptionsFromForm(
        { occasion, nextMorningFree, rangeStartUTC, rangeEndUTC, sessionTimezone: tz },
        userSettings
      );

      const icsText = await loadIcsTextFromAssets();
      const events = parseIcsAndNormalize(icsText, {
        rangeStartUTC, rangeEndUTC, includeTransparentAsBusy: false, includeTentative: false,
      });

      const occKey = (options.occasion as 'breakfast'|'lunch'|'dinner'|'night'|'trip');
      const result = getAvailabilityMap([events], { ...options, occasion: occKey });

      const daysIso = Array.from(new Set(
        (result?.days ?? [])
          .filter(d => d?.hasAvailability && typeof d?.dateISO === 'string')
          .map(d => d.dateISO as string)
      )).sort();

      // presmeruj na sessionEnd
      router.push({
        pathname: '/sessionEnd',
        params: {
          occasion: occasion,
          tz,
          from: toISODate(fromDate, tz),
          to:   toISODate(toDate, tz),
          count: String(daysIso.length),
          days: JSON.stringify(daysIso),
        },
      });
    } catch (e:any) {
      Alert.alert('Error', e?.message ?? 'Failed to compute availability');
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* NavBar */}
        <View style={styles.navBar}>
          <TouchableOpacity onPress={() => router.push('/home')}>
            <Text style={styles.sideIcon}>🏠</Text>
          </TouchableOpacity>
          <Text style={styles.navTitle}>HangOut</Text>
          <TouchableOpacity onPress={() => router.push('/account')}>
            <Text style={styles.sideIcon}>👤</Text>
          </TouchableOpacity>
        </View>

        {/* Filters */}
        <View style={styles.filterBox}>
          {/* Type */}
          <View style={{ marginBottom: 16 }}>
            <TypeMenu value={occasion} options={occList} onSelect={setOccasion} />
          </View>

          {/* From */}
          <View style={styles.filterRow}>
            <Text style={styles.filterLabel}>From</Text>
            <TouchableOpacity
              style={local.trigger}
              onPress={() => { setTempFrom(fromDate); setOpenFrom(true); }}
            >
              <Text style={local.triggerValue}>{toISODate(fromDate, tz)}</Text>
              <Text style={local.chevron}>📅</Text>
            </TouchableOpacity>
          </View>
          <Modal visible={openFrom} transparent animationType="fade" onRequestClose={() => setOpenFrom(false)}>
            <TouchableOpacity style={local.backdrop} activeOpacity={1} onPress={() => setOpenFrom(false)} />
            <View style={local.sheet}>
              <Text style={local.sheetTitle}>Choose From</Text>
              <DateTimePicker
                value={tempFrom}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
                onChange={(_, d) => d && setTempFrom(d)}
                minimumDate={minDate}
                maximumDate={maxDate}
              />
              <View style={local.row}>
                <TouchableOpacity style={local.closeBtn} onPress={() => setOpenFrom(false)}>
                  <Text style={local.closeText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[local.closeBtn, { backgroundColor: '#3656f3' }]}
                  onPress={() => {
                    // enforce From ≤ To and limits
                    let nextFrom = tempFrom;
                    if (nextFrom < minDate) nextFrom = minDate;
                    if (nextFrom > maxDate) nextFrom = maxDate;
                    if (nextFrom > toDate) setToDate(nextFrom);
                    setFromDate(nextFrom);
                    setOpenFrom(false);
                  }}
                >
                  <Text style={[local.closeText, { fontWeight: '700' }]}>Confirm</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          {/* To */}
          <View style={styles.filterRow}>
            <Text style={styles.filterLabel}>To</Text>
            <TouchableOpacity
              style={local.trigger}
              onPress={() => { setTempTo(toDate); setOpenTo(true); }}
            >
              <Text style={local.triggerValue}>{toISODate(toDate, tz)}</Text>
              <Text style={local.chevron}>📅</Text>
            </TouchableOpacity>
          </View>
          <Modal visible={openTo} transparent animationType="fade" onRequestClose={() => setOpenTo(false)}>
            <TouchableOpacity style={local.backdrop} activeOpacity={1} onPress={() => setOpenTo(false)} />
            <View style={local.sheet}>
              <Text style={local.sheetTitle}>Choose To</Text>
              <DateTimePicker
                value={tempTo}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
                onChange={(_, d) => d && setTempTo(d)}
                minimumDate={minDate}
                maximumDate={maxDate}
              />
              <View style={local.row}>
                <TouchableOpacity style={local.closeBtn} onPress={() => setOpenTo(false)}>
                  <Text style={local.closeText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[local.closeBtn, { backgroundColor: '#3656f3' }]}
                  onPress={() => {
                    // enforce From ≤ To and limits
                    let nextTo = tempTo;
                    if (nextTo < minDate) nextTo = minDate;
                    if (nextTo > maxDate) nextTo = maxDate;
                    if (nextTo < fromDate) setFromDate(nextTo);
                    setToDate(nextTo);
                    setOpenTo(false);
                  }}
                >
                  <Text style={[local.closeText, { fontWeight: '700' }]}>Confirm</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          {/* Night-only toggle */}
          {isNight && (
            <View style={styles.filterRow}>
              <Text style={styles.filterLabel}>Next morning free</Text>
              <Switch value={nextMorningFree} onValueChange={setNextMorningFree} />
            </View>
          )}
        </View>

        {/* Friends (placeholder) */}
        <Text style={styles.sectionTitle}>Current party</Text>
        <View style={styles.partyBubble}>
          <Text style={styles.bubbleText}>👤{party.map(() => ' 👤').join('')}</Text>
        </View>

        <View style={styles.friendsBox}>
          <Text style={styles.sectionTitle}>Add Friends</Text>
          <View style={styles.friendsList}>
            {friends.map((friend) => (
              <TouchableOpacity key={friend} onPress={() => toggleFriend(friend)} style={styles.friendItem}>
                <Text style={styles.friendText}>👤 {friend}</Text>
                <Text style={styles.addRemove}>{party.includes(friend) ? '❌' : '➕'}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* GO */}
      <TouchableOpacity style={styles.floatingButton} onPress={onRun}>
        <Text style={styles.buttonText}>GO!</Text>
      </TouchableOpacity>
    </View>
  );
};

const local = StyleSheet.create({
  trigger: {
    flex: 1,
    backgroundColor: '#b4b4b4ff',
    borderWidth: 1, borderColor: '#b4b4b4ff',
    borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12,
    marginTop: 8,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
  },
  triggerValue: { color: '#e5e7eb', fontSize: 16, fontWeight: '600' },
  chevron: { color: '#9aa0a6', fontSize: 16 },

  backdrop: { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.4)' },
  sheet: {
    position: 'absolute', left: 0, right: 0, bottom: 0,
    backgroundColor: '#9d9d9dff', borderTopLeftRadius: 16, borderTopRightRadius: 16,
    padding: 16, borderTopWidth: 1, borderColor: '#263043'
  },
  sheetTitle: { color: '#e5e7eb', fontSize: 16, fontWeight: '600', marginBottom: 8 },
  menuList: { gap: 6 },
  menuItem: { paddingVertical: 12, paddingHorizontal: 8, borderRadius: 10 },
  menuItemSel: { backgroundColor: '#172036' },
  menuText: { color: '#e5e7eb', fontSize: 16 },
  menuTextSel: { fontWeight: '700' },
  closeBtn: {
    marginTop: 12, alignSelf: 'center', paddingHorizontal: 16, paddingVertical: 10,
    backgroundColor: '#23304f', borderRadius: 999,
  },
  row: { marginTop: 12, flexDirection: 'row', justifyContent: 'space-between', gap: 10 },
  closeText: { color: '#e5e7eb', fontWeight: '600' },
});

export default SessionStart;
