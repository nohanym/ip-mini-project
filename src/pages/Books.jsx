import { collection, query, where } from "@firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";

import BookItem from "../components/BookItem";
import { useEffect, useState } from "react";

const Books = () => {
  const [searchKey, setSearchKey] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [values, setValues] = useState(null);
  const [booksValues, loading] = useCollection(collection(db, "books"));

  const booksRef = collection(db, "books");
  const booksSearchQuery = query(
    booksRef,
    where("title", "==", searchKey.toLowerCase().trim())
  );
  const [searchResult] = useCollection(booksSearchQuery);

  useEffect(() => {
    if (searchResult && searchKey.length > 0) {
      setValues(searchResult);
    } else if (booksValues) {
      setValues(booksValues);
    }
  }, [booksValues, searchResult, searchKey]);

  // const searchHandler = () => {

  // };

  if (!values || loading) return;
  return (
    <div className="width-limiter">
      <div className="search-bar">
        <input
          className="text-input-alt"
          placeholder="Search Your Favorite Book"
          type="text"
          name="search"
          onInput={(e) => {
            setSearchKey(e.target.value);
          }}
        />
        {/* <button
          className="button-success-search"
          type="submit"
          onClick={searchHandler}
        >
          Search
        </button> */}
      </div>
      <h1 className="books-title">{searchKey.length===0? "Books Collection" : "Search Results"}</h1>

      {searchKey.length > 0 && values?.docs.length === 0 && (
        <div>There is no book by that name.</div>
      )}
      <div className="books-container">
        {values &&
          values?.docs.map((doc) => (
            <BookItem key={doc.id} data={doc.data()} bookId={doc.id} />
          ))}
      </div>
    </div>
  );
};

export default Books;
