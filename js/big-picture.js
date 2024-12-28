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

const commentsPerPage = 5; // Переменная сохарняющие значение комментариев

const createComment = (comment) => {
  const commentPhotoElement = commentsPhotoTemplate.cloneNode(true);
  const commentImageElement = commentPhotoElement.querySelector('.social__picture');

  commentImageElement.src = comment.avatar;
  commentImageElement.alt = comment.name;
  commentPhotoElement.querySelector('.social__text').textContent = comment.message;

  return commentPhotoElement;
};

const displayComments = (photoData) => {
  let currentCommentIndex = 0; // Локальная переменная для текущего индекса

  return () => {
    const commentPhotoFragment = document.createDocumentFragment();

    // Отображаем только 5 комментариев за раз
    const commentsToShow = photoData.comments.slice(currentCommentIndex, currentCommentIndex + commentsPerPage);

    commentsToShow.forEach((comment) => {
      const commentPhotoElement = createComment(comment);
      commentPhotoFragment.appendChild(commentPhotoElement);
    });

    userComments.appendChild(commentPhotoFragment);

    // Обновляем индекс текущего комментария
    currentCommentIndex += commentsToShow.length;

    // Обновляем счётчик показанных комментариев
    commentCount.textContent = `${currentCommentIndex} из ${photoData.comments.length} комментариев`;

    // Проверяем, нужно ли скрывать кнопку "Загрузить ещё"
    if (currentCommentIndex >= photoData.comments.length) {
      commentsLoader.classList.add('hidden');
    } else {
      commentsLoader.classList.remove('hidden');
    }
  };
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

const loadMoreComments = (photoData, displayCommentsFunc) => {
  displayCommentsFunc();
};

export const openModal = (photoData) => {
  bodyElement.classList.add('modal-open');
  bigPicture.classList.remove('hidden');
  bigPictureImage.src = photoData.url;
  likesCount.textContent = photoData.likes;

  commentsLoader.classList.remove('hidden');
  commentCount.classList.remove('hidden');

  totalCommentCount.textContent = photoData.comments.length;
  authorCaption.textContent = photoData.description;

  const displayCommentsFunc = displayComments(photoData); // Создаем функцию для отображения комментариев
  displayCommentsFunc(); // Показываем первые комментарии

  commentsLoader.addEventListener('click', () => loadMoreComments(photoData, displayCommentsFunc)); // Обработчик нажатия на кнопку "Загрузить ещё"

  bigPictureClosing.addEventListener('click', handleCloseClick);
  document.addEventListener('keydown', handleCloseKeydown);
};
