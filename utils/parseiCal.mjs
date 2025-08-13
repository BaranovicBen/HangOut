// parseiCal.js (ESM, RN/Expo-safe)
import ICAL from 'ical.js';
import { normaliseFromIcalParsed } from "./normaliseEvents.js";

/** ICAL.Time -> JS Date (UTC); all-day -> 00:00 UTC daného dňa */
function timeToDate(t) {
  if (!t) return null;
  if (t.isDate) {
    return new Date(Date.UTC(t.year, t.month - 1, t.day));
  }
  return new Date(t.toUnixTime() * 1000);
}

/** JS Date (UTC) -> ICAL.Time (UTC) */
function dateToIcalTimeUTC(d) {
  const t = ICAL.Time.fromJSDate(d, true); // true => UTC
  t.zone = ICAL.UtcTimezone;
  return t;
}

/**
 * Rozparsuje ICS text a v danom rozsahu rozbalí opakovania na samostatné výskyty.
 * Výstup je "node-ical-like" mapa objektov VEVENT, aby to pasovalo do normaliseFromIcalParsed.
 */
function buildNodeIcalLikeMap(icsText, { rangeStartUTC, rangeEndUTC }) {
  const jcal = ICAL.parse(icsText);
  const vcal = new ICAL.Component(jcal);
  const vEvents = vcal.getAllSubcomponents("vevent");

  const startLimit = dateToIcalTimeUTC(rangeStartUTC);
  const endLimit = dateToIcalTimeUTC(rangeEndUTC);

  const out = {};
  let counter = 0;

  for (const ve of vEvents) {
    const e = new ICAL.Event(ve);
    const comp = e.component;

    // bežné meta
    const baseSummary = e.summary || null;
    const baseLocation = e.location || null;
    const baseDescription = e.description || null;
    const transparency = comp.getFirstPropertyValue("transp") || null; // "TRANSPARENT" | "OPAQUE"
    const status = comp.getFirstPropertyValue("status") || null;       // "TENTATIVE" | "CONFIRMED" | ...
    const uid = e.uid || `uid-${counter}`;

    // exdate -> set ISO stringov (iterator ich aj tak rešpektuje)
    const exdateSet = {};
    comp.getAllProperties("exdate").forEach(p => {
      const t = p.getFirstValue();
      const d = timeToDate(t);
      if (d) exdateSet[d.toISOString()] = true;
    });

    // trvanie udalosti
    let dur = e.duration;
    if (!dur) {
      const startU = e.startDate.toUnixTime();
      const endU = e.endDate.toUnixTime();
      dur = ICAL.Duration.fromSeconds(Math.max(0, endU - startU));
    }

    // all-day flag
    const isAllDay = !!(e.startDate && e.startDate.isDate);

    if (e.isRecurring()) {
      // rozbal opakovania v rozsahu
      const it = e.iterator(startLimit);
      while (true) {
        const next = it.next();
        if (!next) break;

        // mimo horného limitu?
        if (next.compare(endLimit) > 0) break;

        // mimo dolného limitu? (iterator začína >= startLimit, ale istota je fajn)
        if (next.compare(startLimit) < 0) continue;

        const occStart = next.clone();
        const occEnd = next.clone();
        occEnd.addDuration(dur);

        const startDate = timeToDate(occStart);
        const endDate = timeToDate(occEnd);

        const key = `vevent-${counter++}`;
        out[key] = {
          type: "VEVENT",
          start: startDate,
          end: endDate,
          datetype: isAllDay ? "date" : "date-time",
          summary: baseSummary,
          location: baseLocation,
          description: baseDescription,
          uid,
          sequence: comp.getFirstPropertyValue("sequence") || 0,
          transparency,
          status,
          // pre kompatibilitu ponecháme polia, hoci už sú rozbalené:
          rrule: null,
          exdate: exdateSet,
        };
      }
    } else {
      // jednorazová udalosť
      const key = `vevent-${counter++}`;
      out[key] = {
        type: "VEVENT",
        start: timeToDate(e.startDate),
        end: timeToDate(e.endDate),
        datetype: isAllDay ? "date" : "date-time",
        summary: baseSummary,
        location: baseLocation,
        description: baseDescription,
        uid,
        sequence: comp.getFirstPropertyValue("sequence") || 0,
        transparency,
        status,
        rrule: null,
        exdate: exdateSet,
      };
    }
  }

  return out;
}

/**
 * Public API – zavolaj v RN/Expo: dodaj ICS text a voľby s rozsahom.
 */
export function parseIcsAndNormalize(icsText, opts) {
  const parsedMap = buildNodeIcalLikeMap(icsText, opts);
  return normaliseFromIcalParsed(parsedMap, {
    rangeStartUTC: opts.rangeStartUTC,
    rangeEndUTC: opts.rangeEndUTC,
    includeTransparentAsBusy: !!opts.includeTransparentAsBusy,
    includeTentative: !!opts.includeTentative,
  });
}

/* --- Príklad použitia (bez Node FS; v RN/Expo si icsText načítaj cez DocumentPicker/FileSystem) --- */
// const normalized = parseIcsAndNormalize(icsText, {
//   rangeStartUTC: new Date("2025-08-01T00:00:00Z"),
//   rangeEndUTC:   new Date("2025-08-31T23:59:59Z"),
//   includeTransparentAsBusy: false,
//   includeTentative: false,
// });

//to run do npm run test

/*When you add Google or Outlook later, you’ll do the same idea:
const { normaliseEvents } = require('./normaliseEvents');

// after you fetched Google or Outlook events into `rawEvents`
const normalized = normaliseEvents(rawEvents, {
  rangeStartUTC, rangeEndUTC,
  includeTransparentAsBusy: false,
  includeTentative: false,
});
No changes to your algorithm files—only the small adapter that fetches raw events. */