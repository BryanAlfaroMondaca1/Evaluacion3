// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js'
// https://firebase.google.com/docs/web/setup#available-libraries
// Initialize Firebase
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js'



const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);