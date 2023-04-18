// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth}  from 'firebase/auth'; 
import { getFirestore } from 'firebase/firestore/lite'
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCT7tLSGpnSWZ_nylgLJN5FXkENnCUGUB4",
  authDomain: "proyecto-respira-yoga.firebaseapp.com",
  projectId: "proyecto-respira-yoga",
  storageBucket: "proyecto-respira-yoga.appspot.com",
  messagingSenderId: "1095664948797",
  appId: "1:1095664948797:web:e2041cb818d74e15c23c54",
  measurementId: "G-NTQYVVJ1B8"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

// Get Authentication and FirestoreDatabase
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
// suibir archivos
export const storage = getStorage(FirebaseApp) 
