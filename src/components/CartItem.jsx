import { useContext, useEffect, useState } from "react";
import CartContext from "../context/CartContext";
import Counter from "./Counter";
import exitIcon from "../assets/exitIcon.svg";

const CartItem = ({ data, onQuantityChange }) => {
  const [itemQuantity, setItemQuantity] = useState(data.quantity);
  const { updateQuantity, removeFromCart } = useContext(CartContext);

  useEffect(() => {
    updateQuantity(data, itemQuantity);
    if (itemQuantity == 0) {
      removeFromCart(data);
    }
    onQuantityChange();
  }, [itemQuantity, setItemQuantity]);
  return (
    <div className="cart-item-container">
      <div className="cart-exit-icon" onClick={() => removeFromCart(data)}>
        <img src={exitIcon} alt="exit" />
      </div>
      <div className="cart-item-image">
        <img src={data.coverImage} alt="book Item" />
      </div>
      <div className="cart-item-texts">
        <div>
          <h2>{data.title}</h2>
          <p className="price">{data.price} ETB</p>
        </div>
        <Counter minVal={0} value={itemQuantity} setValue={setItemQuantity} />
      </div>
    </div>
  );
};

export default CartItem;
