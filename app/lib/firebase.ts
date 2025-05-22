import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAteqFaU3S-euVTVSsbuTUahAObaxlgIHk",
    authDomain: "workout-project-f73b6.firebaseapp.com",
    projectId: "workout-project-f73b6",
    storageBucket: "workout-project-f73b6.firebasestorage.app",
    messagingSenderId: "193072164151",
    appId: "1:193072164151:web:a385eef7771d00d816beb2",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);