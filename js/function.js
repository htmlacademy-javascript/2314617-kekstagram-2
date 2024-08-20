// Функция для проверки длинны строки
const checkLength = (string, maxLength) => {
  const result = string.length <= maxLength;
  return result;
};

checkLength('abcdefghi', 10);
checkLength('abcedfghij', 10);
checkLength('abcdefghijk', 10);

// Функция для проверки строки-палиндрома
const checkPalindrome = (string) => {
  const text = string.replaceAll(' ','').toLowerCase();
  let newText = '';
  for(let i = text.length - 1; i >= 0; i--) {
    newText += text.at(i);
  }
  const normalText = newText === text;
  return normalText;
};

checkPalindrome('Лёша на полке клопа нашёл ');

// Функция для извлечение числа
const getNumber = (string) => {
  let number = '';
  for(let i = 0; i < string.length; i++) {
    if(Number.isNaN(parseInt(string[i], 10))) {
      number += '';
    } else {
      number += string[i];
    }
  }
  return parseInt(number, 10);
};

getNumber('Коля 230 и -1 годик');
