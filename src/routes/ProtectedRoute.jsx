import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { supabase } from "../services/supabase";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);
  const [allowed, setAllowed] = useState(null);

  useEffect(() => {
    const checkSubscription = async () => {
      if (!user) return setAllowed(false);

      const { data } = await supabase
        .from("subscriptions")
        .select("*")
        .eq("user_id", user.id)
        .eq("status", "active")
        .single();

      setAllowed(!!data);
    };

    checkSubscription();
  }, [user]);

  if (allowed === null) return <div>Loading...</div>;

  return allowed ? children : <Navigate to="/subscribe" />;
}