import { supabase } from "./supabase";

// ➕ Add or Update Score
export const addScore = async (score) => {
  try {
    const { data: userData, error: userError } =
      await supabase.auth.getUser();

    if (userError || !userData?.user) {
      throw new Error("User not authenticated");
    }

    const user = userData.user;

    // 🔹 Today's date range
    const today = new Date().toISOString().split("T")[0];

    // 🔍 Check if already exists today
    const { data: existing, error: fetchError } = await supabase
      .from("scores")
      .select("*")
      .eq("user_id", user.id)
      .gte("played_at", today)
      .lt("played_at", today + "T23:59:59");

    if (fetchError) throw fetchError;

    // 🔄 If exists → UPDATE
    if (existing && existing.length > 0) {
      const { error: updateError } = await supabase
        .from("scores")
        .update({ score: Number(score) })
        .eq("id", existing[0].id);

      if (updateError) throw updateError;

      return "updated";
    }

    // ➕ Insert new
    const { error: insertError } = await supabase
      .from("scores")
      .insert([
        {
          user_id: user.id,
          score: Number(score),
          played_at: new Date().toISOString(),
        },
      ]);

    if (insertError) throw insertError;

    return "inserted";

  } catch (err) {
    console.error("Score Error:", err.message);
    throw err;
  }
};

// 📊 Get Scores
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