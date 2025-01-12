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

let dataComments = [];
const displayedCommentsCount = 5;
let currentComment = 0;

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
  const commentsToShow = dataComments.slice(currentComment, currentComment + displayedCommentsCount);

  commentsToShow.forEach((comment) => {
    const commentPhotoElement = createComment(comment);
    commentPhotoFragment.append(commentPhotoElement);
  });

  userComments.append(commentPhotoFragment);

  currentComment += commentsToShow.length;
  shownCommentCount.textContent = currentComment;

  if (currentComment >= dataComments.length) {
    commentsLoader.classList.add('hidden');
  }
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  userComments.innerHTML = '';
  currentComment = 0;

  bigPictureClosing.removeEventListener('click', handleCloseClick);
  document.removeEventListener('keydown', handleCloseKeydown);
  commentsLoader.removeEventListener('click', displayComments);
  document.removeEventListener('keydown', displayComments);
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
  dataComments = photoData.comments;

  bodyElement.classList.add('modal-open');
  bigPicture.classList.remove('hidden');
  bigPictureImage.src = photoData.url;
  likesCount.textContent = photoData.likes;

  commentsLoader.classList.remove('hidden');
  commentCount.classList.remove('hidden');

  totalCommentCount.textContent = photoData.comments.length;
  authorCaption.textContent = photoData.description;

  commentsLoader.addEventListener('click', displayComments);

  bigPictureClosing.addEventListener('click', handleCloseClick);
  document.addEventListener('keydown', handleCloseKeydown);
  displayComments(photoData);
};
