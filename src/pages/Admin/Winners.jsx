import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";

export default function Winners() {
  const [winners, setWinners] = useState([]);

  useEffect(() => {
    supabase
      .from("winnings")
      .select("*")
      .then(({ data }) => setWinners(data));
  }, []);

  const markPaid = async (id) => {
    await supabase
      .from("winnings")
      .update({ status: "paid" })
      .eq("id", id);
  };

  return (
    <div className="p-6 text-white">
      <h1>Winners</h1>

      {winners.map((w) => (
        <div key={w.id} className="bg-gray-800 p-3 mb-2">
          <p>User: {w.user_id}</p>
          <p>Match: {w.match_count}</p>
          <p>Amount: ₹{w.amount}</p>
          <p>Status: {w.status}</p>

          <button
            onClick={() => markPaid(w.id)}
            className="bg-green-500 px-2 py-1"
          >
            Mark Paid
          </button>
        </div>
      ))}
    </div>
  );
}