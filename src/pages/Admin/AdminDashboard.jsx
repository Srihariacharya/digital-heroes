import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    scores: 0,
    charities: 0,
  });

  const [recentUsers, setRecentUsers] = useState([]);
  const [recentScores, setRecentScores] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
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

    const { data: usersData } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5);

    setRecentUsers(usersData || []);

    const { data: scoresData } = await supabase
      .from("scores")
      .select("*")
      .order("played_at", { ascending: false })
      .limit(5);

    setRecentScores(scoresData || []);
  };

  return (
    <div className="p-6 text-white max-w-6xl mx-auto">

      {/* 🔙 NAVIGATION BAR */}
      <div className="flex justify-between items-center mb-6">

        <button
          onClick={() => navigate(-1)}
          className="text-gray-400 hover:text-white transition"
        >
          ← Back
        </button>

        <button
          onClick={() => navigate("/dashboard")}
          className="bg-green-500 px-4 py-2 rounded-lg hover:scale-105 transition"
        >
          Dashboard →
        </button>

      </div>

      {/* 🔥 TITLE */}
      <h1 className="text-3xl mb-6 font-semibold">
        Admin Dashboard ⚙️
      </h1>

      {/* 📊 STATS */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <div className="bg-gradient-to-r from-blue-500/20 to-blue-700/20 p-4 rounded-xl">
          <p className="text-sm text-gray-400">Users</p>
          <p className="text-xl font-bold">{stats.users}</p>
        </div>

        <div className="bg-gradient-to-r from-green-500/20 to-green-700/20 p-4 rounded-xl">
          <p className="text-sm text-gray-400">Scores</p>
          <p className="text-xl font-bold">{stats.scores}</p>
        </div>

        <div className="bg-gradient-to-r from-purple-500/20 to-purple-700/20 p-4 rounded-xl">
          <p className="text-sm text-gray-400">Charities</p>
          <p className="text-xl font-bold">{stats.charities}</p>
        </div>
      </div>

      {/* 👤 RECENT USERS */}
      <div className="bg-white/5 p-4 rounded-xl mb-6">
        <h2 className="mb-4 font-semibold">Recent Users 👤</h2>

        {recentUsers.length === 0 ? (
          <p>No users</p>
        ) : (
          recentUsers.map((u) => (
            <div
              key={u.id}
              className="flex justify-between border-b border-white/10 py-2"
            >
              <span>{u.email || "User"}</span>
              <span className="text-gray-400 text-sm">
                {new Date(u.created_at).toLocaleDateString()}
              </span>
            </div>
          ))
        )}
      </div>

      {/* ⛳ RECENT SCORES */}
      <div className="bg-white/5 p-4 rounded-xl">
        <h2 className="mb-4 font-semibold">Recent Scores ⛳</h2>

        {recentScores.length === 0 ? (
          <p>No scores</p>
        ) : (
          recentScores.map((s) => (
            <div
              key={s.id}
              className="flex justify-between border-b border-white/10 py-2"
            >
              <span>Score: {s.score}</span>
              <span className="text-gray-400 text-sm">
                {s.played_at}
              </span>
            </div>
          ))
        )}
      </div>

    </div>
  );
}