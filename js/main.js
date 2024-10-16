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
