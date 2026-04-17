import { supabase } from "./supabase";

// ➕ Add / Update Score (PRD compliant)
export const addScore = async (score) => {
  const { data: userData, error: userError } =
    await supabase.auth.getUser();

  if (userError || !userData?.user) {
    throw new Error("User not authenticated");
  }

  const user = userData.user;

  // ✅ PRD: score range 1–45
  if (score < 1 || score > 45) {
    throw new Error("Score must be between 1 and 45");
  }

  const today = new Date().toISOString().split("T")[0];

  // 🔍 Fetch existing scores
  const { data: scores, error: fetchError } = await supabase
    .from("scores")
    .select("*")
    .eq("user_id", user.id)
    .order("played_at", { ascending: true });

  if (fetchError) throw fetchError;

  // 🔄 If today's score exists → UPDATE
  const existing = scores.find((s) => s.played_at === today);

  if (existing) {
    const { error: updateError } = await supabase
      .from("scores")
      .update({ score })
      .eq("id", existing.id);

    if (updateError) throw updateError;

    return "updated";
  }

  // 🧠 Keep only latest 5 scores
  if (scores.length >= 5) {
    const oldest = scores[0];

    const { error: deleteError } = await supabase
      .from("scores")
      .delete()
      .eq("id", oldest.id);

    if (deleteError) throw deleteError;
  }

  // ➕ Insert new score
  const { error: insertError } = await supabase
    .from("scores")
    .insert([
      {
        user_id: user.id,
        score,
        played_at: today, // ✅ IMPORTANT: date only
      },
    ]);

  if (insertError) throw insertError;

  return "added";
};

// 📊 Get Scores (FIXED EXPORT)
export const getScores = async () => {
  try {
    const { data: userData, error: userError } =
      await supabase.auth.getUser();

    if (userError || !userData?.user) {
      throw new Error("User not authenticated");
    }

    const user = userData.user;

    const { data, error } = await supabase
      .from("scores")
      .select("*")
      .eq("user_id", user.id)
      .order("played_at", { ascending: false });

    if (error) throw error;

    return data || [];
  } catch (err) {
    console.error("Get Scores Error:", err.message);
    return [];
  }
};