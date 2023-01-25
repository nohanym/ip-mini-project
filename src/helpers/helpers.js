import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import {
  addDoc,
  updateDoc,
  collection,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { auth, db } from "../firebase";

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    return err.message;
  }
};

const registerWithEmailAndPassword = async (fullName, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      fullName,
      email,
      password,
      isAdmin: false,
    });

    // await logInWithEmailAndPassword(email, password);
  } catch (err) {
    console.error(err);
    return err.message;
  }
};

const createBook = async (
  title,
  description,
  coverImage,
  author,
  publisher,
  category,
  publishDate,
  price
) => {
  await addDoc(collection(db, "books"), {
    title: title.toLowerCase().trim(),
    description,
    coverImage,
    author,
    publisher,
    category,
    publishDate,
    price,
  });
};
const updateBook = async (
  title,
  content,
  coverImage,
  author,
  publisher,
  category,
  publishDate,
  price,
  bookId
) => {
  await updateDoc(doc(db, "books", bookId), {
    title: title.toLowerCase().trim(),
    content,
    coverImage,
    author,
    publisher,
    category,
    publishDate,
    price,
  });
};

const removeDoc = async (bookId) => {
  await deleteDoc(doc(db, "books", bookId));
};

const insertIntoSales = async (books, total, userId) => {
  await addDoc(collection(db, "sales"), {
    books,
    total,
    userId,
  });
};

export {
  registerWithEmailAndPassword,
  logInWithEmailAndPassword,
  createBook,
  updateBook,
  removeDoc,
  insertIntoSales,
};
