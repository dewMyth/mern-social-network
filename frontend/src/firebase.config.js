// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDYnewBO4eFxdYRPpKw3deVwoKlbXUb-j0",
  authDomain: "mern-social-network-66ee8.firebaseapp.com",
  projectId: "mern-social-network-66ee8",
  storageBucket: "mern-social-network-66ee8.appspot.com",
  messagingSenderId: "170065290262",
  appId: "1:170065290262:web:b18ba74926b56748ba4137",
  measurementId: "G-BBY7974TBN",
};

// Initialize Firebase
export const firebase = initializeApp(firebaseConfig);
export const storage = getStorage(firebase);
// const analytics = getAnalytics(firebase);
