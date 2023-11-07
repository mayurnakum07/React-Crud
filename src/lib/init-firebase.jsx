// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKJ3bfz-ylVn0hACWvcNW82ezrqhwuDuw",
  authDomain: "react-firestore-e8f9e.firebaseapp.com",
  projectId: "react-firestore-e8f9e",
  storageBucket: "react-firestore-e8f9e.appspot.com",
  messagingSenderId: "36382531504",
  appId: "1:36382531504:web:50d54593ba721aed244075",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
