// parseiCal.js (ESM verzia)
import ical from 'node-ical';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { normaliseFromIcalParsed } from './normaliseEvents.js';

// ekvivalent __dirname v ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(async function main() {
  const icsPath = path.join(__dirname, 'test.ics');
  const data = fs.readFileSync(icsPath, 'utf-8');
  const parsed = ical.parseICS(data);

  const rangeStartUTC = new Date('2025-08-01T00:00:00Z');
  const rangeEndUTC   = new Date('2025-08-31T23:59:59Z');

  const normalized = normaliseFromIcalParsed(parsed, {
    rangeStartUTC,
    rangeEndUTC,
    includeTransparentAsBusy: false,
    includeTentative: false,
  });

  console.log(normalized);
})();
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