import { useEffect, useState } from "react";
import { addScore, getScores } from "../../services/scoreService";

export default function Scores() {
  const [scores, setScores] = useState([]);
  const [value, setValue] = useState("");
  const [date, setDate] = useState("");

  const loadScores = async () => {
    const data = await getScores();
    setScores(data);
  };

  useEffect(() => {
    loadScores();
  }, []);

  const handleSubmit = async () => {
    try {
      await addScore(Number(value), date);
      setValue("");
      setDate("");
      loadScores();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl mb-4">Your Scores</h1>

      {/* INPUT */}
      <div className="mb-4">
        <input
          type="number"
          placeholder="Score (1-45)"
          className="p-2 mr-2 bg-gray-800"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <input
          type="date"
          className="p-2 mr-2 bg-gray-800"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="bg-green-500 px-4 py-2"
        >
          Add Score
        </button>
      </div>

      {/* LIST */}
      {scores.map((s) => (
        <div key={s.id} className="bg-gray-800 p-3 mb-2 rounded">
          <p>Score: {s.score}</p>
          <p>Date: {s.played_at}</p>
        </div>
      ))}
    </div>
  );
}