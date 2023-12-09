// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCgxrfqcbxS-BSFfZgJ39RMbVAxZGdIaac",
  authDomain: "netflixgpt-24c76.firebaseapp.com",
  projectId: "netflixgpt-24c76",
  storageBucket: "netflixgpt-24c76.appspot.com",
  messagingSenderId: "767175375708",
  appId: "1:767175375708:web:fd91d601d0b4c7f53f9f99",
  measurementId: "G-SBQHTPVKHS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
