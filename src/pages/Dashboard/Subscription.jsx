import { createSubscription } from "../../services/subscriptionService";

export default function Subscription() {
  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl mb-4">Choose Plan</h1>

      <button
        className="bg-green-500 px-4 py-2 mr-4"
        onClick={() => createSubscription("monthly")}
      >
        Monthly Plan
      </button>

      <button
        className="bg-blue-500 px-4 py-2"
        onClick={() => createSubscription("yearly")}
      >
        Yearly Plan
      </button>
    </div>
  );
}