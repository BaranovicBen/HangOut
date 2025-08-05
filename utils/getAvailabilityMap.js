const { differenceInCalendarDays, addDays, format, isBefore, isAfter } = require('date-fns');

// Default time ranges for each occasion type
const defaultTimeWindows = {
  breakfast: { startHour: 9, endHour: 12 },
  lunch:     { startHour: 12, endHour: 15 },
  dinner:    { startHour: 17, endHour: 20 },
};

/**
 * Generate a list of dates between two given dates (inclusive)
 */
function getDateRange(startDate, endDate) {
  const days = [];
  const total = differenceInCalendarDays(endDate, startDate);
  for (let i = 0; i <= total; i++) {
    const day = addDays(startDate, i);
    days.push(day);
  }
  return days;
}

/**
 * Generate time slots (30 min each) between startHour and endHour for one day
 * Returns slot objects with start/end as Date objects
 */
function generateSlotsForDay(day, startHour, endHour) {
  const slots = [];
  for (let hour = startHour; hour < endHour; hour++) {
    slots.push({
      start: new Date(day.getFullYear(), day.getMonth(), day.getDate(), hour, 0),
      end:   new Date(day.getFullYear(), day.getMonth(), day.getDate(), hour, 30)
    });
    slots.push({
      start: new Date(day.getFullYear(), day.getMonth(), day.getDate(), hour, 30),
      end:   new Date(day.getFullYear(), day.getMonth(), day.getDate(), hour + 1, 0)
    });
  }
  return slots;
}

// TEMP: Test run (remove later in production)
if (require.main === module) {
  const events = [
    {
      start: new Date("2025-08-27T08:00:00Z"),
      end:   new Date("2025-08-27T09:00:00Z"),
      summary: "Breakfast"
    }
  ];

  const startDate = new Date("2025-08-26");
  const endDate = new Date("2025-08-28");

  console.log(getDateRange(startDate, endDate));
  const slots = generateSlotsForDay(new Date("2025-08-27"), 9, 12);
  console.log(slots);
}
// to run node utils/getAvailabilityMap.js