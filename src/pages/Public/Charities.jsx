import { useEffect, useState } from "react";
import { getCharities } from "../../services/charityService";
import CharityCard from "../../components/cards/CharityCard";
import { supabase } from "../../services/supabase";
import { useNavigate } from "react-router-dom";

export default function Charities() {
  const [charities, setCharities] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [loadingId, setLoadingId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    loadCharities();
    getSelectedCharity();
  }, []);

  // 🔹 Load all charities
  const loadCharities = async () => {
    try {
      const data = await getCharities();
      setCharities(data || []);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 Get user's selected charity
  const getSelectedCharity = async () => {
    const { data } = await supabase.auth.getUser();
    const user = data.user;

    if (!user) return;

    const { data: profile } = await supabase
      .from("profiles")
      .select("charity_id")
      .eq("id", user.id)
      .single();

    if (profile?.charity_id) {
      setSelectedId(profile.charity_id);
    }
  };

  // 🔹 Select charity
  const selectCharity = async (id) => {
    try {
      setLoadingId(id);

      const { data } = await supabase.auth.getUser();
      const user = data.user;

      if (!user) {
        alert("Please login first");
        return;
      }

      await supabase
        .from("profiles")
        .update({ charity_id: id })
        .eq("id", user.id);

      // ✅ Update UI instantly
      setSelectedId(id);

      // ✅ Better UX
      alert("Charity selected successfully ❤️");

      // ✅ Redirect to dashboard
      navigate("/dashboard");

    } catch (err) {
      alert(err.message);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl mb-6 text-center">
        Choose a Cause You Care About ❤️
      </h1>

      <p className="text-center text-gray-400 mb-8">
        A portion of your subscription goes directly to your chosen charity.
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        {charities.map((c) => (
          <CharityCard
            key={c.id}
            charity={c}
            onSelect={selectCharity}
            isSelected={selectedId === c.id}
            isLoading={loadingId === c.id}
          />
        ))}
      </div>
    </div>
  );
}