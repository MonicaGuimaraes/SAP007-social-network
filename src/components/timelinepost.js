import {
  removePost, editPost, likePost, removeLikePost, createCommentPost,
} from '../pages/feed/firestore-functions.js';

import { createComments } from './comments.js';

import { generalErrors, toggleMenu } from './functions-components.js';

export function postElement(post, user, postId) {
  let numberLikes = post.like.length;
  const date = new Date(post.day.seconds * 1000);
  const timelinePost = document.createElement('div');
  timelinePost.setAttribute('class', 'box-post flex column');
  timelinePost.innerHTML = `
    <section class="warnings-feed" id="warnings-feed">
      <p class="warnings-feed-general" id="warnings-feed-general">
      Aconteceu um probleminha... Mianamnida!! "o" Tente novamente mais tarde!
      </p>
      <p class="warnings-feed-post" id="warnings-feed-post">
      Infelizmente não estamos conseguindo compartilhar a sua mensagem...
      </p>
      <p class="warnings-feed-empty-post" id="warnings-feed-empty-post">
      Não deixe sua mensagem vazia, compartilhe algo com a gente!
      </p>
    </section>
    <div class="informations-user flex">
      <div class="photo-name-post flex">
        <figure class="post-img-user" ><img class="post-img-user" src="${post.imgProfile}" alt="user"></figure>
        <div class="name-modified-status flex column">
          <p class="post-name-user">${post.name}</p>
          <div class="message-modified-post">
            <p class="post-modified" id="post-modified">${post.edit}</p>
          </div>
        </div>
      </div> 
      <nav class="nav-remove-modify flex">
      </nav>
    </div>
    <div class="post-text-id flex column">
      <p class="post-date">${date.getDate()}/${(date.getMonth() + 1)}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}</p>
      <p class="post-text" id="post-text">${post.message}</p>
    </div>
    <div class="like-comment flex">
      <div class="btns-like-comment flex">
        <button class="post-like btn-config"><p class="value-like">${numberLikes}</p><img src="./img/iconeLike.png" alt="Botão like" class="btn-like-post">Curtir</button>
        <button class="post-comment btn-config"><img src="./img/iconeBalao.png" alt="Botão comentar" class="bnt-comment-post">Comentar</button>
      </div>
      <form class="form-comment">
        <textarea class="comment-input-value">
        </textarea>
        <button class="confirm-comment btn-edit-style">Confirmar</button>
        <button class="close-comment btn-edit-style">Cancelar</button>
      </form>
    </div>`;

  const btnLike = timelinePost.querySelector('.post-like');
  const paragraphLikeValue = timelinePost.querySelector('.value-like');
  const warningsSection = timelinePost.querySelector('.warnings-feed');
  const warningPost = timelinePost.querySelector('.warnings-feed-post');
  const warningEmptyPost = timelinePost.querySelector('.warnings-feed-empty-post');
  const warningGeneral = timelinePost.querySelector('warnings-feed-general');

  let userLike = post.like.filter((people) => people === user.uid);

  if (userLike.length !== 0) {
    timelinePost.querySelector('.btn-like-post').src = './img/iconeLikePreenchido.png';
  }

  btnLike.addEventListener('click', () => {
    if (userLike.length === 0) {
      likePost(postId, user.uid).then(() => {
        userLike.push(user.uid);
        numberLikes += 1;
        paragraphLikeValue.textContent = `${numberLikes}`;
        timelinePost.querySelector('.btn-like-post').src = './img/iconeLikePreenchido.png';
      }).catch(() => {
        generalErrors(warningGeneral, warningsSection);
      });
    } else {
      removeLikePost(postId, user.uid).then(() => {
        userLike = [];
        numberLikes -= 1;
        paragraphLikeValue.textContent = `${numberLikes}`;
        timelinePost.querySelector('.btn-like-post').src = './img/iconeLike.png';
      }).catch(() => {
        generalErrors(warningGeneral, warningsSection);
      });
    }
  });

  const divLikePost = timelinePost.querySelector('.like-comment');
  const commentPost = timelinePost.querySelector('.post-comment');
  const formComment = timelinePost.querySelector('.form-comment');
  const btnConfirmComment = timelinePost.querySelector('.confirm-comment');
  const btnCancelComment = timelinePost.querySelector('.close-comment');
  const inputComment = timelinePost.querySelector('.comment-input-value');

  commentPost.addEventListener('click', () => {
    toggleMenu(formComment);
  });

  btnCancelComment.addEventListener('click', (e) => {
    e.preventDefault();
    toggleMenu(formComment);
    inputComment.value = '';
  });

  btnConfirmComment.addEventListener('click', (e) => {
    e.preventDefault();
    const comment = {};
    comment.name = user.displayName;
    comment.userUid = user.uid;
    comment.imgProfile = user.photoURL;
    comment.message = inputComment.value;
    comment.day = new Date();
    comment.day.seconds = comment.day.getTime() / 1000;

    if (comment.message.trim().length !== 0 && comment.message !== ' ' && comment.message !== null && comment.message !== false) {
      createCommentPost(postId, comment).then(() => {
        toggleMenu(formComment);
        inputComment.value = '';
        divLikePost.appendChild(createComments(comment, user, postId));
      }).catch(() => {
        generalErrors(warningPost, warningsSection);
      });
    } else {
      generalErrors(warningEmptyPost, warningsSection);
    }
  });

  if (post.comment.length !== 0) {
    post.comment.forEach((oneComment) => {
      divLikePost.appendChild(createComments(oneComment, user, postId));
    });
  }

  const navRemoveModifie = timelinePost.querySelector('.nav-remove-modify');
  const mainPost = timelinePost.querySelector('.post-text-id');

  const modifyForm = document.createElement('form');
  modifyForm.setAttribute('class', 'form-modify-post');
  modifyForm.innerHTML = `
  <div class="content-edit-post flex">
    <textarea class="modify-input-value">
    </textarea>
    <button class="confirm-modify btn-edit-style">Confirmar Editar</button>
    <button class="close-modify btn-edit-style">Cancelar Editar</button>
  </div>
  `;

  const modalDelete = document.createElement('div');
  modalDelete.setAttribute('class', 'modal-delete');
  modalDelete.innerHTML = `
  <div class="modal-delete-confirm">
    <h3 class="title-modal-delete">Você tem certeza que deseja excluir essa postagem?</h3>
    <button class="confirm-delete btn-edit-style">Confirmar</button>
    <button class="close-delete btn-edit-style">Cancelar</button>
  </div>
  `;

  if (user.uid === post.userUid) {
    timelinePost.appendChild(modalDelete);
    mainPost.appendChild(modifyForm);
    navRemoveModifie.innerHTML = `
    <button class="meatball-menu flex">
      <span id="balls" class="balls"></span>
      <span id="balls" class="balls"></span>
      <span id="balls" class="balls"></span>
    </button>
    <div class="menu-edit-remove">
      <ul class="configs-posts">
        <li class="btn-config"><button class="btn-config remove"><img src="./img/iconeLixeira.png" alt="Icone remover post" class="img-delete"></button></li>
        <li class="btn-config"><button class="modify btn-config"><img src="./img/iconeEditar.png" alt="Icone editar post" class="img-edit"></button></li>
      </ul> 
    </div>  `;

    const btnRemove = timelinePost.querySelector('.remove');
    const btnDeletePost = timelinePost.querySelector('.confirm-delete');
    const btnCancelDeletePost = timelinePost.querySelector('.close-delete');
    const btnEdit = timelinePost.querySelector('.modify');
    const btnCancelEdit = timelinePost.querySelector('.close-modify');
    const btnConfirmEdit = timelinePost.querySelector('.confirm-modify');
    const inputModify = timelinePost.querySelector('.modify-input-value');
    const btnMenu = timelinePost.querySelector('.meatball-menu');
    const menuEditRemove = timelinePost.querySelector('.menu-edit-remove');

    btnMenu.addEventListener('click', () => {
      toggleMenu(menuEditRemove);
    });

    btnEdit.addEventListener('click', () => {
      modifyForm.style.display = 'block';
      inputModify.value = timelinePost.querySelector('#post-text').textContent;
      toggleMenu(menuEditRemove);
    });

    btnCancelEdit.addEventListener('click', (e) => {
      e.preventDefault();
      inputModify.value = '';
      modifyForm.style.display = 'none';
    });

    btnConfirmEdit.addEventListener('click', (e) => {
      e.preventDefault();
      if (inputModify.value !== post.message && inputModify.value.trim().length !== 0) {
        editPost(postId, inputModify.value)
          .then(() => {
            timelinePost.querySelector('#post-text').textContent = inputModify.value;
            inputModify.value = '';
            modifyForm.style.display = 'none';
            timelinePost.querySelector('#post-modified').textContent = 'Editado';
          }).catch(() => generalErrors(warningGeneral, warningsSection));
      } else {
        inputModify.value = '';
        modifyForm.style.display = 'none';
      }
    });

    btnRemove.addEventListener('click', () => {
      modalDelete.style.display = 'block';
      toggleMenu(menuEditRemove);
    });
    btnDeletePost.addEventListener('click', (e) => {
      e.preventDefault();
      removePost(postId).then(() => {
        timelinePost.innerHTML = '';
      }).catch(() => generalErrors(warningGeneral, warningsSection));
    });

    btnCancelDeletePost.addEventListener('click', (e) => {
      e.preventDefault();
      modalDelete.value = '';
      modalDelete.style.display = 'none';
    });
  }
  return timelinePost;
}
