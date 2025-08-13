// utils/settings.js — RN/Expo safe (žiadne import.meta/fs/path)
import { SLOT_MINUTES, OCCASION_DEFAULTS } from '../config/types.config.js';

function normalizeOccasion(s) {
  if (!s) return null;
  return String(s).trim().toLowerCase().replace(/\s+/g, '_');
}

/**
 * Merge defaults + (voliteľne) user overrides + ad-hoc overrides.
 * V RN verzii nečítame user.settings.json z disku (fs) — user overrides nechaj prázdne.
 */
export function resolveOptions(occasion, overrides = {}) {
  const occ = normalizeOccasion(occasion) ?? 'lunch';

  if (!OCCASION_DEFAULTS[occ]) {
    throw new Error(`Unknown occasion: ${occasion}`);
  }

  // RN: bez fs -> žiadne user overrides zo súboru
  const byOccUser = {}; // { windows?, minDurationMin?, requireFreeMorning?, freeMorningWindow? }
  const byOccDefault = OCCASION_DEFAULTS[occ];

  // MUSIA prísť zvonku (napr. z UI)
  const { rangeStartUTC, rangeEndUTC } = overrides;
  if (!(rangeStartUTC instanceof Date) || !(rangeEndUTC instanceof Date)) {
    throw new Error('resolveOptions: rangeStartUTC and rangeEndUTC must be Date objects');
    // ak potrebuješ stringy, konvertuj skôr: new Date(`${iso}T00:00:00Z`)
  }

  const sessionTimezone =
    overrides.sessionTimezone ??
    'Europe/Bratislava'; // default si kľudne zmeň

  const slotMinutes = overrides.slotMinutes ?? SLOT_MINUTES;

  // priorita: overrides > user (prázdne) > defaults
  const windows =
    overrides.windows ?? byOccUser.windows ?? byOccDefault.windows;

  const minDurationMin =
    (overrides.minDurationMin ?? byOccUser.minDurationMin ?? byOccDefault.minDurationMin);

  const requireFreeMorning =
    (overrides.requireFreeMorning ?? byOccUser.requireFreeMorning ?? byOccDefault.requireFreeMorning ?? false);

  const freeMorningWindow =
    (overrides.freeMorningWindow ?? byOccUser.freeMorningWindow ?? byOccDefault.freeMorningWindow);

  return {
    occasion: occ,
    sessionTimezone,
    slotMinutes,
    rangeStartUTC,
    rangeEndUTC,
    windows,
    minDurationMin,
    requireFreeMorning,
    freeMorningWindow,
  };
}

export { SLOT_MINUTES, OCCASION_DEFAULTS };