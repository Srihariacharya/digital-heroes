import { supabase } from "./supabase";

// ➕ Add OR Update Score (UPSERT - FINAL FIX)
export const addScore = async (score) => {
  try {
    const { data: userData, error: userError } =
      await supabase.auth.getUser();

    if (userError || !userData?.user) {
      throw new Error("User not authenticated");
    }

    const user = userData.user;

    // 🔹 Use ONLY date (no time) → matches constraint
    const today = new Date().toISOString().split("T")[0];

    const { error } = await supabase
      .from("scores")
      .upsert(
        [
          {
            user_id: user.id,
            score: Number(score),
            played_at: today, // ✅ IMPORTANT FIX
          },
        ],
        {
          onConflict: "user_id,played_at", // 🔥 MAGIC LINE
        }
      );

    if (error) throw error;

    return "success";

  } catch (err) {
    console.error("Score Error:", err.message);
    throw err;
  }
};

// 📊 Get Scores
export const getScores = async () => {
  try {
    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user;

    if (!user) return [];

    const { data, error } = await supabase
      .from("scores")
      .select("*")
      .eq("user_id", user.id)
      .order("played_at", { ascending: false });

    if (error) throw error;

    return data || [];

  } catch (err) {
    console.error(err);
    return [];
  }
};