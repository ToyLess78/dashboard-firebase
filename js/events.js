const events = [
    {
      summary: 'JS Conference',
      start: {
        date: Calendar.dayjs("2023-09-06T21:00:00.000Z").format('DD/MM/YYYY'),
      },
      end: {
        date: Calendar.dayjs().format('DD/MM/YYYY'),
      },
      color: {
        background: '#FF8F6B',
        foreground: '#fff',
      },
    },
    {
      summary: 'Vue Meetup',
      start: {
        date: Calendar.dayjs().add(1, 'day').format('DD/MM/YYYY'),
      },
      end: {
        date: Calendar.dayjs().add(5, 'day').format('DD/MM/YYYY'),
      },
      color: {
        background: 'var(--permanent-pink)',
        foreground: '#fff',
      },
    },
    {
      summary: 'Angular Meetup',
      description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur',
      start: {
        date: Calendar.dayjs().subtract(3, 'day').format('DD/MM/YYYY'),
        dateTime: Calendar.dayjs().subtract(3, 'day').format('DD/MM/YYYY') + ' 10:00',
      },
      end: {
        date: Calendar.dayjs().add(3, 'day').format('DD/MM/YYYY'),
        dateTime: Calendar.dayjs().add(3, 'day').format('DD/MM/YYYY') + ' 14:00',
      },
      color: {
        background: 'var(--green)',
        foreground: '#fff',
      },
    },
    {
      summary: 'React Meetup',
      start: {
        date: Calendar.dayjs().add(5, 'day').format('DD/MM/YYYY'),
      },
      end: {
        date: Calendar.dayjs().add(8, 'day').format('DD/MM/YYYY'),
      },
      color: {
        background: 'var(--main-indigo-color)',
        foreground: '#fff',
      },
    },
    {
      summary: 'Meeting',
      start: {
        date: Calendar.dayjs().add(1, 'day').format('DD/MM/YYYY'),
        dateTime: Calendar.dayjs().add(1, 'day').format('DD/MM/YYYY') + ' 8:00',
      },
      end: {
        date: Calendar.dayjs().add(1, 'day').format('DD/MM/YYYY'),
        dateTime: Calendar.dayjs().add(1, 'day').format('DD/MM/YYYY') + ' 12:00',
      },
      color: {
        background: 'var(--main-indigo-color)',
        foreground: '#0a47a9',
      },
    },
    {
      summary: 'Call',
      start: {
        date: Calendar.dayjs().add(2, 'day').format('DD/MM/YYYY'),
        dateTime: Calendar.dayjs().add(2, 'day').format('DD/MM/YYYY') + ' 11:00',
      },
      end: {
        date: Calendar.dayjs().add(2, 'day').format('DD/MM/YYYY'),
        dateTime: Calendar.dayjs().add(2, 'day').format('DD/MM/YYYY') + ' 14:00',
      },
      color: {
        background: 'var(--main-indigo-color)',
        foreground: '#f5f5f5',
      },
    }
  ];
  const calendarElement = document.getElementById('calendar-2');
  const calendarInstance = Calendar.getInstance(calendarElement);
calendarInstance.addEvents(events);

calendarElement.addEventListener('update.mdb.calendar', () => {
  console.log('update.mdb.calendar', calendarInstance.events);

})


const backgrounds = [
    "var(--main-indigo-color)",
  "var(--green)",
  "var(--permanent-pink)",
  "#FF8F6B",
  "var(--main-indigo-opacity)",
  "var(--green-opacity)",
  "var(--light-pink)"
]
const foregrounds = [
    '#fff',
  '#fff',
  '#fff',
  '#fff',
  "var(--main-indigo-color)",
  "var(--green)",
  "var(--permanent-pink)"
]
document.addEventListener('shown.mdb.modal', (e) => {

  e.target.querySelectorAll('.color-dropdown-menu a').forEach((a, i) => {
      a.querySelector('i').style.color = backgrounds[i]
      a.dataset.background = backgrounds[i];
      a.dataset.foreground = foregrounds[i];
      if (e.target.querySelector('.modal-title').textContent === 'Add an event') {
        calendarInstance._newEvent.color = {
          "background": "var(--main-indigo-color)",
          "foreground": "#fff"
        }
        e.target.querySelector('#dropdownMenuButton i').style.color = "var(--main-indigo-color)";
      }
    });
})
// Set the current day of the week to a variable, with 0 being Sunday and 6 being Saturday
const day = new Date().getDay();
const greeting = document.getElementById('greeting')
switch (day) {
  case 0:
    greeting.textContent = "It's Sunday, time to relax!";
    break;
  case 1:
    greeting.textContent = "Happy Monday!";
    break;
  case 2:
     greeting.textContent = "It's Tuesday. You got this!";
    break;
  case 3:
     greeting.textContent = "Hump day already!";
    break;
  case 4:
     greeting.textContent = "Just one more day 'til the weekend!";
    break;
  case 5:
     greeting.textContent = "Happy Friday!";
    break;
  case 6:
     greeting.textContent = "Have a wonderful Saturday!";
    break;
  default:
     greeting.textContent = "Something went horribly wrong...";
}