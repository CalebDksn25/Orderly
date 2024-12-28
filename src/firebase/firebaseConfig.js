// Import the functions you need from the Firebase SDKs
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC5zQJmngi53FNanSZN4H2DwcmtVSbtHW4",
  authDomain: "orderly-a920f.firebaseapp.com",
  projectId: "orderly-a920f",
  storageBucket: "orderly-a920f.firebasestorage.app",
  messagingSenderId: "785942090176",
  appId: "1:785942090176:web:bae26e651394bef0caf825",
  measurementId: "G-WBPSRD93EQ",
};

// Initialize Firebase only if no apps are initialized
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const db = getFirestore(app); // Firestore instance for database operations
export const auth = getAuth(app); // Authentication instance for managing user login/logout
