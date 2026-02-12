export const currentUser = {
  name: 'Alex Morgan',
  username: 'alexmorgan',
  avatar: '👤',
};

export const friends = [
  { id: '1', name: 'Sarah Chen', username: 'sarahc', avatar: '👩' },
  { id: '2', name: 'Mike Johnson', username: 'mikej', avatar: '👨' },
  { id: '3', name: 'Emma Wilson', username: 'emmaw', avatar: '👧' },
  { id: '4', name: 'David Lee', username: 'davidl', avatar: '🧑' },
];

// Generate free and busy days for next 4 weeks
const generateDummyDays = () => {
  const today = new Date();
  const freeDaysSet = new Set<string>();
  const busyDaysSet = new Set<string>();
  
  // Generate for next 28 days (4 weeks)
  for (let i = 0; i < 28; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const isoDate = date.toISOString().split('T')[0];
    
    // Make roughly 40% of days free, ensure some weekends
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const random = Math.random();
    
    if (isWeekend && random > 0.3) {
      freeDaysSet.add(isoDate);
    } else if (!isWeekend && random > 0.7) {
      freeDaysSet.add(isoDate);
    } else {
      busyDaysSet.add(isoDate);
    }
  }
  
  // Ensure at least 8 free days
  if (freeDaysSet.size < 8) {
    let daysAdded = 0;
    for (let i = 0; i < 28 && daysAdded < (8 - freeDaysSet.size); i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const isoDate = date.toISOString().split('T')[0];
      if (!freeDaysSet.has(isoDate)) {
        freeDaysSet.add(isoDate);
        busyDaysSet.delete(isoDate);
        daysAdded++;
      }
    }
  }
  
  return { freeDaysSet, busyDaysSet };
};

const { freeDaysSet, busyDaysSet } = generateDummyDays();

export const freeDays = freeDaysSet;
export const busyDays = busyDaysSet;
