const isStrLengthValid = (str, maxLength) => str.length <= maxLength;

isStrLengthValid('abcdefghi', 10);
isStrLengthValid('abcedfghij', 10);
isStrLengthValid('abcdefghijk', 10);

const isPalindrome = (str) => {
  const text = str.replaceAll(' ', '').toLowerCase();

  for (let i = 0; i < text.length / 2; i++) {
    if (text.at(i) !== text.at(-1 - i)) {
      return false;
    }
  }

  return true;
};

isPalindrome('ТоПоТ');

const extractNumbers = (str) => {
  let number = '';

  for (const n of str) {
    if (Number.isNaN(parseInt(n, 10))) {
      number += n;
    }
  }

  return parseInt(number, 10);
};

extractNumbers('Коля 230 и -1 годик');

const getMinutes = (str) => {
  const arrayString = str.split(':');

  return Number(arrayString[0]) * 60 + Number(arrayString[1]);
};

const isTimeValid = (startWorkDay, endWorkDay, startMeeting, duration) => {
  const startMeetingInMinutes = getMinutes(startMeeting);
  const startWorkDayInMinutes = getMinutes(startWorkDay);
  const endWorkDayInMinutes = getMinutes(endWorkDay);

  return startMeetingInMinutes + duration <= endWorkDayInMinutes && startMeetingInMinutes >= startWorkDayInMinutes;
};

isTimeValid('08:00', '17:30', '14:00', 90); // true
isTimeValid('10:00', '12:00', '11:00', 120); // false
isTimeValid('8:0', '10:0', '8:0', 120); // true
isTimeValid('08:00', '14:30', '14:00', 90); // false
isTimeValid('14:00', '17:30', '08:0', 90); // false
isTimeValid('8:00', '17:30', '08:00', 900); // false;
