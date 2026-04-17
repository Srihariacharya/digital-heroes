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

    if (score < 1 || score > 200) {
      alert("Enter valid score (1–200)");
      return;
    }

    try {
      setLoading(true);

      const result = await addScore(score);

      if (result === "updated") {
        alert("Score updated for today 🔄");
      } else {
        alert("Score added successfully ⛳");
      }

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
          onClick={handleAddScore}
          disabled={loading}
          className="bg-primary px-6 py-3 rounded-xl hover:scale-105 transition disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Score"}
        </button>
      </div>

    </div>
  );
}