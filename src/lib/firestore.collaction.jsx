import { collection } from "firebase/firestore";
import { db } from "./init-firebase";

export const formDataRef = collection(db, "form-data");

export const movieCollectionRef = collection(db, "movie");
