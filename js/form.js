import { isEscapeKey } from './util.js';

const MAX_COMMENTS_LENGTH = 140;
const MAX_HASHTAGS_AMOUNT = 5;
const TAGS_INVALID = 'Хэштеги не верные';
const COMMENTS_INVALID = 'Максимальная длина 140 символов';
const HASHTAGS_REG_EXP = /^#[a-zа-яё0-9]{1,19}$/i;

const bodyElement = document.body;
const uploadInput = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancel = document.querySelector('.img-upload__cancel');
const uploadForm = document.querySelector('.img-upload__form');
const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');

const formFields = [textHashtags, textDescription];

const isFormFieldActive = () => formFields.some((field) => field === document.activeElement);

const closeUploadForm = () => {
  uploadOverlay.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
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

const isHashtagsCountValid = (hashtagList) => hashtagList.length <= MAX_HASHTAGS_AMOUNT;

const isHashtagValid = (hashtagList) => hashtagList.every((tag) => HASHTAGS_REG_EXP.test(tag));

const isHashtagsValid = (value) => {
  const datasHashtags = value.toLowerCase().split(' ').filter((tag) => tag.trim() !== '');

  return isHashtagUnique(datasHashtags) && isHashtagsCountValid(datasHashtags) && isHashtagValid(datasHashtags);
};

const isDecriptionValid = (value) => value.length < MAX_COMMENTS_LENGTH;

pristineForm.addValidator(textHashtags, isHashtagsValid, TAGS_INVALID);
pristineForm.addValidator(textDescription, isDecriptionValid, COMMENTS_INVALID);
