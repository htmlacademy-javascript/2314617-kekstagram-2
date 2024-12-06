const modalStopScroll = document.querySelector('body');

const fullPhoto = document.querySelector('.big-picture');

const fullPhotoImage = fullPhoto.querySelector('.big-picture__img').querySelector('img');

const fullPhotoLikes = fullPhoto.querySelector('.likes-count');

const fullPhotoCommentCount = fullPhoto.querySelector('.social__comment-count');
const fullPhotoShownComments = fullPhoto.querySelector('.social__comment-shown-count');
const fullPhotoTotalComments = fullPhoto.querySelector('.social__comment-total-count');
const fullPhotoComments = fullPhoto.querySelector('.social__comments');

const fullPhotoCaption = fullPhoto.querySelector('.social__caption');

const fullPhotoLoader = fullPhoto.querySelector('.comments-loader');

const displayCommentFullPhoto = (filledPhoto) => {
  const commentsPhotoTemplate = document.querySelector('#comments').content.querySelector('.social__comment');

  const commentPhotoFragment = document.createDocumentFragment();

  filledPhoto.comments.forEach((comment) => {
    const commentPhotoElement = commentsPhotoTemplate.cloneNode(true);
    const commentImageElement = commentPhotoElement.querySelector('.social__picture');

    commentImageElement.src = comment.avatar;
    commentImageElement.alt = comment.name;

    commentPhotoElement.querySelector('.social__text').textContent = comment.message;
    commentPhotoFragment.appendChild(commentPhotoElement);
  });

  fullPhotoComments.appendChild(commentPhotoFragment);
};

const closedFullPhoto = () => {
  const fullPhotoClose = fullPhoto.querySelector('.big-picture__cancel');

  fullPhotoClose.addEventListener('click', () => {
    fullPhoto.classList.add('hidden');
    modalStopScroll.classList.remove('modal-open');
    fullPhotoComments.innerHTML = '';
  });

  document.addEventListener('keydown', (evt) => {
    if (!fullPhoto.classList.contains('hidden')) {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        fullPhoto.classList.add('hidden');
        modalStopScroll.classList.remove('modal-open');
        fullPhotoComments.innerHTML = '';
      }
    }
  });
};

export const openModal = (filledPhoto) => {

  modalStopScroll.classList.add('modal-open');

  fullPhoto.classList.remove('hidden');
  fullPhotoImage.src = filledPhoto.url;
  fullPhotoLikes.textContent = filledPhoto.likes;

  if (filledPhoto.comments.length > 1) {
    fullPhotoShownComments.textContent = Math.ceil(filledPhoto.comments.length / 2);
  } else if (filledPhoto.comments.length < 1) {
    fullPhotoShownComments.textContent = '';
    fullPhotoCommentCount.innerHTML = fullPhotoCommentCount.innerHTML.replace('из', '');
  } else {
    fullPhotoShownComments.textContent = 1;
  }

  fullPhotoLoader.classList.add('hidden');

  fullPhotoCommentCount.classList.add('hidden');

  fullPhotoTotalComments.textContent = filledPhoto.comments.length;
  fullPhotoCaption.textContent = filledPhoto.description;

  displayCommentFullPhoto(filledPhoto);
};

closedFullPhoto();
