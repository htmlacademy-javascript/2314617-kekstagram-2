const MAX_COMMENTS_LENGTH = 140;

const TAGS_INVALID = 'Хэштеги не верные';

const HASHTAGS_COUNT_REG_EXP = /^#[a-zа-яё0-9]{1,19}$/i;

const bodyElement = document.body;
const uploadInput = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancel = document.querySelector('.img-upload__cancel');
const uploadForm = document.querySelector('.img-upload__form');
const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');

const FORM_FIELDS = [textHashtags, textDescription];

const isFormFieldActive = () => FORM_FIELDS.some((field) => field === document.activeElement);

const isEscapeKey = (key) => key === 'Escape';

const closeUploadForm = () => {
  uploadOverlay.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
};

const onUploadFormClick = () => {
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

  uploadCancel.addEventListener('click', onUploadFormClick);
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

const isHashtagsCountValid = (hashtagList) => {
  if (hashtagList.length > 5) {
    return false;
  }

  return true;
};

const isHashtagValid = (hashtagList) => hashtagList.every((tag) => HASHTAGS_COUNT_REG_EXP.test(tag));

const isHashtagsValid = (value) => {
  const datasHashtags = value.toLowerCase().split(' ').filter((tag) => tag.trim() !== '');

  return isHashtagUnique(datasHashtags) && isHashtagsCountValid(datasHashtags) && isHashtagValid(datasHashtags);
};

const isDecriptionValid = (value) => value.length < MAX_COMMENTS_LENGTH;

pristineForm.addValidator(textHashtags, isHashtagsValid, TAGS_INVALID);
pristineForm.addValidator(textDescription, isDecriptionValid, 'Максимальная длина 140 символов');
