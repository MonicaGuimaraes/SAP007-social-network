/*
* @jest-environment jsdom
*/
import { feed } from '../../src/pages/feed/feed.js';
import {
  createPost,
  getAllPosts,
  authLogOut,
  removePost,
} from '../../src/pages/feed/firestore-functions.js';
import {
  postElement,
} from '../../src/components/timelinepost.js';
// import { generalErrors } from '../../src/components/functions-components.js';

jest.mock('../../src/configurafirebase/exports.js');
jest.mock('../../src/pages/feed/firestore-functions.js');

const user = {
  photoURL: '',
  displayName: '',
  uid: '',
};

const user1 = {
  photoURL: '',
  displayName: 'Nome',
  uid: 'uid',
};

const posts = [
  {
    id: 'beleza',
    data() {
      return {
        message: 'testando',
        edit: '',
        userUid: user1.uid,
        name: user1.displayName,
        imgProfile: user1.photoURL,
        like: [],
        comment: [],
        day: { second: new Date().getTime() / 1000 },
      };
    },
  },
  {
    id: 'oi',
    data() {
      return {
        message: 'testando',
        edit: '',
        userUid: user.uid,
        name: user.displayName,
        imgProfile: user.photoURL,
        like: [user1.uid],
        comment: [],
        day: { second: new Date().getTime() / 1000 },
      };
    },
  },
];

console.log(posts[1].data().like.length);

describe('feed e getAllPosts', () => {
  it('feed(user) deve ser um Node.ELEMENT_NODE (1) e getAllPosts deve ser chamada', () => {
    getAllPosts.mockRejectedValueOnce();
    expect(feed(user).nodeType).toBe(1);
    console.log()
    expect(getAllPosts).toHaveBeenCalled();
  });
});

describe('createPost(post)', () => {
  getAllPosts.mockResolvedValueOnce();
  const timeline = feed(user);
  const input = timeline.querySelector('#input-post');
  const btnPost = timeline.querySelector('#btn-post');
  const warningsSection = timeline.querySelector('#warnings-feed');
  const warningPost = timeline.querySelector('#warnings-feed-post');

  it('createPost(post) deve ter sido chamada pelo menos uma vez, deve ter um objeto na chamada que contenha {message: "testando", ...', () => {
    createPost.mockResolvedValueOnce();

    input.value = 'testando';
    btnPost.dispatchEvent(new Event('click'));

    expect(createPost).toHaveBeenCalledTimes(1);
    expect(createPost.mock.calls).toMatchObject([[{
      message: 'testando',
      edit: '',
      userUid: user.uid,
      name: user.displayName,
      imgProfile: user.photoURL,
      like: [],
      comment: [],
    }]]);
  });

  it('create(post) não deve ser chamado', () => {
    input.value = '';
    btnPost.dispatchEvent(new Event('click'));
    expect(createPost.mock.calls).toHaveLength(1);
  });

  it('CreatePost é chamada e entra em catch adicionando a class active para warningsSection e depois de 4 seg a class não existe mais', async () => {
    createPost.mockRejectedValueOnce({ code: 'nada' });
    input.value = 'testando';
    btnPost.dispatchEvent(new Event('click'));
    expect(warningsSection.classList.contains('active')).toBe(true);
    expect(warningPost.classList.contains('active')).toBe(true);
    await new Promise(process.nextTick);
    expect(createPost).toHaveBeenCalledTimes(2);
    expect(warningsSection.classList.contains('active')).toBe(false);
    expect(warningPost.classList.contains('active')).toBe(false);
  });
});

describe('postElement() e getAllPosts', () => {
  it('postElement(post, user, id) deve retornar uma div ou p Node.ELEMENT_NODE (1)', async () => {
    await getAllPosts.mockResolvedValueOnce();
    expect(postElement(posts[1].data(), user, await createPost.mockReturnValue({ id: 'oi' })).nodeType).toBe(1);
  });
});

