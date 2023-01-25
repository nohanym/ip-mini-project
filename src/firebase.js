import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   measurementId: "G-E1DNWEWZRV",
// };
const firebaseConfig = {
  apiKey: "AIzaSyBggBV7FU2vo0vbuUf21w9YaM3Z4JWG98U",
  authDomain: "book-ordering-system-aaa32.firebaseapp.com",
  projectId: "book-ordering-system-aaa32",
  storageBucket: "book-ordering-system-aaa32.appspot.com",
  messagingSenderId: "518568528445",
  appId: "1:518568528445:web:cd79971b5fffcc91ff7854",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
// const provider = new EmailAuthProvider();

export { auth, db };
