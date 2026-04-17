import { useState } from "react";
import { createSubscription } from "../../services/subscriptionService";

export default function Subscription() {
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (plan) => {
    try {
      setLoading(true);

      // simulate payment delay
      await new Promise((res) => setTimeout(res, 1000));

      await createSubscription(plan);

      alert("✅ Subscription activated successfully!");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 text-white">

      <h1 className="text-3xl mb-6 text-center">
        Choose Your Plan
      </h1>

      <p className="text-center text-gray-400 mb-8">
        A portion of your subscription supports your selected charity ❤️
      </p>

      <div className="grid md:grid-cols-2 gap-6">

        {/* Monthly Plan */}
        <div className="bg-white/5 p-6 rounded-2xl border border-white/10 text-center shadow-lg hover:scale-105 transition">
          <h2 className="text-xl mb-2">Monthly Plan</h2>
          <p className="text-3xl font-bold mb-4">₹500</p>

          <button
            onClick={() => handleSubscribe("monthly")}
            disabled={loading}
            className="bg-primary px-6 py-3 rounded-xl transition disabled:opacity-50"
          >
            {loading ? "Processing..." : "Subscribe"}
          </button>
        </div>

        {/* Yearly Plan */}
        <div className="bg-white/5 p-6 rounded-2xl border border-white/10 text-center shadow-lg hover:scale-105 transition">
          <h2 className="text-xl mb-2">Yearly Plan</h2>
          <p className="text-3xl font-bold mb-4">₹5000</p>

          <button
            onClick={() => handleSubscribe("yearly")}
            disabled={loading}
            className="bg-accent px-6 py-3 rounded-xl transition disabled:opacity-50"
          >
            {loading ? "Processing..." : "Subscribe"}
          </button>
        </div>

      </div>

      {/* Demo Notice */}
      <p className="text-center text-gray-500 text-sm mt-6">
        (Demo payment system for evaluation purposes)
      </p>

    </div>
  );
}