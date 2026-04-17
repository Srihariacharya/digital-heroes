export const calculatePrizePool = (totalAmount) => {
  return {
    five: totalAmount * 0.4,
    four: totalAmount * 0.35,
    three: totalAmount * 0.25,
  };
};