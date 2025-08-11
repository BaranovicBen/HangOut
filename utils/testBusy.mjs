import ical from 'node-ical';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { normaliseFromIcalParsed } from './normaliseEvents.js';
import { buildBusyMap, buildIndexers } from './buildBusyMap.js';

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

const { busy, totalSlots } = buildBusyMap(events, { rangeStartUTC, rangeEndUTC, slotMinutes: 30 });
const busyCount = busy.reduce((a,b)=>a+b,0);

console.log({ totalSlots, busySlots: busyCount, freeSlots: totalSlots - busyCount });

// ukáž prvých pár slotov s časom (na sanity check)
const { timeOf } = buildIndexers(rangeStartUTC, rangeEndUTC, 30);
for (let i = 0; i < Math.min(12, totalSlots); i++) {
  console.log(i, timeOf(i).toISOString(), busy[i]);
}