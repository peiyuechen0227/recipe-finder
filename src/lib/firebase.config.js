import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDQZew_s4VYQsif1HPuFUmt6nlpYhewoII",
  authDomain: "recipe-finder-5451b.firebaseapp.com",
  projectId: "recipe-finder-5451b",
  storageBucket: "recipe-finder-5451b.firebasestorage.app",
  messagingSenderId: "1045793358183",
  appId: "1:1045793358183:web:dde5a570458e157a246fc2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // User Authentication
export const db = getFirestore(app); // Firebase FireStore
export const storage = getStorage(app); // Upload Files to Firebase Cloud Storage
