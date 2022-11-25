// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-lqVrrKV645wGlV_K3lZu0eswucPHovs",
  authDomain: "recipe-app-c9104.firebaseapp.com",
  databaseURL: "https://recipe-app-c9104-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "recipe-app-c9104",
  storageBucket: "recipe-app-c9104.appspot.com",
  messagingSenderId: "467353245483",
  appId: "1:467353245483:web:01bd122a46778f1028576e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const RECIPES_REF = "recipes";