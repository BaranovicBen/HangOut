import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { parseIcsAndNormalize } from './parseiCal.mjs';
import { getAvailabilityMap } from './getAvailabilityMap.js';
import { resolveOptions } from './settings.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// args: occasion, start, end, duration
// ex: node utils/runAvailability.mjs breakfast 2025-08-01 2025-08-31 60
const [, , occ = 'breakfast', start = '2025-08-01', end = '2025-08-31', dur = '60'] = process.argv;

// načítaj ICS (len pre CLI; v RN/Expo to nahradíš pickerom)
const icsText = fs.readFileSync(path.join(__dirname, 'test.ics'), 'utf-8');

// normalizuj ICS cez ical.js -> unified schema
const rangeStartUTC = new Date(`${start}T00:00:00Z`);
const rangeEndUTC   = new Date(`${end}T23:59:59Z`);

const normalized = parseIcsAndNormalize(icsText, {
  rangeStartUTC,
  rangeEndUTC,
  includeTransparentAsBusy: false,
  includeTentative: false,
});

// vyrob options z central configu + CLI
const options = resolveOptions(occ, {
  rangeStartUTC,
  rangeEndUTC,
  minDurationMin: Number(dur),
});

// availability pre (prípadne) viac kalendárov
const result = getAvailabilityMap([normalized], options);

// vyber unikátne dni s dostupnosťou
const uniqueDays = Array.from(
  new Set(
    (result?.days || [])
      .filter(d => d.hasAvailability)
      .map(d => d.dateISO)
  )
).sort();

const isJson = process.argv.includes('--json');
if (isJson) {
  console.log(JSON.stringify({ occasion: occ, count: uniqueDays.length, days: uniqueDays }));
} else {
  console.log(`Occasion: ${occ}`);
  console.log(`Found days: ${uniqueDays.length}`);
  console.log(`Days: ${uniqueDays.join(', ')}`);
}