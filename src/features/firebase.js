import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database"; // Import getDatabase from firebase/database

const firebaseConfig = {
    apiKey: "AIzaSyB-C5LiItlozMBNSKhGKA-XXMtPwMwEj9A",
    authDomain: "standby-c50ba.firebaseapp.com",
    databaseURL: "https://standby-c50ba-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "standby-c50ba",
    storageBucket: "standby-c50ba.appspot.com",
    messagingSenderId: "627233552935",
    appId: "1:627233552935:web:a89e271cbd1e22ec3bac02"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app); // Correctly use getDatabase
