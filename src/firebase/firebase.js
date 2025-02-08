import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCi61tGw2iGnEMqQkhFJLLAIUPJdgpIrlA",
  authDomain: "todo-webapp-c8d9f.firebaseapp.com",
  projectId: "todo-webapp-c8d9f",
  storageBucket: "todo-webapp-c8d9f.firebasestorage.app",
  messagingSenderId: "455284148691",
  appId: "1:455284148691:web:25f60a8ea9e7e3ed794726",
  measurementId: "G-HRV55GWFD4"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
