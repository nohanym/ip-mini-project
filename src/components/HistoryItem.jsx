
const HistoryItem = ({ data }) => {
  
  return (
    <div className="history-item-container">
      {data.books.map((item, index) => (
        <div key={item.id}>
          <p className="history-item-text">{item.title} <span>(X{item.quantity})</span></p>
        </div>
      ))}
      <hr style={{marginBottom: "1rem", marginTop: "1rem"}}/>
      <p>Total Price {data.total}</p>
    </div>
  );
};

export default HistoryItem;
