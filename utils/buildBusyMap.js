// utils/buildBusyMap.js (ESM)
export function buildIndexers(rangeStartUTC, rangeEndUTC, slotMinutes = 30) {
  const slotMs = slotMinutes * 60 * 1000;
  const totalSlots = Math.ceil((+rangeEndUTC - +rangeStartUTC) / slotMs);
  const indexOf = (tMs) => Math.floor((tMs - +rangeStartUTC) / slotMs);
  const timeOf  = (idx) => new Date(+rangeStartUTC + idx * slotMs);
  return { slotMs, totalSlots, indexOf, timeOf };
}

/**
 * @param {Array<{startUTC:Date,endUTC:Date,isAllDay?:boolean}>} events
 * @param {{rangeStartUTC:Date, rangeEndUTC:Date, slotMinutes?:number}} opt
 * @returns {{busy:Uint8Array, slotMinutes:number, totalSlots:number}}
 */
export function buildBusyMap(events, { rangeStartUTC, rangeEndUTC, slotMinutes = 30 }) {
  const { totalSlots, indexOf } = buildIndexers(rangeStartUTC, rangeEndUTC, slotMinutes);
  const busy = new Uint8Array(totalSlots);

  for (const ev of events || []) {
    if (!(ev.startUTC instanceof Date) || !(ev.endUTC instanceof Date)) continue;
    if (ev.endUTC <= ev.startUTC) continue;

    // half-open [s, e)
    const s = Math.max(0, indexOf(+ev.startUTC));
    const e = Math.min(totalSlots, Math.ceil((+ev.endUTC - +rangeStartUTC) / (slotMinutes * 60 * 1000)));
    if (e > s) busy.fill(1, s, e);
  }

  return { busy, slotMinutes, totalSlots };
}