// utils/normaliseEvents.js (ESM)
import ical from 'node-ical';
import { DateTime } from 'luxon';

/**
 * Normalise heterogeneous events (ICS/Google/Outlook/custom) into a single UTC schema.
 * @param {Array<any>} rawEvents
 * @param {{
 *   rangeStartUTC: Date,
 *   rangeEndUTC: Date,
 *   includeTransparentAsBusy?: boolean,
 *   includeTentative?: boolean
 * }} options
 * @returns {Array<{startUTC: Date, endUTC: Date, isAllDay: boolean, summary?: string, transparency?: 'OPAQUE'|'TRANSPARENT'>}}
 */
export function normaliseEvents(rawEvents, options) {
  const {
    rangeStartUTC,
    rangeEndUTC,
    includeTransparentAsBusy = false,
    includeTentative = false,
  } = options || {};

  if (!(rangeStartUTC instanceof Date) || !(rangeEndUTC instanceof Date)) {
    throw new Error('normaliseEvents: rangeStartUTC and rangeEndUTC must be Date objects');
  }

  const out = [];
  for (const ev of rawEvents || []) {
    const mapped = mapToNormalised(ev, { includeTentative });
    if (!mapped) continue;

    const transp = (mapped.transparency || 'OPAQUE').toUpperCase();
    if (!includeTransparentAsBusy && transp === 'TRANSPARENT') continue;

    const clamped = clampInterval(mapped.startUTC, mapped.endUTC, rangeStartUTC, rangeEndUTC);
    if (!clamped) continue;

    out.push({
      startUTC: clamped.start,
      endUTC: clamped.end,
      isAllDay: !!mapped.isAllDay,
      summary: mapped.summary || '',
      transparency: transp === 'TRANSPARENT' ? 'TRANSPARENT' : 'OPAQUE',
    });
  }

  out.sort((a, b) => a.startUTC - b.startUTC || a.endUTC - b.endUTC);
  return out;
}

/**
 * Convenience for node-ical.parseICS() object map.
 * @param {Record<string, any>} icsParsed
 * @param {any} options see normaliseEvents()
 */
export function normaliseFromIcalParsed(icsParsed, options) {
  const events = [];
  for (const k in icsParsed) {
    const v = icsParsed[k];
    if (v && v.type === 'VEVENT') events.push(v);
  }
  return normaliseEvents(events, options);
}

/* -------------------- internal mappers & helpers -------------------- */

function mapToNormalised(ev, { includeTentative }) {
  // 1) node-ical VEVENT
  if (ev && ev.type === 'VEVENT') {
    const status = safeUpper(ev.status);
    if (status === 'CANCELLED') return null;
    if (!includeTentative && status === 'TENTATIVE') return null;

    const transparency = mapTransparency(ev.transparency);
    const startUTC = toUTCDate(ev.start);
    const endUTC   = toUTCDate(ev.end);
    if (!startUTC || !endUTC || endUTC <= startUTC) return null;

    const isAllDay = !!ev.isAllDay || isAllDayLike(startUTC, endUTC);
    return { startUTC, endUTC, isAllDay, summary: ev.summary || '', transparency };
  }

  // 2) Google Calendar
  if (ev && ev.start && (ev.start.dateTime || ev.start.date)) {
    const status = safeUpper(ev.status);
    if (status === 'CANCELLED') return null;
    if (!includeTentative && status === 'TENTATIVE') return null;

    const transparency = mapTransparency(ev.transparency);
    const { startUTC, endUTC, isAllDay } = googleTimesToUTC(ev.start, ev.end, ev.start.timeZone || ev.timeZone);
    if (!startUTC || !endUTC || endUTC <= startUTC) return null;

    return { startUTC, endUTC, isAllDay, summary: ev.summary || '', transparency };
  }

  // 3) Outlook / Microsoft Graph
  if (ev && ev.start && ev.start.dateTime && ev.end && ev.end.dateTime) {
    const showAs = safeLower(ev.showAs); // free|busy|tentative|oof|…
    const transparency = showAs === 'free' ? 'TRANSPARENT' : 'OPAQUE';
    if (ev.isCancelled) return null;
    if (!includeTentative && showAs === 'tentative') return null;

    const { startUTC, endUTC } = outlookTimesToUTC(ev.start, ev.end);
    if (!startUTC || !endUTC || endUTC <= startUTC) return null;

    return {
      startUTC, endUTC,
      isAllDay: !!ev.isAllDay || isAllDayLike(startUTC, endUTC),
      summary: ev.subject || ev.summary || '',
      transparency
    };
  }

  // 4) Already-normalised/custom
  if (ev && ev.startUTC && ev.endUTC) {
    const s = ev.startUTC instanceof Date ? ev.startUTC : new Date(ev.startUTC);
    const e = ev.endUTC   instanceof Date ? ev.endUTC   : new Date(ev.endUTC);
    if (!isFinite(s) || !isFinite(e) || e <= s) return null;
    return {
      startUTC: s,
      endUTC: e,
      isAllDay: !!ev.isAllDay || isAllDayLike(s, e),
      summary: ev.summary || '',
      transparency: mapTransparency(ev.transparency),
    };
  }

  return null;
}

