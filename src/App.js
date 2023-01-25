import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Books from "./pages/Books";
import HomePage from "./pages/HomePage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import BookDetail from "./components/BookDetail";
import CartView from "./components/CartView";
import AddNewBook from "./pages/AddNewBook";
import History from "./pages/History";

import "./styles/header.css";
import "./styles/homepage.css";
import "./styles/form.css";
import "./styles/bookItem.css";
import "./styles/bookDetail.css";
import "./styles/counter.css";
import "./styles/cartView.css";
import "./styles/history.css";
import UpdateBook from "./pages/UpdateBook";

function App() {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showAddNewBook, setShowAddNewBook] = useState(false);
  const [showBookUpdate, setShowBookUpdate] = useState(null);

  return (
    <div
      style={{
        position: "relative",
        overflowY: `${
          showSignIn ||
          showSignUp ||
          showCart ||
          showAddNewBook ||
          showBookUpdate
            ? "hidden"
            : "auto"
        }`,
        height: `${
          showSignIn ||
          showSignUp ||
          showCart ||
          showAddNewBook ||
          showBookUpdate
            ? "100vh"
            : "initial"
        }`,
      }}
    >
      {showSignIn && (
        <SignIn setShowSignIn={setShowSignIn} setShowSignUp={setShowSignUp} />
      )}
      {showSignUp && (
        <SignUp setShowSignUp={setShowSignUp} setShowSignIn={setShowSignIn} />
      )}

      {showBookUpdate && (
        <UpdateBook
          setShowUpdateBook={setShowBookUpdate}
          data={showBookUpdate.data}
          bookId={showBookUpdate.bookId}
        />
      )}

      {showAddNewBook && <AddNewBook setShowAddNewBook={setShowAddNewBook} />}

      {showCart && <CartView setShowCart={setShowCart} />}
      <Header
        setShowSignIn={setShowSignIn}
        setShowSignUp={setShowSignUp}
        setShowCart={setShowCart}
        setShowAddNewBook={setShowAddNewBook}
      />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/orderhistory" element={<History />} />
        <Route path="/books" element={<Books />} />
        <Route
          path="/book/:bookId"
          element={
            <BookDetail
              setShowSignIn={setShowSignIn}
              setShowBookUpdate={setShowBookUpdate}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
