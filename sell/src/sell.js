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
  console.log(`Hand : ${player.hand}\nHerd : ${player.herd}\n\n`);
  const input = prompt("what do you wanna sell and how many...?");
  const [good, count] = input.trim().split(" ");
  if (!isValidRequest(player.hand, good, count)) {
    console.log("invalid input");
    return sellGoods(player, goods, bonusTokens);
  }
  RemoveGoods(player.hand, good, count);
  const bonus = count >= 3 ? getBonus(bonusTokens, count) : 0;
  return player.points +=
    goods[good].coins.splice(0, count).reduce((x, y) => x + y) + bonus;
};

const testcases = {
  1: {
    gameData: { market: ["r", "r", "o", "m", "m"] },
    player: { hand: ["v", "r", "r", "r"], herd: ["m"],points: 0 },
  },
  2: {
    gameData: { market: ["r", "r", "o", "r", "m"] },
    player: { hand: ["v", "v", "o", "r", "r"], herd: ["m", "m", "m"],points: 0 },
  },
  3: {
    gameData: { market: ["r", "r", "o", "r", "l"] },
    player: { hand: [], herd: ["m", "m", "m", "m", "m"],points: 0 },
  },
  4: {
    gameData: { market: ["r", "r", "r", "r", "r"] },
    player: {
      hand: ["l", "l", "l", "l", "l"],
      herd: ["m", "m", "m", "m", "m"],
      points: 0
    },
  },
};

const input = testcases[1];

const goodsMap =  {
    r: { symbol: "♦️ ", count: 6, goodName: "ruby", coins: [7, 7, 5, 5, 5] },
    g: { symbol: "⚱️ ", count: 6, goodName: "gold", coins: [6, 6, 5, 5, 5] },
    v: { symbol: "🪙 ", count: 6, goodName: "silver", coins: [5, 5, 5, 5, 5] },
    o: {
      symbol: "👕 ",
      count: 8,
      goodName: "cloth",
      coins: [5, 3, 3, 2, 2, 1, 1],
    },
    p: {
      symbol: "🌶️ ",
      count: 8,
      goodName: "spices",
      coins: [5, 3, 3, 2, 2, 1, 1],
    },
    l: {
      symbol: "💼 ",
      count: 10,
      goodName: "leather",
      coins: [4, 3, 2, 1, 1, 1, 1, 1, 1],
    },
    m: { symbol: "🐪 ", count: 8, goodName: "camels", coins: [5] },
  };

const bonus = {
  3: [1, 1, 2, 2, 2, 3, 3],
  4: [4, 4, 5, 5, 6, 6],
  5: [8, 8, 9, 10, 10],
};

console.log(sellGoods(input.player, goodsMap, bonus));
