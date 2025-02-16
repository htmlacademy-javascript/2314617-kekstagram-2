import { isEscapeKey } from './util.js';

const MAX_COMMENTS_LENGTH = 140;
const MAX_HASHTAGS_COUNT = 5;
const TAGS_INVALID = 'Хэштеги не верные';
const COMMENTS_INVALID = 'Максимальная длина 140 символов';
const HASHTAG_PATTERN = /^#[a-zа-яё0-9]{1,19}$/i;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const STEP_SCALE = 25;

const EFFECTS = {
  none: { min: 0, max: 0, step: 0, filter: '' },
  chrome: { min: 0, max: 1, step: 0.1, filter: 'grayscale' },
  sepia: { min: 0, max: 1, step: 0.1, filter: 'sepia' },
  marvin: { min: 0, max: 100, step: 1, filter: 'invert', unit: '%' },
  phobos: { min: 0, max: 3, step: 0.1, filter: 'blur', unit: 'px' },
  heat: { min: 1, max: 3, step: 0.1, filter: 'brightness' }
};

const bodyElement = document.body;
const uploadInput = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancel = document.querySelector('.img-upload__cancel');
const uploadForm = document.querySelector('.img-upload__form');
const uploadPreview = document.querySelector('.img-upload__preview');
const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');
const scaleValue = document.querySelector('.scale__control--value');
const scaleBigger = document.querySelector('.scale__control--bigger');
const scaleSmaller = document.querySelector('.scale__control--smaller');
const imagePreview = document.querySelector('.img-upload__preview img');
const effectLevel = document.querySelector('.img-upload__effect-level');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectsList = document.querySelector('.effects__list');

const formFields = [textHashtags, textDescription];

const resetEffects = () => {
  imagePreview.style.filter = '';
  effectLevelValue.value = '';
  imagePreview.className = '';
  effectLevel.classList.add('hidden');
  document.querySelector('#effect-none').checked = true;
};

const isFormFieldActive = () => formFields.some((field) => field === document.activeElement);

const closeUploadForm = () => {
  uploadOverlay.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  resetEffects();
};

const onCancelClick = () => {
  closeUploadForm();
};

const onUploadFormKeydown = (evt) => {
  if (isEscapeKey(evt.key) && !isFormFieldActive()) {
    closeUploadForm();
  }
};

uploadInput.addEventListener('change', (evt) => {
  evt.preventDefault();
  uploadOverlay.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  uploadInput.value = '';

  uploadCancel.addEventListener('click', onCancelClick);
  document.addEventListener('keydown', onUploadFormKeydown);
});

const pristineForm = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass:'.img-upload__field-wrapper--error',
});

const isHashtagUnique = (hashtagList) => {
  const uniqueHastags = new Set(hashtagList);

  return uniqueHastags.size === hashtagList.length;
};

const isHashtagsCountValid = (hashtagList) => hashtagList.length <= MAX_HASHTAGS_COUNT;

const isHashtagValid = (hashtagList) => hashtagList.every((tag) => HASHTAG_PATTERN.test(tag));

const isHashtagsValid = (value) => {
  const datasHashtags = value.toLowerCase().split(' ').filter((tag) => tag.trim() !== '');
  const hashtags = isHashtagUnique(datasHashtags) && isHashtagsCountValid(datasHashtags) && isHashtagValid(datasHashtags);

  const checkingHashtags = value === '' ? true : hashtags;

  return checkingHashtags;
};

const isDecriptionValid = (value) => value.length < MAX_COMMENTS_LENGTH;

pristineForm.addValidator(textHashtags, isHashtagsValid, TAGS_INVALID);
pristineForm.addValidator(textDescription, isDecriptionValid, COMMENTS_INVALID);

const getCurrentValue = () => parseInt(scaleValue.value.replace('%', ''), 10);

const setScale = (newValue) => {
  scaleValue.value = `${newValue}%`;
  uploadPreview.style.transform = `scale(${newValue / 100})`;
};

scaleSmaller.addEventListener('click', () => {
  setScale(Math.max(getCurrentValue() - STEP_SCALE, MIN_SCALE));
});

scaleBigger.addEventListener('click', () => {
  setScale(Math.min(getCurrentValue() + STEP_SCALE, MAX_SCALE));
});

noUiSlider.create(effectLevelSlider, {
  range: {
    min: 0,
    max: 1
  },
  start: 0.5,
  step: 0.1,
  connect: 'lower',
  format: {
    to: (value) => Number.isInteger(value) ? value : value.toFixed(1),
    from: (value) => parseFloat(value)
  }
});

const updateFilter = (effect) => {
  const { min, max, step, filter, unit = '' } = EFFECTS[effect];

  effectLevelSlider.noUiSlider.updateOptions({
    range: { min, max },
    start: max,
    step
  });

  effectLevelSlider.noUiSlider.on('update', (values) => {
    const value = values[0];
    effectLevelValue.value = value;
    imagePreview.style.filter = effect === 'none' ? '' : `${filter}(${value}${unit})`;
  });
};

const onEffectChange = (evt) => {
  const effect = evt.target.value;
  imagePreview.className = `effects__preview--${effect}`;

  if (effect === 'none') {
    effectLevel.classList.add('hidden');
  } else {
    effectLevel.classList.remove('hidden');
  }

  updateFilter(effect);
};

effectLevel.classList.add('hidden');
effectsList.addEventListener('change', onEffectChange);
