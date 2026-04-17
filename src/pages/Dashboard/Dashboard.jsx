import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";
import { getScores } from "../../services/scoreService";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [scores, setScores] = useState([]);
  const [charity, setCharity] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const { data } = await supabase.auth.getUser();
    const user = data.user;

    if (!user) return;

    // 🔹 Scores
    const scoresData = await getScores();
    setScores(scoresData);

    // 🔹 Charity
    const { data: profile } = await supabase
      .from("profiles")
      .select("charity_id")
      .eq("id", user.id)
      .single();

    if (profile?.charity_id) {
      const { data: charityData } = await supabase
        .from("charities")
        .select("*")
        .eq("id", profile.charity_id)
        .single();

      setCharity(charityData);
    }
  };

  return (
    <div className="p-6 text-white">

      {/* 🔝 TOP CARDS */}
      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white/5 p-6 rounded-2xl">
          <h2 className="text-gray-400">Subscription</h2>
          <p className="text-2xl font-bold text-green-400">Active</p>
        </div>

        <div className="bg-white/5 p-6 rounded-2xl">
          <h2 className="text-gray-400">Total Winnings</h2>
          <p className="text-2xl font-bold">₹2,500</p>
        </div>

        <div className="bg-white/5 p-6 rounded-2xl">
          <h2 className="text-gray-400">Next Draw</h2>
          <p className="text-2xl font-bold">April 30</p>
        </div>

      </div>

      {/* ❤️ CHARITY */}
      <div className="mt-8">
        <h2 className="text-xl mb-4">Your Selected Charity ❤️</h2>

        <div className="bg-white/5 p-6 rounded-2xl">
          {charity ? (
            <>
              <img
                src={charity.image}
                className="w-full h-40 object-cover rounded mb-4"
              />
              <h3>{charity.name}</h3>
              <p className="text-gray-400">{charity.description}</p>
            </>
          ) : (
            <p>No charity selected</p>
          )}
        </div>
      </div>

      {/* ⛳ SCORES */}
      <div className="mt-8">
        <h2 className="text-xl mb-4">Your Recent Scores ⛳</h2>

        <div className="bg-white/5 p-6 rounded-2xl">
          {scores.length === 0 ? (
            <p>No scores added yet.</p>
          ) : (
            scores.map((s) => (
              <div key={s.id} className="flex justify-between mb-2">
                <span>Score: {s.score}</span>
                <span>{new Date(s.played_at).toLocaleDateString()}</span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* 🚀 ACTIONS */}
      <div className="mt-8 flex gap-4">

        <button
          onClick={() => navigate("/charities")}
          className="bg-primary px-6 py-3 rounded-xl"
        >
          Change Charity
        </button>

        <button
          onClick={() => navigate("/dashboard/scores")}
          className="bg-accent px-6 py-3 rounded-xl"
        >
          Add Score
        </button>

      </div>

    </div>
  );
}