function safeUpper(x) { return (x || '').toString().toUpperCase(); }
function safeLower(x) { return (x || '').toString().toLowerCase(); }
function mapTransparency(v) { return safeUpper(v) === 'TRANSPARENT' ? 'TRANSPARENT' : 'OPAQUE'; }

function hasExplicitOffset(s) { return /Z$|[+\-]\d{2}:\d{2}$/.test(s); }

function toUTCDate(value, timeZone) {
  if (!value) return null;
  if (value instanceof Date) return value;
  const s = String(value);
  if (hasExplicitOffset(s)) {
    const d = new Date(s);
    return isFinite(d) ? d : null;
  }
  if (timeZone) {
    const dt = DateTime.fromISO(s, { zone: timeZone });
    if (dt.isValid) return dt.toUTC().toJSDate();
  }
  const d = new Date(s);
  return isFinite(d) ? d : null;
}

function googleTimesToUTC(start, end, timeZone) {
  if (start.date && end.date) {
    const startUTC = new Date(`${start.date}T00:00:00Z`);
    const endUTC   = new Date(`${end.date}T00:00:00Z`); // exclusive
    return { startUTC, endUTC, isAllDay: true };
  }
  const startUTC = toUTCDate(start.dateTime || start, timeZone);
  const endUTC   = toUTCDate(end.dateTime   || end,   timeZone);
  return { startUTC, endUTC, isAllDay: false };
}

function outlookTimesToUTC(start, end) {
  const sdt = DateTime.fromISO(start.dateTime, { zone: start.timeZone });
  const edt = DateTime.fromISO(end.dateTime,   { zone: end.timeZone || start.timeZone });
  return {
    startUTC: sdt.isValid ? sdt.toUTC().toJSDate() : null,
    endUTC:   edt.isValid ? edt.toUTC().toJSDate() : null
  };
}

/** Half-open clamp [aStart, aEnd) to [bStart, bEnd) */
function clampInterval(aStart, aEnd, bStart, bEnd) {
  if (!(aStart instanceof Date) || !(aEnd instanceof Date)) return null;
  if (aEnd <= aStart) return null;
  const s = new Date(Math.max(+aStart, +bStart));
  const e = new Date(Math.min(+aEnd,   +bEnd));
  if (e <= s) return null;
  return { start: s, end: e };
}

/** Treat as all-day if [00:00, 00:00 next day) UTC and >= 23h */
function isAllDayLike(start, end) {
  const ms = end - start;
  if (ms < 23 * 60 * 60 * 1000) return false;
  const s0 = start.getUTCHours() === 0 && start.getUTCMinutes() === 0;
  const e0 = end.getUTCHours() === 0 && end.getUTCMinutes() === 0;
  return s0 && e0;
}

export default normaliseEvents;
// from your project root
//node utils/normaliseEvents.js utils/test.ics 2025-08-01 2025-08-31