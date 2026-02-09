// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebase = {
  apiKey: "AIzaSyAdRE4wA08CKhD1wV_Mv0Gv4753xC_N3Ww",
  authDomain: "leafy-respect-435807-e0.firebaseapp.com",
  projectId: "leafy-respect-435807-e0",
  storageBucket: "leafy-respect-435807-e0.firebasestorage.app",
  messagingSenderId: "645211699424",
  appId: "1:645211699424:web:e095272434edaeb9527885",
  measurementId: "G-4NVGBW33EM"
};

const app = initializeApp(firebase);
export const auth = getAuth(app);