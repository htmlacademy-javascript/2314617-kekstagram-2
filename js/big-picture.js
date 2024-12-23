const bodyElement = document.body;
const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('.big-picture__img').querySelector('img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentCount = bigPicture.querySelector('.social__comment-count');
const totalCommentCount = bigPicture.querySelector('.social__comment-total-count');
const userComments = bigPicture.querySelector('.social__comments');
const authorCaption = bigPicture.querySelector('.social__caption');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const bigPictureClosing = bigPicture.querySelector('.big-picture__cancel');

const commentsPhotoTemplate = document.querySelector('#comments').content.querySelector('.social__comment');

const createComment = (comment) => {
  const commentPhotoElement = commentsPhotoTemplate.cloneNode(true);
  const commentImageElement = commentPhotoElement.querySelector('.social__picture');

  commentImageElement.src = comment.avatar;
  commentImageElement.alt = comment.name;
  commentPhotoElement.querySelector('.social__text').textContent = comment.message;

  return commentPhotoElement;
};

const displayComments = (photoData) => {
  const commentPhotoFragment = document.createDocumentFragment();

  photoData.comments.forEach((comment) => {
    const commentPhotoElement = createComment(comment);
    commentPhotoFragment.appendChild(commentPhotoElement);
  });

  userComments.appendChild(commentPhotoFragment);
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  userComments.innerHTML = '';

  bigPictureClosing.removeEventListener('click', handleCloseClick);
  document.removeEventListener('keydown', handleCloseKeydown);
};

function handleCloseClick () {
  closeBigPicture();
}

function handleCloseKeydown (evt) {
  if (evt.key === 'Escape') {
    closeBigPicture();
  }
}

export const openModal = (photoData) => {
  bodyElement.classList.add('modal-open');
  bigPicture.classList.remove('hidden');
  bigPictureImage.src = photoData.url;
  likesCount.textContent = photoData.likes;

  commentsLoader.classList.add('hidden');
  commentCount.classList.add('hidden');

  totalCommentCount.textContent = photoData.comments.length;
  authorCaption.textContent = photoData.description;

  displayComments(photoData);

  bigPictureClosing.addEventListener('click', handleCloseClick);
  document.addEventListener('keydown', handleCloseKeydown);
};
