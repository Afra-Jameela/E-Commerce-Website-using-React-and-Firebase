// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";




 export const firebaseConfig = {
  apiKey: process.env.REACT_APP_FB_API_KEY,
  authDomain: "eshop-2eff5.firebaseapp.com",
  projectId: "eshop-2eff5",
  storageBucket: "eshop-2eff5.firebasestorage.app",
  messagingSenderId: "99365387979",
  appId: "1:99365387979:web:00008cb56a0b62c30c254e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage=getStorage(app)

export default app