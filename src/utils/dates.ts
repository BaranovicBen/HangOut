/**
 * Get the next 28 days (4 weeks) starting from today
 */
export const getNext4Weeks = (): Date[] => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const days: Date[] = [];
  for (let i = 0; i < 28; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    days.push(date);
  }
  return days;
};

/**
 * Get the start of a 4-week grid starting from a Monday
 */
export const get4WeekGrid = (anchorDate: Date): Date[] => {
  const dates: Date[] = [];
  const startDate = new Date(anchorDate);
  startDate.setHours(0, 0, 0, 0);
  
  // Find the Monday of the week containing anchorDate
  const dayOfWeek = startDate.getDay();
  const daysFromMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // 0=Sunday, 1=Monday
  startDate.setDate(startDate.getDate() - daysFromMonday);
  
  // Generate 28 days (4 weeks * 7 days)
  for (let i = 0; i < 28; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    dates.push(date);
  }
  
  return dates;
};

/**
 * Format date as ISO string (YYYY-MM-DD)
 */
export const toISODate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

/**
 * Check if a date is in the past (before today)
 */
export const isPastDate = (date: Date): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const checkDate = new Date(date);
  checkDate.setHours(0, 0, 0, 0);
  return checkDate < today;
};

/**
 * Check if a month/year is in the past
 */
export const isPastMonth = (year: number, month: number): boolean => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  
  return year < currentYear || (year === currentYear && month < currentMonth);
};

/**
 * Get month name
 */
export const getMonthName = (date: Date): string => {
  return date.toLocaleString('default', { month: 'long' });
};

/**
 * Get month and year string
 */
export const getMonthYearString = (date: Date): string => {
  return `${getMonthName(date)} ${date.getFullYear()}`;
};
