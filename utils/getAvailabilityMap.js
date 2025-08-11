// utils/getAvailabilityMap.js
import { DateTime } from 'luxon';
import { buildBusyMap, buildIndexers } from './buildBusyMap.js';
import { buildOccasionMask } from './buildOccasionMask.js';
import { findWindowsInSlice } from './findWindows.js';

/**
 * Orchestrator: merge attendees, apply occasion window, find per-day windows.
 *
 * @param {Array<Array<{startUTC:Date,endUTC:Date,isAllDay?:boolean,summary?:string,transparency?:string}>>} attendeesEvents
 *        Array of normalized event arrays, one per attendee. If you have only one user, wrap it: [events].
 * @param {{
 *   rangeStartUTC: Date,
 *   rangeEndUTC: Date,
 *   sessionTimezone: string,              // e.g. 'Europe/Prague'
 *   occasion: 'breakfast'|'lunch'|'dinner'|'night'|'trip',
 *   minDurationMin: number,               // e.g. 30, 60, 90
 *   windows?: Array<{startHour:number,endHour:number}>, // optional override per day window(s), in session TZ
 *   requireFreeMorning?: boolean,
 *   slotMinutes?: number                  // default 30
 * }} opts
 */
export function getAvailabilityMap(attendeesEvents, opts) {
  const {
    rangeStartUTC,
    rangeEndUTC,
    sessionTimezone,
    occasion,
    minDurationMin,
    windows,
    requireFreeMorning = false,
    slotMinutes = 30,
  } = opts;

  // 0) indexers for slot math
  const indexers = buildIndexers(rangeStartUTC, rangeEndUTC, slotMinutes);
  const { totalSlots, indexOf, timeOf } = indexers;

  // 1) per-attendee busy maps
  const busyMaps = (attendeesEvents || []).map(events =>
    buildBusyMap(events || [], { rangeStartUTC, rangeEndUTC, slotMinutes }).busy
  );
  if (busyMaps.length === 0) {
    // no attendees => everything free (eligible will be only the mask)
    busyMaps.push(new Uint8Array(totalSlots)); // all zeros
  }

  // 2) merge busy (OR)
  const groupBusy = new Uint8Array(totalSlots);
  for (let i = 0; i < totalSlots; i++) {
    let b = 0;
    for (let u = 0; u < busyMaps.length; u++) {
      if (busyMaps[u][i]) { b = 1; break; }
    }
    groupBusy[i] = b;
  }
  // invert → free
  const groupFree = new Uint8Array(totalSlots);
  for (let i = 0; i < totalSlots; i++) groupFree[i] = groupBusy[i] ? 0 : 1;

  // 3) occasion mask (session TZ → UTC per day)
  const defaultWindows = windows || chooseDefaultWindows(occasion);
  const { mask } = buildOccasionMask({
    rangeStartUTC, rangeEndUTC,
    sessionTimezone,
    windows: defaultWindows,
    slotMinutes
  });

  // 4) eligible = free ∧ mask
  const eligible = new Uint8Array(totalSlots);
  for (let i = 0; i < totalSlots; i++) eligible[i] = groupFree[i] & mask[i];

  // 5) per-day iteration using session timezone day boundaries
  const dayResults = [];
  const k = Math.max(1, Math.ceil(minDurationMin / slotMinutes));

  let cursorLocal = DateTime.fromJSDate(rangeStartUTC, { zone: 'utc' })
                             .setZone(sessionTimezone)
                             .startOf('day');
  const endLocal = DateTime.fromJSDate(rangeEndUTC, { zone: 'utc' })
                           .setZone(sessionTimezone)
                           .endOf('day');

  while (cursorLocal <= endLocal) {
    const dayStartLocal = cursorLocal.startOf('day');
    const nextDayLocal  = dayStartLocal.plus({ days: 1 });

    const dayStartUTC = dayStartLocal.toUTC().toJSDate();
    const nextDayUTC  = nextDayLocal.toUTC().toJSDate();

    // slice indices in UTC slot grid
    const dayStartIdx = Math.max(0, indexOf(+dayStartUTC));
    const dayEndIdx   = Math.min(totalSlots, indexOf(+nextDayUTC));

    // sliding window inside that slice
    let dayWindows = findWindowsInSlice(eligible, dayStartIdx, dayEndIdx, k);

    // optional: require free morning after (for "night out" style)
    if (requireFreeMorning && dayWindows.length) {
      const morningLocalStart = nextDayLocal.set({ hour: 8, minute: 0, second: 0, millisecond: 0 }); // example 8–12
      const morningLocalEnd   = nextDayLocal.set({ hour: 12, minute: 0, second: 0, millisecond: 0 });
      const mStartIdx = Math.max(0, indexOf(+morningLocalStart.toUTC().toJSDate()));
      const mEndIdx   = Math.min(totalSlots, indexOf(+morningLocalEnd.toUTC().toJSDate()));
      const morningOK = findWindowsInSlice(eligible, mStartIdx, mEndIdx,  Math.ceil(60 / slotMinutes)).length > 0;
      if (!morningOK) dayWindows = []; // drop all that day’s windows
    }

    // build result row
    const dateISO = dayStartLocal.toISODate(); // in session TZ
    const windowsOut = dayWindows.map(([sIdx, eIdx]) => ({
      startUTC: timeOf(sIdx).toISOString(),
      endUTC:   timeOf(eIdx).toISOString(),
      lengthMin: (eIdx - sIdx) * slotMinutes,
    }));

    dayResults.push({
      dateISO,
      hasAvailability: windowsOut.length > 0,
      windows: windowsOut
    });

    cursorLocal = nextDayLocal;
  }

  return {
    meta: {
      slotMinutes,
      occasion,
      minDurationMin,
      sessionTimezone,
      rangeStartUTC: rangeStartUTC.toISOString(),
      rangeEndUTC: rangeEndUTC.toISOString(),
    },
    days: dayResults
  };
}

/** Default daily windows per occasion (in session TZ hours). */
function chooseDefaultWindows(occasion) {
  switch (occasion) {
    case 'breakfast': return [{ startHour: 9, endHour: 12 }];
    case 'lunch':     return [{ startHour: 12, endHour: 15 }];
    case 'dinner':    return [{ startHour: 17, endHour: 20 }];
    case 'night':     return [{ startHour: 17, endHour: 24 }];
    case 'trip':      // example: two 12h blocks
      return [{ startHour: 0, endHour: 12 }, { startHour: 12, endHour: 24 }];
    default:          return [{ startHour: 9, endHour: 12 }];
  }
}