// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDevy6jAJZjEfUNFr1TbK2cO1SakfFjlPo",
  authDomain: "trek-gems.firebaseapp.com",
  projectId: "trek-gems",
  storageBucket: "trek-gems.firebasestorage.app",
  messagingSenderId: "353219781744",
  appId: "1:353219781744:web:2a605d87bf3daba4ba40b5",
  measurementId: "G-D38H457RDB",
};

// Initialize Firebase
const firebase_app = initializeApp(firebaseConfig);
export default firebase_app;
