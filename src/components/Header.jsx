import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { where, query, collection } from "firebase/firestore";
import { auth, db } from "../firebase";
import bagIcon from "../assets/bagIcon.svg";
import CartContext from "../context/CartContext";

const Header = ({
  setShowSignIn,
  setShowSignUp,
  setShowCart,
  setShowAddNewBook,
}) => {
  const [user] = useAuthState(auth);
  const [signOut] = useSignOut(auth);
  const navigate = useNavigate();

  const usersRef = collection(db, "users");
  const usersQuery = query(usersRef, where("uid", "==", user ? user.uid : ""));
  const [users, usersLoading] = useCollectionData(usersQuery);

  const { cartItems } = useContext(CartContext);

  return (
    <header>
      <div className="content">
        <Link to="/">
          <h1 id="logo">Bookly.</h1>
        </Link>
        <ul>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/books"}>Books</Link>
          </li>
          {!usersLoading && user && !users[0]?.isAdmin && (
            <li>
              <Link to={"/orderhistory"}>History</Link>
            </li>
          )}
          {!usersLoading && users[0]?.isAdmin && (
            <li onClick={() => setShowAddNewBook(true)}>
              <Link>Add New Book</Link>
            </li>
          )}
        </ul>
        <ul className="right-side">
          {!user && (
            <li onClick={() => setShowSignUp(true)} className="filled-link-alt">
              <Link>Register</Link>
            </li>
          )}

          {user && !usersLoading && !users[0]?.isAdmin && (
            <div
              className="header-cart-icon"
              onClick={() => setShowCart((val) => !val)}
            >
              <p>{cartItems.length}</p>
              <img src={bagIcon} alt="cart" />
            </div>
          )}
          {user ? (
            <li
              onClick={async () => {
                await signOut().then(() => {
                  navigate("/");
                });
              }}
              className="filled-link"
            >
              <Link>Sign Out</Link>
            </li>
          ) : (
            <li className="filled-link" onClick={() => setShowSignIn(true)}>
              <Link>Sign In</Link>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
