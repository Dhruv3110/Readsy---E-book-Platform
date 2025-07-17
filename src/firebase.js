// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from 'firebase/database';
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAPMhRRErfb3B77Wg3K9OGIG3tuVLBs3jo",
  authDomain: "my-project-fd48e.firebaseapp.com",
  databaseURL: "https://my-project-fd48e-default-rtdb.firebaseio.com",
  projectId: "my-project-fd48e",
  storageBucket: "my-project-fd48e.firebasestorage.app",
  messagingSenderId: "176880148876",
  appId: "1:176880148876:web:40b7158dfbb9bc754d76a9",
  measurementId: "G-WR0TFKNMGJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);
const storage = getStorage(app);
export {ref,push, set } from 'firebase/database';
export { db, storage};