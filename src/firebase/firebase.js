// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD3FJ7FlKCdJoJs5wFPpcszoVSsoZG5MdE",
  authDomain: "fullstack-e8e3d.firebaseapp.com",
  projectId: "fullstack-e8e3d",
  storageBucket: "fullstack-e8e3d.appspot.com",
  messagingSenderId: "1030825774107",
  appId: "1:1030825774107:web:fbd7258944b1b696593cbe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app)

export { db, auth };