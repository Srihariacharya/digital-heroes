import { useEffect, useState } from "react";
import { getCharities } from "../../services/charityService";
import CharityCard from "../../components/cards/CharityCard";
import { supabase } from "../../services/supabase";

export default function Charities() {
  const [charities, setCharities] = useState([]);

  useEffect(() => {
    getCharities().then(setCharities);
  }, []);

  const selectCharity = async (id) => {
    const user = (await supabase.auth.getUser()).data.user;

    await supabase
      .from("profiles")
      .update({ charity_id: id })
      .eq("id", user.id);

    alert("Charity selected!");
  };

  return (
    <div className="p-6">
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
          />
        ))}
      </div>
    </div>
  );
}