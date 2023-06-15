// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDItlMt66VXmqODIykSzt2MrMaouLSZ4_s",
  authDomain: "icc-inquire.firebaseapp.com",
  databaseURL: "https://icc-inquire-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "icc-inquire",
  storageBucket: "icc-inquire.appspot.com",
  messagingSenderId: "890826958073",
  appId: "1:890826958073:web:305b32ce7083fa8f332e28",
  measurementId: "G-E84544H88X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export function to initialize firebase.
export const initFirebase = () => {
  return app;
};

export const auth = getAuth(app);
export const db = getFirestore(app);

// Get Firebase Storage instance
export const storage = getStorage(app);



