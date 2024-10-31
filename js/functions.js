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

const getMinutes = function (time) {

  const arrayTime = time.split(':');
  const sumMinutes = Number(arrayTime[0]) * 60 + Number(arrayTime[1]);

  return sumMinutes;
};

const getTrueTime = function (startWorkDay, endWorkDay, startMeeting, duration) {
  const startMeetinMinutes = getMinutes(startMeeting);

  if (getMinutes(startWorkDay) > startMeetinMinutes || startMeetinMinutes + duration > getMinutes(endWorkDay)) {
    return false;
  }

  return true;
};

console.log(getTrueTime('08:00', '17:30', '14:00', 90)); // true
console.log(getTrueTime('8:0', '10:0', '8:0', 120)); // true
console.log(getTrueTime('08:00', '14:30', '14:00', 90)); // false
console.log(getTrueTime('14:00', '17:30', '08:0', 90)); // false
console.log(getTrueTime('8:00', '17:30', '08:00', 900)); // false
