import { createContext, useState } from "react";
import { insertIntoSales } from "../helpers/helpers";
import { toast } from "react-toastify";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    if (item) {
      const notThere = cartItems.some((el) => el.id === item.id);
      if (!notThere) {
        setCartItems((prevState) => [...prevState, item]);
        console.log(cartItems);
      }
    }
  };

  const updateQuantity = (item, quantity) => {
    cartItems.splice(
      cartItems.findIndex((el) => el.id === item.id),
      1,
      {
        ...item,
        quantity: quantity,
      }
    );
    setCartItems(cartItems);
  };
  const removeFromCart = (item) => {
    if (item) {
      const items = cartItems.filter((el) => el.id !== item.id);
      setCartItems(items);
    }
  };

  const calculateTotalPrice = () => {
    let sum = 0;
    cartItems.forEach((item) => {
      sum += item.quantity * item.price;
    });

    return sum;
  };

  const checkout = async (userId) => {
    await insertIntoSales(cartItems, calculateTotalPrice(), userId).then(() => {
      setCartItems([]);
      toast.success("Your Order Was Success!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        closeButton: true
      });
    });
  };
  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, updateQuantity, removeFromCart, checkout }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;
