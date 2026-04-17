import { supabase } from "./supabase";

export const addScore = async (score) => {
  const { data: userData } = await supabase.auth.getUser();
  const user = userData.user;

  if (!user) throw new Error("User not logged in");

  // ✅ PRD RANGE FIX
  if (score < 1 || score > 45) {
    throw new Error("Score must be between 1 and 45");
  }

  const today = new Date().toISOString().split("T")[0];

  // 🔍 Get existing scores
  const { data: scores } = await supabase
    .from("scores")
    .select("*")
    .eq("user_id", user.id)
    .order("played_at", { ascending: true });

  // 🔄 Replace if same date exists
  const existing = scores.find((s) => s.played_at === today);

  if (existing) {
    await supabase
      .from("scores")
      .update({ score })
      .eq("id", existing.id);

    return "updated";
  }

  // 🧠 Keep only last 5
  if (scores.length >= 5) {
    const oldest = scores[0];
    await supabase.from("scores").delete().eq("id", oldest.id);
  }

  // ➕ Insert new
  const { error } = await supabase.from("scores").insert([
    {
      user_id: user.id,
      score,
      played_at: today,
    },
  ]);

  if (error) throw error;

  return "added";
};