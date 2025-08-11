export const SLOT_MINUTES = 30;

export const OCCASION_DEFAULTS = {
  breakfast: {
    windows: [{ startHour: 9, endHour: 12 }],
    minDurationMin: 30,
    requireFreeMorning: false,
  },
  lunch: {
    windows: [{ startHour: 12, endHour: 15 }],
    minDurationMin: 60,
    requireFreeMorning: false,
  },
  dinner: {
    windows: [{ startHour: 17, endHour: 20 }],
    minDurationMin: 60,
    requireFreeMorning: false,
  },
  "night out": {
    windows: [{ startHour: 17, endHour: 24 }],
    minDurationMin: 120,
    requireFreeMorning: true,
    freeMorningWindow: { startHour: 8, endHour: 12 },
  },
  trip: {
    windows: [{ startHour: 0, endHour: 12 }, { startHour: 12, endHour: 24 }],
    minDurationMin: 12 * 60, 
    requireFreeMorning: false,
  },
};