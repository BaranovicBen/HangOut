import { buildOccasionMask } from './buildOccasionMask.js';

const rangeStartUTC = new Date('2025-08-25T00:00:00Z');
const rangeEndUTC   = new Date('2025-08-27T23:59:59Z');

const { mask } = buildOccasionMask({
  rangeStartUTC, rangeEndUTC,
  sessionTimezone: 'Europe/Prague',
  windows: [{ startHour: 9, endHour: 12 }], // breakfast
  slotMinutes: 30,
});

console.log('mask 1-count:', mask.reduce((a,b)=>a+b,0));
