import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBmQKSTDSRmp1ljrA2iwBv5Tt-8W-C-_aY",
  authDomain: "snap-bill-fde3a.firebaseapp.com",
  projectId: "snap-bill-fde3a",
  storageBucket: "snap-bill-fde3a.appspot.com",
  messagingSenderId: "654441651488",
  appId: "1:654441651488:web:b8397d5514311112374b45",
};

const app = firebase.initializeApp(firebaseConfig);

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider(auth);

export { db, auth, provider };
