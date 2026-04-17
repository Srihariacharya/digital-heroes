import { supabase } from "./supabase";

export const createSubscription = async (plan) => {
  const user = (await supabase.auth.getUser()).data.user;

  const start = new Date();
  const end = new Date();

  if (plan === "monthly") {
    end.setMonth(end.getMonth() + 1);
  } else {
    end.setFullYear(end.getFullYear() + 1);
  }

  const { error } = await supabase.from("subscriptions").insert([
    {
      user_id: user.id,
      plan,
      status: "active",
      start_date: start,
      end_date: end,
    },
  ]);

  if (error) throw error;
};