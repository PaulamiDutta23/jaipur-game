const isValidRequest = (hand, good, count) => {
  const minimum = "opl".includes(good) ? 1 : 2;
  return count >= minimum && hand.filter((x) => x === good).length >= count;
};

const RemoveGoods = (hand, good, count) => {
  for (let i = 0; i < count; i++) {
    hand.splice(hand.indexOf(good), 1);
  }
};

const getBonus = (bonusTokens, count) => {
  const key = count <= 5 ? count : 5;
  return bonusTokens[key].pop();
};

const sellGoods = (player, goods, bonusTokens) => {
  const input = prompt("what do you wanna sell and how many...?");
  const [good, count] = input.trim().split(" ");
  if (!isValidRequest(player.hand, good, count)) {
    console.log("invalid input");
    return sellGoods(player, goods, bonusTokens);
  }
  RemoveGoods(player.hand, good, count);
  const bonus = count >= 3 ? getBonus(bonusTokens, count) : 0;
  return player.score +=
    goods[good].coins.splice(0, count).reduce((x, y) => x + y) + bonus;
};

// goodsMap = {
//     ruby: { symbol: "♦️ ", count: 6, alias: "r", coins: [7, 7, 5, 5, 5] },
//     gold: { symbol: "⚱️ ", count: 6, alias: "g", coins: [6, 6, 5, 5, 5] },
//     silver: { symbol: "🪙 ", count: 6, alias: "v", coins: [5, 5, 5, 5, 5] },
//     cloth: {
//       symbol: "👕 ",
//       count: 8,
//       alias: "o",
//       coins: [5, 3, 3, 2, 2, 1, 1],
//     },
//     spices: {
//       symbol: "🌶️ ",
//       count: 8,
//       alias: "p",
//       coins: [5, 3, 3, 2, 2, 1, 1],
//     },
//     leather: {
//       symbol: "💼 ",
//       count: 10,
//       alias: "l",
//       coins: [4, 3, 2, 1, 1, 1, 1, 1, 1],
//     },
//     camels: { symbol: "🐪 ", count: 8, alias: "m", coins: [5] },
// },