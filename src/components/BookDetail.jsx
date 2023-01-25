import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useDocumentData,
  useCollectionData,
} from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { where, query, collection, doc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { removeDoc } from "../helpers/helpers";
import Counter from "./Counter";
import CartContext from "../context/CartContext";

const BookDetail = ({ setShowSignIn, setShowBookUpdate }) => {
  const navigate = useNavigate();
  const [itemCount, setItemCount] = useState(1);
  const { addToCart } = useContext(CartContext);

  const [user] = useAuthState(auth);

  const usersRef = collection(db, "users");
  const usersQuery = query(usersRef, where("uid", "==", user ? user.uid : ""));
  const [users, usersLoading] = useCollectionData(usersQuery);

  let { bookId } = useParams();
  const docRef = doc(db, "books", bookId);
  const [value, loading] = useDocumentData(docRef, {
    snapshotListenOptions: {
      includeMetadataChanges: true,
    },
  });

  const handleAddToCart = () => {
    if (!user) {
      setShowSignIn(true);
    }
    addToCart({ ...value, quantity: itemCount, id: bookId });
  };

  if (!value || loading) return;
  return (
    !loading && (
      <div className="width-limiter">
        <div className="book-detail-row1">
          <div className="book-detail-img">
            <img src={value.coverImage} alt="book cover" />
          </div>

          <div className="book-detail-item-texts">
            <h2>{value.title}</h2>
            <div className="detail-horizontal-group">
              <p className="key">Book By</p>
              <p className="value">{value.author}</p>
            </div>
            <div className="detail-horizontal-group">
              <p className="key">Category</p>
              <p className="value">{value.category}</p>
            </div>

            <div className="detail-horizontal-group">
              <p className="key">Published on</p>
              <p className="value">
                {new Date(value.publishDate?.toDate()).getUTCDate()} /
                {new Date(value.publishDate?.toDate()).getUTCMonth()} /
                {new Date(value.publishDate?.toDate()).getUTCFullYear()}
              </p>
            </div>
            <div className="detail-horizontal-group">
              <p className="key">Publisher : </p>
              <p className="value">{value.publisher}</p>
            </div>

            <div className="detail-horizontal-group">
              <p className="key">Price</p>
              <p className="value">{value.price} ETB</p>
            </div>

            {user && !usersLoading && users[0]?.isAdmin ? (
              <div className="detail-action-btn">
                <button
                  className="book-detail-add-cart"
                  onClick={() =>
                    setShowBookUpdate({ data: value, bookId: bookId })
                  }
                >
                  Update
                </button>
                <button
                  className="book-detail-add-cart"
                  onClick={async () => {
                    await removeDoc(bookId).then(() => navigate("/books"));
                  }}
                >
                  Remove
                </button>
              </div>
            ) : (
              <>
                <div className="quantity">
                  <p className="key">Quantity</p>
                  <Counter
                    value={itemCount}
                    setValue={setItemCount}
                    minVal={1}
                  />
                </div>

                <button
                  className="book-detail-add-cart"
                  onClick={handleAddToCart}
                >
                  Add to cart
                </button>
              </>
            )}
          </div>
        </div>

        <div className="book-detail-desc">
          <h3>Book Description </h3>
          <p>{value.description}</p>
        </div>
      </div>
    )
  );
};

export default BookDetail;
