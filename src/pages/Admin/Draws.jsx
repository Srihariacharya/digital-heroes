import { runDrawAndCalculateWinners } from "../../services/drawService";

export default function Draws() {
  const handleRunDraw = async () => {
    await runDrawAndCalculateWinners();
    alert("Draw completed!");
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl mb-4">Admin Draw Panel</h1>

      <button
        onClick={handleRunDraw}
        className="bg-red-500 px-6 py-3"
      >
        Run Monthly Draw
      </button>
    </div>
  );
}