import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = ({
    apiKey: "AIzaSyC-lqVrrKV645wGlV_K3lZu0eswucPHovs",
    authDomain: "recipe-app-c9104.firebaseapp.com",
    databaseURL: "https://recipe-app-c9104-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "recipe-app-c9104",
    storageBucket: "recipe-app-c9104.appspot.com",
    messagingSenderId: "467353245483",
    appId: "1:467353245483:web:01bd122a46778f1028576e"
});

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const RECIPES_REF = "/recipes/";