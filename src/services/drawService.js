import { supabase } from "./supabase";

export const runDraw = async () => {
  const numbers = Array.from({ length: 5 }, () =>
    Math.floor(Math.random() * 45) + 1
  );

  const { error } = await supabase.from("draws").insert([
    {
      numbers,
      type: "random",
      status: "published",
    },
  ]);

  if (error) throw error;
};