describe('AuthLogOut', () => {
  it('AuthLogOut() deve ter sido chamada após o click', () => {
    getAllPosts.mockResolvedValueOnce();
    authLogOut.mockResolvedValueOnce();
    const timeline = feed(user);
    const btnLogOut = timeline.querySelector('#btn-log-out');
    btnLogOut.dispatchEvent(new Event('click'));
    expect(authLogOut).toHaveBeenCalled();
  });

  it('AuthLogOut() deve ter sido chamada após o click mas restornado um valor rejeitado', () => {
    getAllPosts.mockResolvedValueOnce();
    authLogOut.mockRejectedValueOnce();
    const timeline = feed(user);
    const btnLogOut = timeline.querySelector('#btn-log-out');
    btnLogOut.dispatchEvent(new Event('click'));
    expect(authLogOut).toHaveBeenCalled();
  });
});

describe('postElement com user logado igual user do post', () => {
  it('PostElement() Menu de exclusão e edição aparecem no timelinepost se o user for dono do post', () => {
    const timelinePost = postElement(posts[1].data(), user, posts[1].id);
    const navRemoveModifie = timelinePost.querySelector('.nav-remove-modify');
    expect(navRemoveModifie.childNodes).toHaveLength(5);
  });

  it('PostElement() Menu de exclusão e edição não aparecem se o user não for dono do post', () => {
    const timelinePost = postElement(posts[0].data(), user, posts[0].id);
    const navRemoveModifie = timelinePost.querySelector('.nav-remove-modify');
    expect(navRemoveModifie.childNodes).toHaveLength(1);
  });
});

describe('removepost()', () => {
  const timelinePost = postElement(posts[1].data(), user, posts[1].id);
  const btnMenu = timelinePost.querySelector('.meatball-menu');
  const btnRemove = timelinePost.querySelector('.remove');
  const btnDeletePost = timelinePost.querySelector('.confirm-delete');
  const menuEditRemove = timelinePost.querySelector('.menu-edit-remove');
  const modalDelete = timelinePost.querySelector('.modal-delete');
  const btnCancelDeletePost = timelinePost.querySelector('.close-delete');

  it('Quando clicar no botão MeatBall abre as configurações e aprece a opção de exclusão, quando clicado exclui o postElement', async () => {
    removePost.mockResolvedValueOnce();
    btnMenu.dispatchEvent(new Event('click'));
    expect(menuEditRemove.classList.contains('active')).toBe(true);
    btnRemove.dispatchEvent(new Event('click'));
    expect(modalDelete.style.display).toBe('block');
    btnDeletePost.dispatchEvent(new Event('click'));
    expect(removePost).toHaveBeenCalledTimes(1);
    await new Promise(process.nextTick);
    expect(timelinePost.innerHTML).toBe('');
  });

  it('Quando clicar no botão MeatBall abre as configurações e aprece a opção de cancelar exclusão, quando clicado fecha o ModalDelete', () => {
    btnMenu.dispatchEvent(new Event('click'));
    expect(menuEditRemove.classList.contains('active')).toBe(true);
    btnRemove.dispatchEvent(new Event('click'));
    expect(modalDelete.style.display).toBe('block');
    btnCancelDeletePost.dispatchEvent(new Event('click'));
    expect(modalDelete.style.display).toBe('none');
  });

  // it('ddd', async () => {
  //   getAllPosts.mockResolvedValueOnce();
  //   const timeline = feed(user);
  //   const warningsSection = timeline.querySelector('#warnings-feed');
  //   removePost.mockRejectedValueOnce({ code: 'nada' });
  //   btnDeletePost.dispatchEvent(new Event('click'));
  //   expect(removePost).toHaveBeenCalledTimes(2);
  //   await new Promise(process.nextTick);
  //   expect(warningsSection.classList.contains('active')).toBe(true);
  // });
});

describe('', () => {
  
});
