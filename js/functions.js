// Функция для проверки длинны строки
const isStrLengthValid = (str, maxLength) => str.length <= maxLength;

isStrLengthValid('abcdefghi', 10);
isStrLengthValid('abcedfghij', 10);
isStrLengthValid('abcdefghijk', 10);

// Функция для проверки строки-палиндрома
const isPalindrome = (str) => {
  const text = str.replaceAll(' ', '').toLowerCase();

  for(let i = 0; i < text.length / 2; i++) {
    if(text.at(i) !== text.at(-1 - i)) {
      return false;
    }
  }

  return true;
};

isPalindrome('ТоПоТ');

// Функция для извлечение числа
const extractNumbers = (str) => {

  let number = '';

  for(const n of str) {
    if(Number.isNaN(parseInt(n, 10))) {
      number += '';
    } else {
      number += n;
    }
  }

  return parseInt(number, 10);
};

extractNumbers('Коля 230 и -1 годик');
