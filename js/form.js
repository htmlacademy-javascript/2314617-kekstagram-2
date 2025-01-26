const bodyElement = document.body;
const uploadInput = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancel = document.querySelector('.img-upload__cancel');
const uploadForm = document.querySelector('.img-upload__form');
const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');

uploadInput.addEventListener('change', (evt) => {
  evt.preventDefault();
  uploadOverlay.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  uploadInput.value = '';

  uploadCancel.addEventListener('click', handleCloseClick);
  document.addEventListener('keydown', handleCloseKeydown);
});

const closeUploadInput = () => {
  uploadOverlay.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
};

function handleCloseClick () {
  closeUploadInput();
}

function handleCloseKeydown (evt) {
  if (evt.key === 'Escape') {
    closeUploadInput();
  }
}

textHashtags.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
});

textDescription.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
});

const pristineForm = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass:'.img-upload__field-wrapper--error',
});

pristineForm.addValidator(textHashtags, (value) => {
  const hashtagsCountRegExp = /^(#[a-zа-яё0-9]{1,19}(\s+|\s*$)){1,5}$/i;

  return hashtagsCountRegExp.test(value);
}, 'Превышено количество хэштегов', 2, true);

pristineForm.addValidator(textHashtags, (value) => {
  const hashtagsCountRegExp = /^(#[a-zа-яё0-9]{1,19}(\s+|\s*$)){1,}$/i;

  return hashtagsCountRegExp.test(value);
}, 'Введён невалидный хэштег', 3, true);

pristineForm.addValidator(textHashtags, (value) => {
  const hashtags = value.split(' ').filter((valueFilter) => valueFilter !== '');

  for (let i = 0; i <= hashtags.length; i++) {
    for (let j = i + 1; j <= hashtags.length; j++) {
      if (hashtags[i] === hashtags[j]) {
        return false;
      }
    }
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

