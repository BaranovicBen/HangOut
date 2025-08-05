const ical = require('node-ical');
const fs = require('fs');
const path = require('path');


async function parseICal(filePath) {
  const data = fs.readFileSync(filePath, 'utf-8');
  const events = ical.parseICS(data);

  console.log('📅 Events found:\n');

  for (const key in events) {
    const event = events[key];
    if (event.type === 'VEVENT') {
      const start = new Date(event.start);
      const end = new Date(event.end);
      const summary = event.summary || 'No title';

      console.log(`- ${summary}`);
      console.log(`  From: ${start.toISOString()}`);
      console.log(`  To:   ${end.toISOString()}`);
    }
  }
}

const file = path.join(__dirname, 'test.ics');
parseICal(file).catch(console.error);
//to run do npm run test