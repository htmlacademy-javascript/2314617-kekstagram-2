const bodyElement = document.body;
const uploadInput = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancel = document.querySelector('.img-upload__cancel');

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
