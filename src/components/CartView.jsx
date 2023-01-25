import { useContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
  import "react-toastify/dist/ReactToastify.css";

import CartItem from "./CartItem";
import exitIcon from "../assets/exitIcon.svg";
import CartContext from "../context/CartContext";

const CartView = ({ setShowCart }) => {
  const [user] = useAuthState(auth);
  const { cartItems, checkout } = useContext(CartContext);
  const [totalPrice, setTotalPrice] = useState(0);

  const calculateTotalPrice = () => {
    let sum = 0;
    cartItems.forEach((item) => {
      sum += item.quantity * item.price;
    });

    setTotalPrice(sum);
  };

  const handleCheckout = async () => {
    checkout(user.uid);
  };

  useEffect(() => {
    calculateTotalPrice();
  }, []);

  return (
    <div className="cartview-overlay">
      <div className="cartview-wrapper">
        <div className="cartview-exit-icon" onClick={() => setShowCart(false)}>
          <img src={exitIcon} alt="exit" />
        </div>

        {cartItems.length > 0 ? (
          <>
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                data={item}
                onQuantityChange={calculateTotalPrice}
              />
            ))}

            <hr />
            <p className="cartview-subtotal">
              Sub Total <span>{totalPrice} ETB</span>
            </p>
            <button className="cartview-checkout-btn" onClick={handleCheckout}>
              Checkout
            </button>
          </>
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <p>Cart is empty.</p>
          </div>
        )}
        <ToastContainer />
      </div>
    </div>
  );
};

export default CartView;
