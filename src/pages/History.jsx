import { collection, where, query } from "@firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { auth, db } from "../firebase";
import HistoryItem from "../components/HistoryItem";
import { useAuthState } from "react-firebase-hooks/auth";

const History = () => {
  const [user] = useAuthState(auth);

  const salesRef = collection(db, "sales");
  const salesQuery = query(
    salesRef,
    where("userId", "==", user ? user.uid : "")
  );
  const [values, loading] = useCollectionData(salesQuery);

  if (!values || loading || !user) return;
  return (
    <div className="width-limiter">
      <h1 className="history-title">Order History</h1>

      <div className="history-container">
        {values.map((doc, index) => (
          <HistoryItem key={index} data={doc} />
        ))}
      </div>
    </div>
  );
};

export default History;
