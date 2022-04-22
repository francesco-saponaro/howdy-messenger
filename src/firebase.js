// Firebase methods imports
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// Firebase config data
const firebaseConfig = {
  apiKey: "AIzaSyBz9g_9ft5XN-spPVqQ74LlTffNslUoeEc",
  authDomain: "messenger-app-faaff.firebaseapp.com",
  projectId: "messenger-app-faaff",
  storageBucket: "messenger-app-faaff.appspot.com",
  messagingSenderId: "869069250659",
  appId: "1:869069250659:web:f825cf591d1904cad21856",
  measurementId: "G-M4JRG62EM9"
};

// Initialize Firebase
initializeApp(firebaseConfig);

// Export Firestore and Authentication methods
const db = getFirestore();
const auth = getAuth();
const storage = getStorage();

export { db, auth, storage }; 
