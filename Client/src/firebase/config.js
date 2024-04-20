// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Added for Firebase Authentication
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAfRlKN9KKz6B94x4CrLbhVrcjrSq9PhR0",
    authDomain: "hexton09.firebaseapp.com",
    databaseURL: "https://hexton09-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "hexton09",
    storageBucket: "hexton09.appspot.com",
    messagingSenderId: "565975418232",
    appId: "1:565975418232:web:9190326c4255bb62f3b48d",
    measurementId: "G-QKLH4FME19"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app); // Initialize Firebase Authentication and export it
