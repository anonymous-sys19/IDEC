// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAd-k2PL7bd39me2wedp11ozhcyhulVBm8",
  authDomain: "idec-bcfc6.firebaseapp.com",
  projectId: "idec-bcfc6",
  storageBucket: "idec-bcfc6.appspot.com",
  messagingSenderId: "98710748182",
  appId: "1:98710748182:web:d63e5d85c19c8140b4c937",
  measurementId: "G-K2THCF9YFW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);