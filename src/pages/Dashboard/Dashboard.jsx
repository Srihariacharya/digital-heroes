import { useEffect, useState } from "react";
import { getScores } from "../../services/scoreService";
import { supabase } from "../../services/supabase";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [scores, setScores] = useState([]);
  const [charity, setCharity] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const scoresData = await getScores();
    setScores(scoresData);

    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user;

    if (user) {
      const { data } = await supabase
        .from("profiles")
        .select("charity_id, charities(*)")
        .eq("id", user.id)
        .single();

      setCharity(data?.charities);
    }
  };

  return (
    <div className="p-6 text-white max-w-6xl mx-auto">

      {/* 🔥 TOP CARDS */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white/5 p-4 rounded-xl">Subscription: Active</div>
        <div className="bg-white/5 p-4 rounded-xl">Total Winnings: ₹2500</div>
        <div className="bg-white/5 p-4 rounded-xl">Next Draw: May 1</div>
      </div>

      {/* ❤️ CHARITY */}
      {charity && (
        <div className="bg-white/5 p-4 rounded-xl mb-6">
          <h2 className="mb-2">Your Charity ❤️</h2>
          <p className="font-semibold">{charity.name}</p>
        </div>
      )}

      {/* 📊 DRAW SECTION (NEW 🔥) */}
      <div className="bg-white/5 p-4 rounded-xl mb-6">
        <h2 className="mb-2">🎯 Monthly Draw</h2>
        <p>Entries: {scores.length}</p>
        <p>Next Draw: May 1</p>
        <p className="text-green-400">Status: Active</p>
      </div>

      {/* 📈 SCORES */}
      <div className="bg-white/5 p-4 rounded-xl mb-6">
        <h2 className="mb-2">Recent Scores ⛳</h2>

        {scores.length === 0 ? (
          <p>No scores yet</p>
        ) : (
          scores.map((s) => (
            <div key={s.id} className="flex justify-between">
              <span>Score: {s.score}</span>
              <span>{s.played_at}</span>
            </div>
          ))
        )}
      </div>

      {/* ⚡ ACTIONS */}
      <div className="flex gap-4">
        <button
          onClick={() => navigate("/charities")}
          className="bg-green-500 px-4 py-2 rounded"
        >
          Change Charity
        </button>

        <button
          onClick={() => navigate("/dashboard/scores")}
          className="bg-blue-500 px-4 py-2 rounded"
        >
          Add Score
        </button>

        <button
          onClick={() => navigate("/admin")}
          className="bg-purple-500 px-4 py-2 rounded"
        >
          Admin Panel
        </button>
      </div>

    </div>
  );
}