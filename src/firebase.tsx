import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAvGudVuYBI-TosYaWJ7TyCGVLHmWKk35I",
  authDomain: "freshquet-app.firebaseapp.com",
  projectId: "freshquet-app",
  storageBucket: "freshquet-app.appspot.com",
  messagingSenderId: "451316523282",
  appId: "1:451316523282:web:b648cc8f2450365cd413cb"
};

//Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
