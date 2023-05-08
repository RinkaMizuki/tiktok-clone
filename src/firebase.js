import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
const firebaseConfig = {
  apiKey: 'AIzaSyB30-pjJ919zS71F1ThRbqBQwB5db14Rls',
  authDomain: 'tiktok-ui-48cfe.firebaseapp.com',
  databaseURL: 'https://tiktok-ui-48cfe-default-rtdb.firebaseio.com',
  projectId: 'tiktok-ui-48cfe',
  storageBucket: 'tiktok-ui-48cfe.appspot.com',
  messagingSenderId: '57525405602',
  appId: '1:57525405602:web:ab95ee1839bad6606ed4fb',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const storage = getStorage();
export { db, storage, app, firebaseConfig };
export default auth;
