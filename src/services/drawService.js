import { supabase } from "./supabase";
import { calculatePrizePool } from "../utils/calculatePrize";

// helper
const countMatches = (draw, scores) => {
  return draw.filter((num) => scores.includes(num)).length;
};

export const runDrawAndCalculateWinners = async () => {
  // 1. Generate draw numbers
  const drawNumbers = Array.from({ length: 5 }, () =>
    Math.floor(Math.random() * 45) + 1
  );

  // 2. Save draw
  const { data: draw } = await supabase
    .from("draws")
    .insert([{ numbers: drawNumbers, status: "published" }])
    .select()
    .single();

  // 3. Get all users with scores
  const { data: scores } = await supabase.from("scores").select("*");

  const userMap = {};

  scores.forEach((s) => {
    if (!userMap[s.user_id]) userMap[s.user_id] = [];
    userMap[s.user_id].push(s.score);
  });

  // 4. Count subscribers
  const { data: subs } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("status", "active");

  const totalPool = subs.length * 100; // assume ₹100 per user

  const prize = calculatePrizePool(totalPool);

  let winners = [];

  // 5. Match logic
  Object.keys(userMap).forEach((userId) => {
    const matches = countMatches(drawNumbers, userMap[userId]);

    if (matches >= 3) {
      winners.push({ userId, matches });
    }
  });

  // 6. Distribute prizes
  const groups = { 3: [], 4: [], 5: [] };

  winners.forEach((w) => groups[w.matches]?.push(w));

  for (let match of [3, 4, 5]) {
    const group = groups[match];

    if (group.length > 0) {
      const pool =
        match === 5 ? prize.five :
        match === 4 ? prize.four :
        prize.three;

      const amount = pool / group.length;

      for (let w of group) {
        await supabase.from("winnings").insert([
          {
            user_id: w.userId,
            draw_id: draw.id,
            match_count: match,
            amount,
            status: "pending",
          },
        ]);
      }
    }
  }
};