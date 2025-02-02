const MAX_COMMENTS_LENGTH = 140;
const TAGS_INVALID = 'Хэштеги не верные';

const bodyElement = document.body;
const uploadInput = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancel = document.querySelector('.img-upload__cancel');
const uploadForm = document.querySelector('.img-upload__form');
const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');

const formFields = [textHashtags, textDescription].filter((field) => field !== null);

const isFormFieldActive = () => formFields.some((field) => field === document.activeElement);

const checkKeydown = (key) => key === 'Escape';

const closeUploadForm = () => {
  uploadOverlay.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
};

const onUploadFormClick = () => {
  closeUploadForm();
};

const onUploadFormKeydown = (evt) => {
  if (checkKeydown(evt.key) && !isFormFieldActive()) {
    closeUploadForm();
  }
};

uploadInput.addEventListener('change', (evt) => {
  evt.preventDefault();
  uploadOverlay.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  uploadInput.value = '';

  uploadCancel.addEventListener('click', onUploadFormClick);
  document.addEventListener('keydown', onUploadFormKeydown);
});

const pristineForm = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass:'.img-upload__field-wrapper--error',
});

const checkUniqueHashtags = (hashtagList) => {

  const uniqueHastags = new Set(hashtagList);

  if (uniqueHastags.size !== hashtagList.length) {
    return false;
  }

  return true;
};

const checkCountHashtags = (hashtagList) => {
  if (hashtagList.length > 5) {
    return false;
  }

  return true;
};

const checkValidHashtags = (hashtagList) => {
  const hashtagsCountRegExp = /^#[a-zа-яё0-9]{1,19}$/i;

  return hashtagList.every((tag) => hashtagsCountRegExp.test(tag));
};

const getDatasHashtags = (value) => value.toLowerCase().split(' ').filter((tag) => tag.trim() !== '');

const validateHashtags = (value) => {
  const datasHashtags = getDatasHashtags(value);
  return checkUniqueHashtags(datasHashtags) && checkCountHashtags(datasHashtags) && checkValidHashtags(datasHashtags);
};

const validateDescription = (value) => {
  if (value.length > MAX_COMMENTS_LENGTH) {
    return false;
  }

  return true;
};

pristineForm.addValidator(textHashtags, validateHashtags, TAGS_INVALID);

pristineForm.addValidator(textDescription, validateDescription, 'Максимальная длина 140 символов');
