import Card from "../common/Card";

export default function CharityCard({ charity, onSelect }) {
  return (
    <Card>
      <img
        src={charity.image}
        alt={charity.name}
        className="w-full h-40 object-cover rounded-xl mb-4"
      />

      <h2 className="text-xl font-semibold">{charity.name}</h2>

      <p className="text-gray-400 text-sm mt-2">
        {charity.description}
      </p>

      <button
        onClick={() => onSelect(charity.id)}
        className="mt-4 bg-primary px-4 py-2 rounded"
      >
        Select
      </button>
    </Card>
  );
}