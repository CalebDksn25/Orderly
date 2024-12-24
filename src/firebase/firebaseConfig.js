// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCzQJmqi53FNanSZN4H2DwcmttVSbtHW4",
  authDomain: "orderly-a920f.firebaseapp.com",
  projectId: "orderly-a920f",
  storageBucket: "orderly-a920f.appspot.com",
  messagingSenderId: "785942090176",
  appId: "1:785942090176:web:bae26e651394bef0caf825",
  measurementId: "G-WBPSRD93EQ",
};

// Initialize Firebase
if (!getApps().length) {
  initializeApp(firebaseConfig); // Initialize Firebase only if no apps are initialized
}

export default firebaseConfig;
