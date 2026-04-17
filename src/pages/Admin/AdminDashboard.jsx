import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    scores: 0,
    charities: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const { count: users } = await supabase
      .from("profiles")
      .select("*", { count: "exact", head: true });

    const { count: scores } = await supabase
      .from("scores")
      .select("*", { count: "exact", head: true });

    const { count: charities } = await supabase
      .from("charities")
      .select("*", { count: "exact", head: true });

    setStats({ users, scores, charities });
  };

  return (
    <div className="p-6 text-white max-w-4xl mx-auto">

      <h1 className="text-3xl mb-6">Admin Dashboard ⚙️</h1>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white/5 p-4 rounded-xl">
          Users: {stats.users}
        </div>

        <div className="bg-white/5 p-4 rounded-xl">
          Scores: {stats.scores}
        </div>

        <div className="bg-white/5 p-4 rounded-xl">
          Charities: {stats.charities}
        </div>
      </div>

    </div>
  );
}