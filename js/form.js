const MAX_COMMENTS_LENGTH = 140;

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

pristineForm.addValidator(textDescription, (value) => {
  if (value.length > MAX_COMMENTS_LENGTH) {
    return false;
  }
  return true;
}, 'Максимальная длина 140 символов', 1, true);

pristineForm.addValidator(textHashtags, (value) => {
  const hashtagsCountRegExp = /^(#[a-zа-яё0-9]{1,19}(\s+|\s*$)){1,5}$/i;

  return hashtagsCountRegExp.test(value);
}, 'Превышено количество хэштегов', 2, true);

pristineForm.addValidator(textHashtags, (value) => {
  const hashtagsCountRegExp = /^(#[a-zа-яё0-9]{1,19}(\s+|\s*$)){1,}$/i;

  return hashtagsCountRegExp.test(value);
}, 'Введён невалидный хэштег', 3, true);

pristineForm.addValidator(textHashtags, (value) => {
  const hashtags = value
    .toLowerCase()
    .split(' ')
    .filter((tag) => tag.trim() !== '');

  const uniqueHastags = new Set(hashtags);

  if (uniqueHastags.size !== hashtags.length) {
    return false;
  }

  return true;
}, 'Хэштеги повторяются', 1, true);

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValidForm = pristineForm.validate();

  if (isValidForm) {
    //Код в случае валидности
  } else {
    //Код в случае невалидности
  }
});

