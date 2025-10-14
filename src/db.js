// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBdLx6U-1WkcOSeqS4FArxD8BuN7x97564",
    authDomain: "read-at-night.firebaseapp.com",
    databaseURL: "https://read-at-night-default-rtdb.firebaseio.com",
    projectId: "read-at-night",
    storageBucket: "read-at-night.firebasestorage.app",
    messagingSenderId: "382436449265",
    appId: "1:382436449265:web:3db814135208e619ab8250",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
export const auth = getAuth(app);
export default db;
