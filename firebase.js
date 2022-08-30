import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCzH1iISw4PXp6PpIxhYZ6VuEY2tnAouNA",
  authDomain: "bill-snap.firebaseapp.com",
  projectId: "bill-snap",
  storageBucket: "bill-snap.appspot.com",
  messagingSenderId: "894300661184",
  appId: "1:894300661184:web:df12d94bd388ad690a9425",
};

const app = firebase.initializeApp(firebaseConfig);

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider(auth);

export { db, auth, provider };
