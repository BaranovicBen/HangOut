// utils/runAvailability.mjs (CLI runner na rýchle prepínanie typov)
import ical from 'node-ical';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { normaliseFromIcalParsed } from './normaliseEvents.js';
import { getAvailabilityMap } from './getAvailabilityMap.js';
import { resolveOptions } from './settings.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// args: occasion, start, end, duration
// ex: node utils/runAvailability.mjs breakfast 2025-08-01 2025-08-31 60
const [, , occ = 'breakfast', start = '2025-08-01', end = '2025-08-31', dur = '60'] = process.argv;

const ics = fs.readFileSync(path.join(__dirname, 'test.ics'), 'utf-8');
const parsed = ical.parseICS(ics);
const events = normaliseFromIcalParsed(parsed, {
  rangeStartUTC: new Date(start + 'T00:00:00Z'),
  rangeEndUTC:   new Date(end   + 'T23:59:59Z'),
  includeTransparentAsBusy: false,
  includeTentative: false,
});

// vyrob options z central configu + CLI
const options = resolveOptions(occ, {
  rangeStartUTC: new Date(start + 'T00:00:00Z'),
  rangeEndUTC:   new Date(end   + 'T23:59:59Z'),
  minDurationMin: Number(dur),
});

const result = getAvailabilityMap([events], options);

// vytlač prehľadné dni s oknami
const days = result.days.filter(d => d.hasAvailability);
console.log(`Occasion: ${occ}, range ${start}..${end}, min ${options.minDurationMin} min`);
console.log(`Found ${days.length} available day(s).`);
for (const d of days) {
  const times = d.windows.map(w => `${w.startUTC} → ${w.endUTC} (${w.lengthMin}m)`).join(' | ');
  console.log(`• ${d.dateISO}: ${times}\n`);
}