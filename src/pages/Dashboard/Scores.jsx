import { useState } from "react";
import { supabase } from "../../services/supabase";
import { useNavigate } from "react-router-dom";

export default function Scores() {
  const [score, setScore] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const addScore = async () => {
    if (!score) {
      alert("Enter a score");
      return;
    }

    try {
      setLoading(true);

      const { data } = await supabase.auth.getUser();
      const user = data.user;

      if (!user) {
        alert("Login required");
        return;
      }

      await supabase.from("scores").insert([
        {
          user_id: user.id,
          score: Number(score),
          played_at: new Date(),
        },
      ]);

      alert("Score added successfully ⛳");

      // 🔁 go back to dashboard
      navigate("/dashboard");

    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
      setScore("");
    }
  };

  return (
    <div className="p-6 text-white">

      {/* 🔙 Back */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-gray-400 hover:text-white"
      >
        ← Back
      </button>

      <h1 className="text-2xl mb-6">Add Score ⛳</h1>

      <div className="flex gap-4">
        <input
          type="number"
          placeholder="Enter your score"
          value={score}
          onChange={(e) => setScore(e.target.value)}
          className="p-3 rounded bg-gray-800 outline-none"
        />

        <button
          onClick={addScore}
          disabled={loading}
          className="bg-primary px-6 py-3 rounded-xl hover:scale-105 transition disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add"}
        </button>
      </div>

    </div>
  );
}