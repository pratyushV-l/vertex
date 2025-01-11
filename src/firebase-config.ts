import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDBt85doNh9tKlqEkMJfGU-8HBc_2UCl0A",
    authDomain: "vertex-c4958.firebaseapp.com",
    projectId: "vertex-c4958",
    storageBucket: "vertex-c4958.firebasestorage.app",
    messagingSenderId: "520826656904",
    appId: "1:520826656904:web:a7e3a7e67f65c32596a73d",
    measurementId: "G-EV7KX21VR9"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };