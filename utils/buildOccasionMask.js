 // utils/buildOccasionMask.js (ESM)
import { DateTime } from 'luxon';
import { buildIndexers } from './buildBusyMap.js';

/**
 * @param {{rangeStartUTC:Date, rangeEndUTC:Date, sessionTimezone:string,
 *          windows?: Array<{startHour:number,endHour:number}>,
 *          slotMinutes?:number}} opt
 * @returns {{mask:Uint8Array, slotsPerDay:number}}
 */
export function buildOccasionMask({
  rangeStartUTC,
  rangeEndUTC,
  sessionTimezone,
  windows = [{ startHour: 9, endHour: 12 }], // default breakfast window
  slotMinutes = 30,
}) {
  const { totalSlots, indexOf } = buildIndexers(rangeStartUTC, rangeEndUTC, slotMinutes);
  const mask = new Uint8Array(totalSlots);

  // pomocné: iteruj po dňoch v session TZ (kvôli DST)
  let cursor = DateTime.fromJSDate(rangeStartUTC, { zone: 'utc' }).setZone(sessionTimezone).startOf('day');
  const endLocal = DateTime.fromJSDate(rangeEndUTC, { zone: 'utc' }).setZone(sessionTimezone).endOf('day');

  while (cursor <= endLocal) {
    for (const w of windows) {
      const startLocal = cursor.set({ hour: w.startHour, minute: 0, second: 0, millisecond: 0 });
      const endLocalW  = cursor.set({ hour: w.endHour,  minute: 0, second: 0, millisecond: 0 });

      const startUTC = startLocal.toUTC().toJSDate();
      const endUTC   = endLocalW.toUTC().toJSDate();

      // označ [s,e) v maske, orezané na globálny range
      const s = Math.max(0, indexOf(+startUTC));
      const e = Math.min(totalSlots, Math.ceil((+endUTC - +rangeStartUTC) / (slotMinutes * 60 * 1000)));
      if (e > s) mask.fill(1, s, e);
    }
    cursor = cursor.plus({ days: 1 });
  }

  const slotsPerDay = Math.floor((24 * 60) / slotMinutes); // 48 pri 30-min
  return { mask, slotsPerDay };
}

// // utils/buildBusyMap.js (ESM)
// export function buildIndexers(rangeStartUTC, rangeEndUTC, slotMinutes = 30) {
//   const slotMs = slotMinutes * 60 * 1000;
//   const totalSlots = Math.ceil((+rangeEndUTC - +rangeStartUTC) / slotMs);
//   const indexOf = (tMs) => Math.floor((tMs - +rangeStartUTC) / slotMs);
//   const timeOf  = (idx) => new Date(+rangeStartUTC + idx * slotMs);
//   return { slotMs, totalSlots, indexOf, timeOf };
// }

// /**
//  * @param {Array<{startUTC:Date,endUTC:Date,isAllDay?:boolean}>} events
//  * @param {{rangeStartUTC:Date, rangeEndUTC:Date, slotMinutes?:number}} opt
//  * @returns {{busy:Uint8Array, slotMinutes:number, totalSlots:number}}
//  */
// export function buildBusyMap(events, { rangeStartUTC, rangeEndUTC, slotMinutes = 30 }) {
//   const { totalSlots, indexOf } = buildIndexers(rangeStartUTC, rangeEndUTC, slotMinutes);
//   const busy = new Uint8Array(totalSlots);

//   for (const ev of events || []) {
//     if (!(ev.startUTC instanceof Date) || !(ev.endUTC instanceof Date)) continue;
//     if (ev.endUTC <= ev.startUTC) continue;

//     // half-open [s, e)
//     const s = Math.max(0, indexOf(+ev.startUTC));
//     const e = Math.min(totalSlots, Math.ceil((+ev.endUTC - +rangeStartUTC) / (slotMinutes * 60 * 1000)));
//     if (e > s) busy.fill(1, s, e);
//   }

//   return { busy, slotMinutes, totalSlots };
// }