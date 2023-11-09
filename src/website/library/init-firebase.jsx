import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage, ref } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAKJ3bfz-ylVn0hACWvcNW82ezrqhwuDuw",
  authDomain: "react-firestore-e8f9e.firebaseapp.com",
  projectId: "react-firestore-e8f9e",
  storageBucket: "react-firestore-e8f9e.appspot.com",
  messagingSenderId: "36382531504",
  appId: "1:36382531504:web:50d54593ba721aed244075",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);

export const store = getStorage(app);
export const storageRef = (path) => ref(store,path);
