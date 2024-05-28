import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "",
  authDomain: "firebaseapp.com",
  projectId: "",
  storageBucket: "appspot.com",
  messagingSenderId: "",
  appId: "1:xxxxxx:web:xxxxxxx",
  measurementId: "G-xxxxxxxx"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
