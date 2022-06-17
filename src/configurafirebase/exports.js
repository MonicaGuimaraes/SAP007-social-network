export {
  getFirestore,
  collection,
  addDoc,
  doc,
  query,
  orderBy,
  getDocs,
  updateDoc,
  deleteDoc,
  arrayUnion,
  arrayRemove,
} from 'https://www.gstatic.com/firebasejs/9.6.7/firebase-firestore.js'; // eslint-disable-line

export {
  getAuth,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
  sendPasswordResetEmail,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'https://www.gstatic.com/firebasejs/9.6.7/firebase-auth.js'; // eslint-disable-line