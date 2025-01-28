const DISPLAYED_COMMENTS_COUNT = 5;

const bodyElement = document.body;
const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('.big-picture__img').querySelector('img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentCount = bigPicture.querySelector('.social__comment-count');
const totalCommentCount = bigPicture.querySelector('.social__comment-total-count');
const shownCommentCount = bigPicture.querySelector('.social__comment-shown-count');
const userComments = bigPicture.querySelector('.social__comments');
const authorCaption = bigPicture.querySelector('.social__caption');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const bigPictureClosing = bigPicture.querySelector('.big-picture__cancel');

const commentsPhotoTemplate = document.querySelector('#comments').content.querySelector('.social__comment');

let photoComments = [];
let currentVisibleComment = 0;

const createComment = (comment) => {
  const commentPhotoElement = commentsPhotoTemplate.cloneNode(true);
  const commentImageElement = commentPhotoElement.querySelector('.social__picture');

  commentImageElement.src = comment.avatar;
  commentImageElement.alt = comment.name;
  commentPhotoElement.querySelector('.social__text').textContent = comment.message;

  return commentPhotoElement;
};

const displayComments = () => {
  const commentPhotoFragment = document.createDocumentFragment();
  const commentsToShow = photoComments.slice(currentVisibleComment, currentVisibleComment + DISPLAYED_COMMENTS_COUNT);

  commentsToShow.forEach((comment) => {
    const commentPhotoElement = createComment(comment);
    commentPhotoFragment.append(commentPhotoElement);
  });

  userComments.append(commentPhotoFragment);

  currentVisibleComment += commentsToShow.length;
  shownCommentCount.textContent = currentVisibleComment;

  if (currentVisibleComment >= photoComments.length) {
    commentsLoader.classList.add('hidden');
  }
};

function onCommentsLoaderClick () {
  displayComments();
}

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  commentCount.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  userComments.innerHTML = '';
  shownCommentCount.innerHTML = '';
  totalCommentCount.innerHTML = '';
  currentVisibleComment = 0;

  bigPictureClosing.removeEventListener('click', onBigPictureClick);
  document.removeEventListener('keydown', onBigPictureKeydown);
  commentsLoader.removeEventListener('click', onCommentsLoaderClick);
  document.removeEventListener('keydown', onCommentsLoaderClick);
};

function onBigPictureClick () {
  closeBigPicture();
}

function onBigPictureKeydown (evt) {
  if (evt.key === 'Escape') {
    closeBigPicture();
  }
}

export const openModal = (photoData) => {
  photoComments = photoData.comments;

  bodyElement.classList.add('modal-open');
  bigPicture.classList.remove('hidden');
  bigPictureImage.src = photoData.url;
  likesCount.textContent = photoData.likes;

  commentsLoader.classList.remove('hidden');
  commentCount.classList.remove('hidden');

  totalCommentCount.textContent = photoData.comments.length;
  authorCaption.textContent = photoData.description;

  commentsLoader.addEventListener('click', onCommentsLoaderClick);

  bigPictureClosing.addEventListener('click', onBigPictureClick);
  document.addEventListener('keydown', onBigPictureKeydown);
  displayComments();
};
