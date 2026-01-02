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
    ruby: { symbol: "♦️ ", count: 6, alias: "r", coins: [7, 7, 5, 5, 5] },
    gold: { symbol: "⚱️ ", count: 6, alias: "g", coins: [6, 6, 5, 5, 5] },
    silver: { symbol: "🪙 ", count: 6, alias: "v", coins: [5, 5, 5, 5, 5] },
    cloth: {
      symbol: "👕 ",
      count: 8,
      alias: "o",
      coins: [5, 3, 3, 2, 2, 1, 1],
    },
    spices: {
      symbol: "🌶️ ",
      count: 8,
      alias: "p",
      coins: [5, 3, 3, 2, 2, 1, 1],
    },
    leather: {
      symbol: "💼 ",
      count: 10,
      alias: "l",
      coins: [4, 3, 2, 1, 1, 1, 1, 1, 1],
    },
    camels: { symbol: "🐪 ", count: 8, alias: "m", coins: [5] },
  },
  bonus: {
    3: [1, 1, 2, 2, 2, 3, 3],
    4: [4, 4, 5, 5, 6, 6],
    5: [8, 8, 9, 10, 10],
  },
  players: [
    { playerId: 1, playerName: "", herd: [], hand: [] },
    { playerId: 2, playerName: "", herd: [], hand: [] },
  ],
};