import ICAL from 'ical.js'

export const parseICS = (icsData) => {
  try {
    const jcalData = ICAL.parse(icsData)
    const comp = new ICAL.Component(jcalData)
    const events = comp.getAllSubcomponents('vevent')

    return events.map((event) => {
      const vevent = new ICAL.Event(event)
      return {
        title: vevent.summary,
        start: vevent.startDate.toJSDate(),
        end: vevent.endDate.toJSDate(),
        location: vevent.location,
        description: vevent.description,
      }
    })
  } catch (err) {
    console.error('Error parsing ICS:', err)
    return []
  }
}