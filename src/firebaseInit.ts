// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtoHh9LZSlCqmyiCPI-Lgi1Ym2jOeTHGU",
  authDomain: "task-angular-4d9bd.firebaseapp.com",
  projectId: "task-angular-4d9bd",
  storageBucket: "task-angular-4d9bd.appspot.com",
  messagingSenderId: "87709364062",
  appId: "1:87709364062:web:4f30d5d7921d9d9b3a29cf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
