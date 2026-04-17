import { useEffect, useState } from "react";
import { getCharities } from "../../services/charityService";
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
    <div className="p-6 text-white">
      <h1 className="text-2xl mb-4">Choose a Charity</h1>

      {charities.map((c) => (
        <div
          key={c.id}
          className="bg-gray-800 p-4 mb-3 rounded cursor-pointer"
          onClick={() => selectCharity(c.id)}
        >
          <h2>{c.name}</h2>
          <p>{c.description}</p>
        </div>
      ))}
    </div>
  );
}