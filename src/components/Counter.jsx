import minusIcon from "../assets/minusIcon.svg";
import plusIcon from "../assets/plusIcon.svg";

const Counter = ({ value, setValue, minVal }) => {
  const handleIncrement = () => {
    setValue(value + 1);
  };

  const handleDecrement = () => {
    if (value > minVal) {
      setValue(value - 1);
    }
  };
  return (
    <div className="counter-container">
      <div className="counter-btn" onClick={handleDecrement}>
        <img src={minusIcon} alt="remove from cart" />
      </div>
      <p className="counter-text">{value}</p>
      <div className="counter-btn" onClick={handleIncrement}>
        <img src={plusIcon} alt="Add to cart" />
      </div>
    </div>
  );
};

export default Counter;
