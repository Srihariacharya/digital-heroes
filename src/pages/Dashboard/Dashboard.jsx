import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";
import { getScores } from "../../services/scoreService";

export default function Dashboard() {
  const [scores, setScores] = useState([]);
  const [charity, setCharity] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    // 🔹 Get logged-in user
    const { data } = await supabase.auth.getUser();
    const currentUser = data.user;
    setUser(currentUser);

    if (!currentUser) return;

    // 🔹 Get scores
    const scoresData = await getScores();
    setScores(scoresData || []);

    // 🔹 Get selected charity
    const { data: profile } = await supabase
      .from("profiles")
      .select("charity_id")
      .eq("id", currentUser.id)
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

      {/* 🔥 TOP CARDS */}
      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white/5 p-6 rounded-2xl border border-white/10 shadow-lg">
          <h2 className="text-gray-400">Subscription</h2>
          <p className="text-2xl font-bold text-green-400">Active</p>
        </div>

        <div className="bg-white/5 p-6 rounded-2xl border border-white/10 shadow-lg">
          <h2 className="text-gray-400">Total Winnings</h2>
          <p className="text-2xl font-bold">₹2,500</p>
        </div>

        <div className="bg-white/5 p-6 rounded-2xl border border-white/10 shadow-lg">
          <h2 className="text-gray-400">Next Draw</h2>
          <p className="text-2xl font-bold">April 30</p>
        </div>

      </div>

      {/* ❤️ SELECTED CHARITY */}
      <div className="mt-8">
        <h2 className="text-xl mb-4">Your Selected Charity ❤️</h2>

        <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
          {charity ? (
            <>
              <img
                src={charity.image}
                alt={charity.name}
                className="w-full h-40 object-cover rounded mb-4"
              />
              <h3 className="text-lg font-semibold">{charity.name}</h3>
              <p className="text-gray-400 text-sm">
                {charity.description}
              </p>
            </>
          ) : (
            <p className="text-gray-400">
              No charity selected yet.
            </p>
          )}
        </div>
      </div>

      {/* ⛳ SCORES */}
      <div className="mt-8">
        <h2 className="text-xl mb-4">Your Recent Scores ⛳</h2>

        <div className="bg-white/5 p-6 rounded-2xl border border-white/10">

          {scores.length === 0 ? (
            <p className="text-gray-400">
              No scores added yet.
            </p>
          ) : (
            <div className="space-y-2">
              {scores.map((s) => (
                <div
                  key={s.id}
                  className="flex justify-between border-b border-white/10 pb-2"
                >
                  <span>Score: {s.score}</span>
                  <span className="text-gray-400 text-sm">
                    {new Date(s.played_at).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>

      {/* 🎯 QUICK ACTION */}
      <div className="mt-8">
        <h2 className="text-xl mb-4">Quick Actions</h2>

        <div className="flex gap-4">
          <button
            onClick={() => window.location.href = "/charities"}
            className="bg-primary px-6 py-3 rounded-xl hover:scale-105 transition"
          >
            Change Charity
          </button>

          <button
            onClick={() => window.location.href = "/dashboard/scores"}
            className="bg-accent px-6 py-3 rounded-xl hover:scale-105 transition"
          >
            Add Score
          </button>
        </div>
      </div>

    </div>
  );
}