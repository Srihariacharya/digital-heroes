import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { supabase } from "../services/supabase";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);
  const [status, setStatus] = useState("loading"); 
  // loading | no-user | no-sub | allowed

  useEffect(() => {
    const checkSubscription = async () => {
      if (!user) {
        setStatus("no-user");
        return;
      }

      const { data } = await supabase
        .from("subscriptions")
        .select("*")
        .eq("user_id", user.id)
        .eq("status", "active")
        .single();

      if (data) {
        setStatus("allowed");
      } else {
        setStatus("no-sub");
      }
    };

    checkSubscription();
  }, [user]);

  // ⏳ Loading state
  if (status === "loading") {
    return <div className="text-white p-6">Checking access...</div>;
  }

  // ❌ Not logged in
  if (status === "no-user") {
    return <Navigate to="/auth" />;
  }

  // ❌ No subscription
  if (status === "no-sub") {
    return <Navigate to="/subscribe" />;
  }

  // ✅ Allowed
  return children;
}