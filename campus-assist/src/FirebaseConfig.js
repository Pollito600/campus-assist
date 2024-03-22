// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDPPjsbvbwjYfqteuAouGpcAxRcWwpFyvM",
  authDomain: "campus-assist-49dde-6e38e.firebaseapp.com",
  projectId: "campus-assist-49dde",
  storageBucket: "campus-assist-49dde.appspot.com",
  messagingSenderId: "157729141933",
  appId: "1:157729141933:web:11af78fcacd6a0ab304224",
  measurementId: "G-J4HVPE4CNH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)
export {auth};