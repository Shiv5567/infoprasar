
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Re-export specific auth functions to ensure the entire app uses the same versioned module
export { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDxHg3disz3lBf93PTIeXHNCosZzmsxf_U",
  authDomain: "infoprasar-first.firebaseapp.com",
  projectId: "infoprasar-first",
  storageBucket: "infoprasar-first.firebasestorage.app",
  messagingSenderId: "518522782347",
  appId: "1:518522782347:web:98374a1f407ddb83638a8e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
export const auth = getAuth(app);
