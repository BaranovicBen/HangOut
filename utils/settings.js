// utils/settings.js (ESM)
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { SLOT_MINUTES, OCCASION_DEFAULTS } from '../config/types.config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// safe load JSON (dev CLI). V RN appke sem neskôr doplníš fetch/AsyncStorage implementáciu.
function tryLoadUserSettings() {
  try {
    const p = path.resolve(__dirname, '../config/user.settings.json');
    if (fs.existsSync(p)) {
      return JSON.parse(fs.readFileSync(p, 'utf-8'));
    }
  } catch (_) {}
  return {};
}

/**
 * Zmerguj defaults + user overrides + ad-hoc overrides (napr. z UI formu).
 * @param {string} occasion
 * @param {{
 *   rangeStartUTC: Date, rangeEndUTC: Date,
 *   sessionTimezone?: string,
 *   windows?: Array<{startHour:number,endHour:number}>,
 *   minDurationMin?: number,
 *   requireFreeMorning?: boolean,
 *   freeMorningWindow?: {startHour:number,endHour:number},
 *   slotMinutes?: number
 * }} overrides
 */

function normalizeOccasion(s) {
  if (!s) return null;
  return String(s).trim().toLowerCase().replace(/\s+/g, '_');
}

export function resolveOptions(occasion, overrides = {}) {
  const occ = normalizeOccasion(occasion);

  // ✅ Kontrola, či existuje
  if (!OCCASION_DEFAULTS[occ]) {
    throw new Error(`Unknown occasion: ${occasion}`);
  }
  const user = tryLoadUserSettings();
  const byOccUser = user.occasions?.[occasion] || {};
  const byOccDefault = OCCASION_DEFAULTS[occasion] || OCCASION_DEFAULTS.breakfast;

  const sessionTimezone =
    overrides.sessionTimezone ||
    user.sessionTimezone ||
    'Europe/Prague';

  const slotMinutes = overrides.slotMinutes || SLOT_MINUTES;

  // deep-ish merge s jednoduchosťou, windows berieme z overrides > user > default
  const windows = overrides.windows || byOccUser.windows || byOccDefault.windows;

  const minDurationMin =
    overrides.minDurationMin ??
    byOccUser.minDurationMin ??
    byOccDefault.minDurationMin;

  const requireFreeMorning =
    overrides.requireFreeMorning ??
    byOccUser.requireFreeMorning ??
    byOccDefault.requireFreeMorning ??
    false;

  const freeMorningWindow =
    overrides.freeMorningWindow ||
    byOccUser.freeMorningWindow ||
    byOccDefault.freeMorningWindow; // môže byť undefined

  // rangeStartUTC, rangeEndUTC MUSIA prísť z overrides (napojíš z UI)
  if (!(overrides.rangeStartUTC instanceof Date) || !(overrides.rangeEndUTC instanceof Date)) {
    throw new Error('resolveOptions: rangeStartUTC and rangeEndUTC must be Date objects');
  }

  return {
    occasion,
    sessionTimezone,
    slotMinutes,
    rangeStartUTC: overrides.rangeStartUTC,
    rangeEndUTC: overrides.rangeEndUTC,
    windows,
    minDurationMin,
    requireFreeMorning,
    freeMorningWindow,
  };
}