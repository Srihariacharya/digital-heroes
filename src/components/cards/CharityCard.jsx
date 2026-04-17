export default function CharityCard({
  charity,
  onSelect,
  isSelected,
  isLoading,
}) {
  return (
    <div
      className={`bg-white/5 p-6 rounded-2xl shadow-lg transition hover:scale-[1.02] ${
        isSelected
          ? "border-2 border-green-500"
          : "border border-white/10"
      }`}
    >
      <img
        src={charity.image}
        alt={charity.name}
        className="w-full h-40 object-cover rounded mb-4"
      />

      <h2 className="text-xl font-semibold">{charity.name}</h2>

      <p className="text-gray-400 text-sm mt-2">
        {charity.description}
      </p>

      <button
        onClick={() => onSelect(charity.id)}
        disabled={isSelected || isLoading}
        className={`mt-4 px-4 py-2 rounded transition ${
          isSelected
            ? "bg-gray-500"
            : "bg-primary hover:scale-105"
        } disabled:opacity-50`}
      >
        {isLoading
          ? "Selecting..."
          : isSelected
          ? "Selected ✅"
          : "Select"}
      </button>
    </div>
  );
}