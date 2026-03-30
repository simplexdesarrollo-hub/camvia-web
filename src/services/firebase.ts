import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, Auth } from "firebase/auth";
import { getStorage, FirebaseStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDPZpkQ-pMZFZSOpZY6q-wgScHUZSyhaRk",
  authDomain: "simplexlatam.firebaseapp.com",
  projectId: "simplexlatam",
  storageBucket: "simplexlatam.firebasestorage.app",
  messagingSenderId: "487271300307",
  appId: "1:487271300307:web:1bccfdc6b82e79fffaa826",
  measurementId: "G-SDCD5H8SCD"
};

let auth: Auth;
let storage: FirebaseStorage;
let googleProvider: GoogleAuthProvider;

if (typeof window !== "undefined") {
  const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  auth = getAuth(app);
  storage = getStorage(app);
  googleProvider = new GoogleAuthProvider();
}

export { auth, storage, googleProvider };

