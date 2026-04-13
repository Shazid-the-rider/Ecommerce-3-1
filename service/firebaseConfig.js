import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCGDr5Yd2D90B7xnm8QtvZynKcRZ55IIWc",
    authDomain: "hello-28439.firebaseapp.com",
    projectId: "hello-28439",
    storageBucket: "hello-28439.firebasestorage.app",
    messagingSenderId: "509879590527",
    appId: "1:509879590527:web:0e227270f66d1a835a694a",
    measurementId: "G-0LTLZBR211"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)