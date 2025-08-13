// server/index.mjs  (ESM)
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import ical from 'node-ical';

import { normaliseFromIcalParsed } from '../utils/normaliseEvents.js';
import { getAvailabilityMap } from '../utils/getAvailabilityMap.js';
import { resolveOptions } from '../utils/settings.js';

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '2mb' }));

// Health
app.get('/health', (_req, res) => res.json({ ok: true }));

/**
 * POST /availability
 * Body:
 * {
 *   icsText: string,            // na MVP
 *   occasion: "breakfast|lunch|dinner|night|trip",
 *   rangeStartISO: "2025-08-01T00:00:00Z",
 *   rangeEndISO:   "2025-08-31T23:59:59Z",
 *   minDurationMin: 60          // voliteľné, ak necháš na config
 * }
 */
app.post('/availability', (req, res) => {
  try {
    const { icsText, occasion, rangeStartISO, rangeEndISO, minDurationMin } = req.body || {};
    if (!icsText || !occasion || !rangeStartISO || !rangeEndISO) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const rangeStartUTC = new Date(rangeStartISO);
    const rangeEndUTC   = new Date(rangeEndISO);
    if (!(rangeStartUTC instanceof Date) || !(rangeEndUTC instanceof Date) || isNaN(+rangeStartUTC) || isNaN(+rangeEndUTC)) {
      return res.status(400).json({ error: 'Invalid date range' });
    }

    // ICS → node-ical parsed map → normalised events
    const parsed = ical.parseICS(icsText);
    const events = normaliseFromIcalParsed(parsed, {
      rangeStartUTC, rangeEndUTC,
      includeTransparentAsBusy: false,
      includeTentative: false,
    });

    // Konfigurácia (defaulty + user overrides)
    const options = resolveOptions(occasion, {
      rangeStartUTC,
      rangeEndUTC,
      ...(minDurationMin ? { minDurationMin: Number(minDurationMin) } : {})
    });

    const result = getAvailabilityMap([events], options);
    return res.json(result);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Internal error', detail: e.message });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API listening on http://localhost:${PORT}`));