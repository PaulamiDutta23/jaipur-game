/*
convension

m - camel
o - clothes
p - spices
v - silver
g - gold
r - ruby
l - leather

 */

export const gameData = {
  deck: [
    "r",
    "r",
    "r",
    "r",
    "r",
    "r",
    "g",
    "g",
    "g",
    "g",
    "g",
    "g",
    "v",
    "v",
    "v",
    "v",
    "v",
    "v",
    "o",
    "o",
    "o",
    "o",
    "o",
    "o",
    "o",
    "o",
    "p",
    "p",
    "p",
    "p",
    "p",
    "p",
    "p",
    "p",
    "l",
    "l",
    "l",
    "l",
    "l",
    "l",
    "l",
    "l",
    "l",
    "l",
    "m",
    "m",
    "m",
    "m",
    "m",
    "m",
    "m",
    "m",
  ],
  market: ["m", "m", "m"],
  goodsMap: {
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
  },
  bonus: {
    3: [1, 1, 2, 2, 2, 3, 3],
    4: [4, 4, 5, 5, 6, 6],
    5: [8, 8, 9, 10, 10],
  },
  players: [
    { playerId: 1, playerName: "", herd: [], hand: [], points: 0 },
    { playerId: 2, playerName: "", herd: [], hand: [], points: 0 },
  ],
};