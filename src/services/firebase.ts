import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDPZpkQ-pMZFZSOpZY6q-wgScHUZSyhaRk",
  authDomain: "simplexlatam.firebaseapp.com",
  projectId: "simplexlatam",
  storageBucket: "simplexlatam.firebasestorage.app",
  messagingSenderId: "487271300307",
  appId: "1:487271300307:web:1bccfdc6b82e79fffaa826",
  measurementId: "G-SDCD5H8SCD"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();

export { auth, storage, googleProvider };

