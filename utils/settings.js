// utils/settings.js — RN/Expo safe (žiadne import.meta/fs/path)
import { SLOT_MINUTES, OCCASION_DEFAULTS } from '../config/types.config.js';

function normalizeOccasion(s) {
  if (!s) return null;
  return String(s).trim().toLowerCase().replace(/\s+/g, '_');
}

/** ---- DOPLNENÉ: timezone helper (default UTC) ---- */
export const DEFAULT_SESSION_TIMEZONE = 'Europe/Bratislava';
export function getSessionTimezone(overrides = {}) {
  return overrides?.sessionTimezone ?? DEFAULT_SESSION_TIMEZONE;
}
/** ------------------------------------------------- */

// Zoznam dostupných typov (defaulty + user overrides)
export function listOccasions(userOccasions = {}) {
  const set = new Set([
    ...Object.keys(OCCASION_DEFAULTS || {}),
    ...Object.keys(userOccasions || {}),
  ]);
  return Array.from(set);
}

/**
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

  // ---- ZMENENÉ: default je UTC (cez helper), nie Bratislava/Praha
  const sessionTimezone = getSessionTimezone(overrides);

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

export function buildOptionsFromForm(form, userSettings = {}) {
  const occ = normalizeOccasion(form.occasion);
  if (!occ) throw new Error('Missing occasion');

  const base = {
    ...(OCCASION_DEFAULTS[occ] || {}),
    ...(userSettings.occasions?.[occ] || {}),
  };

  // použijeme helper; ak na screene už máš const sessionTimezone, môžeš ho formom poslať sem
  const sessionTimezone = getSessionTimezone({
    sessionTimezone: userSettings.sessionTimezone,
    ...form,
  });

  let windows = base.windows;
  let minDurationMin = base.minDurationMin ?? 60;

  if (occ === 'night') {
    const fmw = base.freeMorningWindow || { startHour: 7, endHour: 12 };
    // ak chce voľné ráno → rozšírime okno až do fmw.endHour nasledujúceho dňa
    if (form.nextMorningFree) {
      const startHour = (windows?.[0]?.startHour ?? 17);
      windows = [
        { startHour: startHour, endHour: 24 },
        { startHour: 0, endHour: fmw.endHour },
      ];
      // minDuration = súčet dĺžok okien (dynamicky)
      const totalHrs = (24 - startHour) + (fmw.endHour - 0);
      minDurationMin = Math.max(minDurationMin, totalHrs * 60);
    }
  }
  return {
    occasion: occ,
    sessionTimezone,
    slotMinutes: SLOT_MINUTES,
    rangeStartUTC: form.rangeStartUTC,
    rangeEndUTC: form.rangeEndUTC,
    windows,
    minDurationMin,
    requireFreeMorning: !!base.requireFreeMorning,
    freeMorningWindow: base.freeMorningWindow,
  };
}

export { SLOT_MINUTES, OCCASION_DEFAULTS };
