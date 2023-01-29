import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyC_ELsDWYnAmvbT8c0IasO4Vcsgtcs_qMQ",
  authDomain: "devbiome69.firebaseapp.com",
  projectId: "devbiome69",
  storageBucket: "devbiome69.appspot.com",
  messagingSenderId: "834974721118",
  appId: "1:834974721118:web:5b7593816ffebdd82d80cf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()