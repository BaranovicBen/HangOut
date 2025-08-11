// utils/testAvailability.mjs
import ical from 'node-ical';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { normaliseFromIcalParsed } from './normaliseEvents.js';
import { getAvailabilityMap } from './getAvailabilityMap.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ics = fs.readFileSync(path.join(__dirname, 'test.ics'), 'utf-8');
const parsed = ical.parseICS(ics);

const rangeStartUTC = new Date('2025-08-01T00:00:00Z');
const rangeEndUTC   = new Date('2025-08-31T23:59:59Z');

const events = normaliseFromIcalParsed(parsed, {
  rangeStartUTC, rangeEndUTC,
  includeTransparentAsBusy: false,
  includeTentative: false,
});

// one attendee for now
const result = getAvailabilityMap([events], {
  rangeStartUTC, rangeEndUTC,
  sessionTimezone: 'Europe/Prague',
  occasion: 'breakfast',
  minDurationMin: 30,               // require at least 1 hour
  requireFreeMorning: false,
  slotMinutes: 30
});

console.log(JSON.stringify(result.days.filter(d => d.hasAvailability), null, 2));