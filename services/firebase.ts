import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDbQdgPsPxzVY204sOCP-FpeqVOvGRIKhs",
  authDomain: "smokenote-4a242.firebaseapp.com",
  projectId: "smokenote-4a242",
  storageBucket: "smokenote-4a242.firebasestorage.app",
  messagingSenderId: "539523318382",
  appId: "1:539523318382:web:555bb9d8eadd618ed6dc7f",
  measurementId: "G-GPXJ73MT6M"
};

export const firebaseApp = getApps().length === 0
  ? initializeApp(firebaseConfig)
  : getApps()[0];

export const firebaseAuth = getAuth(firebaseApp);
export const firebaseDb = getFirestore(firebaseApp);
export const firebaseStorage = getStorage(firebaseApp);
