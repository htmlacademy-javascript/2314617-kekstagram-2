import { openModal } from './fullphoto';

const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MAX_COMMENTS = 30;
const MIN_AVATAR_NUMBER = 1;
const MAX_AVATAR_NUMBER = 6;

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

const getRandomInt = (min, max) => {
  const lowerNumber = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upperNumber = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const resultNumber = Math.floor(Math.random() * (upperNumber - lowerNumber + 1) + lowerNumber);

  return resultNumber;
};

const createComment = (id) => ({
  id,
  avatar: `img/avatar-${getRandomInt(MIN_AVATAR_NUMBER, MAX_AVATAR_NUMBER)}.svg`,
  message: MESSAGES[getRandomInt(0, MESSAGES.length - 1)],
  name: NAMES[getRandomInt(0, NAMES.length - 1)],
});

const createPhoto = (id) => ({
  id,
  url: `photos/${id}.jpg`,
  description: DESCRIPTIONS[getRandomInt(0, DESCRIPTIONS.length - 1)],
  likes: getRandomInt(MIN_LIKES, MAX_LIKES),
  comments: Array.from({ length: getRandomInt(0, MAX_COMMENTS) }, (_, index) => createComment(id + index)),
});

const createGallery = (length) =>
  Array.from({ length }, (_, index) => createPhoto(index + 1));

const picturesElement = document.querySelector('.pictures');
const picturesTemplate = document.querySelector('#picture').content.querySelector('.picture');

const generatePhotoElement = (photoData) => {
  const photoElement = picturesTemplate.cloneNode(true);

  const imageElement = photoElement.querySelector('.picture__img');

  photoElement.dataset.photoId = photoData.id;
  imageElement.src = photoData.url;
  imageElement.alt = photoData.description;
  photoElement.querySelector('.picture__likes').textContent = photoData.likes;
  photoElement.querySelector('.picture__comments').textContent = photoData.comments.length;

  return photoElement;
};

const renderGallery = (galleryPhoto) => {
  const picturePhotoFragment = document.createDocumentFragment();

  galleryPhoto.forEach((photoData) => {
    const photoElement = generatePhotoElement(photoData);

    picturePhotoFragment.appendChild(photoElement);
  });

  picturesElement.appendChild(picturePhotoFragment);
};

const photoGallery = createGallery(25);

renderGallery(photoGallery);

picturesElement.addEventListener ('click', (evt) => {
  const targetPhoto = evt.target.closest('.picture');

  if (targetPhoto) {
    const numberTargetPhoto = Number(targetPhoto.dataset.photoId);
    const photoElement = photoGallery.find((photo) => photo.id === numberTargetPhoto);

    if (photoElement) {
      openModal(photoElement);
    }
  }
});
