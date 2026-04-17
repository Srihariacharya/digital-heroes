import { useState } from "react";
import { addScore } from "../../services/scoreService";
import { useNavigate } from "react-router-dom";

export default function Scores() {
  const [score, setScore] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleAddScore = async () => {
    if (!score) {
      alert("Enter a score");
      return;
    }

    const numericScore = Number(score);

    if (numericScore < 1 || numericScore > 200) {
      alert("Enter valid score (1–200)");
      return;
    }

    try {
      setLoading(true);

      await addScore(numericScore);

      alert("Score saved successfully ⛳");

      navigate("/dashboard");

    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setLoading(false);
      setScore("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 text-white">

      {/* 🔙 Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 text-gray-400 hover:text-white transition"
      >
        ← Back
      </button>

      {/* 🏌️ Card Container */}
      <div className="w-full max-w-md bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-white/10 shadow-xl">

        {/* Title */}
        <h1 className="text-3xl font-semibold text-center mb-2">
          Add Score ⛳
        </h1>

        <p className="text-center text-gray-400 text-sm mb-6">
          Track your performance and improve your game
        </p>

        {/* Input */}
        <input
          type="number"
          placeholder="Enter your score (e.g. 72)"
          value={score}
          onChange={(e) => setScore(e.target.value)}
          className="w-full p-3 rounded-xl bg-gray-800 outline-none text-white mb-4 focus:ring-2 focus:ring-primary"
        />

        {/* Button */}
        <button
          onClick={handleAddScore}
          disabled={loading}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-600 py-3 rounded-xl font-medium hover:scale-[1.02] transition disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Score"}
        </button>

        {/* Info */}
        <p className="text-center text-gray-500 text-xs mt-4">
          You can update your score once per day
        </p>

      </div>
    </div>
  );
}