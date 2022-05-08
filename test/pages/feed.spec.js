/*
* @jest-environment jsdom
*/
import { feed } from '../../src/pages/feed/feed.js';
import {
  createPost, getAllPosts, authLogOut, likePost, removeLikePost, createCommentPost,
} from '../../src/pages/feed/firestore-functions.js';
import {
  postElement,
} from '../../src/components/timelinepost.js';
// import { generalErrors } from '../../src/components/functions-components.js';
// import { createComments } from '../../src/components/comments.js';

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

describe('feed e getAllPosts', () => {
  it('feed(user) deve ser um Node.ELEMENT_NODE (1) e getAllPosts deve ser chamada', () => {
    getAllPosts.mockRejectedValueOnce();
    expect(feed(user).nodeType).toBe(1);
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

describe('likePost', () => {
  it('Deverá trazer um like a publicação', async () => {
    const timelinePost = postElement(posts[0].data(), user, posts[0].id);
    const btnLike = timelinePost.querySelector('.post-like');
    const valueLike = timelinePost.querySelector('.value-like');
    likePost.mockResolvedValueOnce();
    btnLike.dispatchEvent(new Event('click'));
    await new Promise(process.nextTick);
    expect(likePost).toHaveBeenCalled();
    expect(valueLike.textContent).toBe('1');
  });
});
describe('removeLikePost', () => {
  it('Deverá remover um like da publicação', async () => {
    await new Promise(process.nextTick);
    const timelinePost = postElement(posts[1].data(), user1, posts[1].id);
    const btnLike = timelinePost.querySelector('.post-like');
    const valueLike = timelinePost.querySelector('.value-like');
    removeLikePost.mockResolvedValueOnce();
    btnLike.dispatchEvent(new Event('click'));
    expect(removeLikePost).toHaveBeenCalledTimes(1);
    expect(valueLike.textContent).toBe('1');
  });
});

describe('createCommentPost(idPost, objComment)', () => {
  const timelinePost = postElement(posts[1].data(), user1, posts[1].id);
  const btnComment = timelinePost.querySelector('.post-comment');
  const formComment = timelinePost.querySelector('.form-comment');
  const commentArea = timelinePost.querySelector('.comment-input-value');
  const btnConfirm = timelinePost.querySelector('.confirm-comment');
  // const btnClose = timelinePost.querySelector('.close-comment');

  it('createCommentPost deve ter sido chamada pelo menos uma vez, deve ter um objeto na chamada que contenha {message: "testando", ...', () => {
    btnComment.dispatchEvent(new Event('click'));
    expect(formComment.classList.contains('active')).toBe(true);
    commentArea.value = '';
    btnConfirm.dispatchEvent(new Event('click'));
    expect(createCommentPost).toHaveBeenCalledTimes(0);
    expect(formComment.classList.contains('active')).toBe(false);
  });

//   it('create(post) não deve ser chamado', () => {
//     input.value = '';
//     btnPost.dispatchEvent(new Event('click'));
//     expect(createPost.mock.calls).toHaveLength(1);
//   });
//   it('CreatePost é chamada e entra em catch adicionando a class active para warningsSection e
// depois de 4 seg a class não existe mais', async () => {
//     createPost.mockRejectedValueOnce({ code: 'nada' });
//     input.value = 'testando';
//     btnPost.dispatchEvent(new Event('click'));
//     expect(warningsSection.classList.contains('active')).toBe(true);
//     expect(warningPost.classList.contains('active')).toBe(true);
//     await new Promise(process.nextTick);
//     expect(createPost).toHaveBeenCalledTimes(2);
//     expect(warningsSection.classList.contains('active')).toBe(false);
//     expect(warningPost.classList.contains('active')).toBe(false);
//   });
});
