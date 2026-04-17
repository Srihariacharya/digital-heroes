import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";

export default function Reports() {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const users = await supabase.from("profiles").select("*");
      const subs = await supabase.from("subscriptions").select("*");
      const winnings = await supabase.from("winnings").select("*");

      setData({
        users: users.data.length,
        subs: subs.data.length,
        winnings: winnings.data.length,
      });
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 text-white">
      <h1>Analytics</h1>

      <p>Total Users: {data.users}</p>
      <p>Total Subscriptions: {data.subs}</p>
      <p>Total Winners: {data.winnings}</p>
    </div>
  );
}