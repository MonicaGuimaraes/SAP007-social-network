/* eslint-disable no-unused-vars */
// eslint-disable-next-line
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js';
// eslint-disable-next-line
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.6.7/firebase-firestore.js';

const firebaseConfig = {
  apiKey: 'AIzaSyA8csr-WYkUBdLGljUfS7ZQ4CUeo7rxANo',
  authDomain: 'social-network-8d694.firebaseapp.com',
  projectId: 'social-network-8d694',
  storageBucket: 'social-network-8d694.appspot.com',
  messagingSenderId: '190853584788',
  appId: '1:190853584788:web:7104fa6fbecf161abae181',
};

const app = initializeApp(firebaseConfig);
export const bd = getFirestore();
