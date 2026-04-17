import { supabase } from "./supabase";

export const getCharities = async () => {
  const { data, error } = await supabase
    .from("charities")
    .select("*");

  if (error) throw error;
  return data;
};