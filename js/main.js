
// let object1 = {
// id: 1,
// url: "photos/1.jpg",
// description: "Красивое фото",
// likes: 15, // случайное число от 15 до 200
// comments: [{
// id: 135,
// avatar: "img/avatar-6.svg", // случайная фотография от 1 до 6
// message: "Всё отлично!", // 1 или 2 случайных сообщения
// name: "Коля", // случайное имя из списка
// }], // комментарии пользователей от 0 до 30
// };

// Функция для генерации объектов
// let generateObject = function () {
//   const arr = [];
//   const description = ['Крутое фото', 'Классное фото', 'Удачное фото'];
//   for (let i = 0; i < 25; i++) {
//     const object = {
//       id: i + 1,
//       url: `photos/${i + 1}.jpg`,
//       description: description[i],
//       // description: `Описание - ${i + 1}`,
//       // likes: generateLikes(),
//       // comments: generateComments(),
//     };
//     arr.push(object);
//   }
//   return arr;
// };

const DESCRIPTIONS = [
  'Рассвет над морем',
  'Уютный вечер у камина',
  'Закат в горах',
  'Летний день на пляже',
  'Весенний лес',
  'Зимний пейзаж',
  'Утренняя прогулка по парку',
  'Вечерний город',
  'Дети играют во дворе',
  'Семья на пикнике',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Даниил',
  'Захар',
  'Лев',
  'Эдуард',
  'Ярослав',
  'Аглая',
  'Василиса',
  'Тимофей',
  'Фёдор',
  'Григорий',
];

const getRandomInt = (min, max) => (Math.ceil(Math.random() * (max - min) + min));

const createComment = (id) => ({id: id, avatar: `img/avatar${getRandomInt(1, 6)}.svg`, message: MESSAGES[getRandomInt(0, MESSAGES.length)], name: NAMES[getRandomInt(0, NAMES.length)]}); // Генерация комментария

const getPhoto = (id) => ({id: id, url: `photos/${id}.jpg`, description: DESCRIPTIONS[getRandomInt(0, DESCRIPTIONS.length)], likes: getRandomInt(15, 200), comments: Array.from({length: getRandomInt(0, 30)}, createComment(id))}); // Генерация объекта

const getPhotoArray = (arrayLength) => (Array.from({length: arrayLength}, getPhoto)); // Добавление объектов описывающих фотографию в массив

getPhotoArray(25);
