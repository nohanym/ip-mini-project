import { useNavigate } from "react-router-dom";

const BookItem = ({ data, bookId }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/book/${bookId}`);
  };
  return (
    <div className="book-item-container" onClick={handleClick}>
      <div className="book-item-image">
        <img src={data.coverImage} alt="book Item" />
      </div>
      <div className="book-item-texts">
        <h2>{data.title}</h2>
        <p className="author">Book By {data.author}</p>
        <p className="category">{data.category}</p>

        <p className="price">{data.price} ETB</p>
      </div>
    </div>
  );
};

export default BookItem;
