import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'; // 👈 આ લાઈન બહુ જરૂરી છે
import { getFirestore, collection } from 'firebase/firestore'; // 🚀 👈 અહીં 'collection' ઉમેર્યું છે
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAIEul0E3lPP5UUWMeDwdhHeVJSJfmiZKc",
  authDomain: "mihirsync-news.firebaseapp.com",
  projectId: "mihirsync-news",
  storageBucket: "mihirsync-news.firebasestorage.app",
  messagingSenderId: "655643804828",
  appId: "1:655643804828:web:6e458847ac120dae711959",
  measurementId: "G-ZCWBNND5CV"
};

// Next.js માટે ફાયરબેઝ કનેક્શન (Singleton Pattern)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app); // 👈 અહીં auth સેટ થાય છે
const db = getFirestore(app);
const storage = getStorage(app);

// 🚀 આપણું નવું Reels કલેક્શન અહીં એડ કર્યું!
export const reelsCollection = collection(db, 'reels');

// 👈 અહીંથી auth બહાર (export) જાય છે જેથી AuthGuard તેને વાપરી શકે
export { app, auth, db, storage };