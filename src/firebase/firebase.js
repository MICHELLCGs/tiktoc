import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBXFnhQhqXDZYKcvKVQIPS_ZrNTJ1OoMLw",
  authDomain: "michellproyecto.firebaseapp.com",
  projectId: "michellproyecto",
  storageBucket: "michellproyecto.appspot.com",
  messagingSenderId: "461343144607",
  appId: "1:461343144607:web:a3967fd71011141bc3c0aa",
  measurementId: "G-LKZ45BJQSP"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
