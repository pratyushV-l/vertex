import { auth } from './firebase-config.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

const signup = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      console.log('User signed up:', user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('Error signing up:', errorCode, errorMessage);
    });
};

const login = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Logged in
      const user = userCredential.user;
      console.log('User logged in:', user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('Error logging in:', errorCode, errorMessage);
    });
};

document.getElementById('signup-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = e.target.elements['email'].value;
  const password = e.target.elements['password'].value;
  signup(email, password);
});

document.getElementById('login-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = e.target.elements['email'].value;
  const password = e.target.elements['password'].value;
  login(email, password);
});