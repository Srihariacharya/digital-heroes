import { supabase } from "./supabase";

// ➕ Add Score
export const addScore = async (score, date) => {
  const user = (await supabase.auth.getUser()).data.user;

  const { data: scores } = await supabase
    .from("scores")
    .select("*")
    .eq("user_id", user.id)
    .order("played_at", { ascending: true });

  const exists = scores.find((s) => s.played_at === date);
  if (exists) {
    throw new Error("Score already exists for this date");
  }

  if (scores.length >= 5) {
    const oldest = scores[0];
    await supabase.from("scores").delete().eq("id", oldest.id);
  }

  const { error } = await supabase.from("scores").insert([
    {
      user_id: user.id,
      score,
      played_at: date,
    },
  ]);

  if (error) throw error;
};

// 📊 Get Scores
export const getScores = async () => {
  const user = (await supabase.auth.getUser()).data.user;

  const { data, error } = await supabase
    .from("scores")
    .select("*")
    .eq("user_id", user.id)
    .order("played_at", { ascending: false });

  if (error) throw error;
  return data;
};