import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyCHVC38S7t3VxibEQ5YnO09WlmRk6hPD8o",
  authDomain: "dhaksina-portfolio.firebaseapp.com",
  projectId: "dhaksina-portfolio",
  storageBucket: "dhaksina-portfolio.firebasestorage.app",
  messagingSenderId: "671809067724",
  appId: "1:671809067724:web:ba47dbd4419d9a14958069",
  measurementId: "G-R27JM6RN0G"
};

// Initialize Firebase App
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export { app, db, auth, storage, analytics };

