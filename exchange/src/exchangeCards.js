import { distinct, intersect, withoutAll } from "jsr:@std/collections";

const takeFromPlayer = (playerCards, player) => {
  const hand = player.hand;
  const herd = player.herd;
  const tempCards = [];
  for (const card of playerCards) {
    const temp = card === "m" ? herd.pop() : hand.splice(hand.indexOf(card), 1);
    tempCards.push(...temp);
  }

  return tempCards;
};

const swapCards = (temp, marketCards, market, player) => {
  const hand = player.hand;
  const herd = player.herd;
  let i = 0;

  for (const card of marketCards) {
    card === "m" ? herd.push(card) : hand.push(card);
    market.splice(market.indexOf(card), 1, temp[i++]);
  }

  return { market, player };
};

const isExchangePossible = (market, playerCards) => {
  const differentFromPlayerCardsInMarket = withoutAll(market, playerCards);
  return differentFromPlayerCardsInMarket.length > 1;
};

const frequency = (table, key) => {
  let index = table.findIndex((pair) => pair[0] === key);
  if (index === -1) {
    table.push([key, 0]);
    index = table.length - 1;
  }
  table[index][1]++;
  return table;
};

const doContainFromExistings = (inputCards, existingCards) => {
  const frequencyOfInput = inputCards.reduce(frequency, []);
  const frequencyOfExistingCards = existingCards.reduce(frequency, []);
  return frequencyOfInput.every((pair) =>
    frequencyOfExistingCards.some((x) => pair[0] === x[0] && pair[1] <= x[1])
  );
};

const areValidPlayerCards = (playerCards, hand, herd) => {
  if (playerCards.length < 2) {
    console.log("Please Enter more than or equals to 2 cards!!!");
    return false;
  }

  const merged = [];
  merged.push(...herd, ...hand);

  if (!doContainFromExistings(playerCards, merged)) {
    console.log("Please enter cards from the list you have!!!");
    return false;
  }

  return true;
};

const getPlayerCards = (market, hand, herd) => {
  const cardsFromPlayer = prompt("Enter the cards you want to exchange : "); //supposed seperated by ","
  const playerCards = cardsFromPlayer.split(",");

  if (!isExchangePossible(market, playerCards)) {
    return;
  }

  if (!areValidPlayerCards(playerCards, hand, herd)) {
    return getPlayerCards(market, hand, herd);
  }
  return playerCards;
};

const doIntersect = (marketCards, playerCards) =>
  marketCards.some((card) => playerCards.includes(card));

const isGoodsLessThan8 = (marketCards, playerCards, hand) => {
  const goodsInPlayerCards = withoutAll(playerCards, ["m"]);
  const leftGoodsInExistingCards = withoutAll(hand, goodsInPlayerCards);
  const goodsInMarketCards = withoutAll(marketCards, ["m"]);
  return (leftGoodsInExistingCards.length + goodsInMarketCards.length) < 8;
};

const areValidMarketCards = (market, hand, marketCards, playerCards) => {
  if (marketCards.length !== playerCards.length) {
    console.log("Please enter equal number of cards!!!");
    return false;
  }

  if (doIntersect(marketCards, playerCards)) {
    console.log("You can't exchange same cards!!!");
    return false;
  }

  if (!isGoodsLessThan8(marketCards, playerCards, hand)) {
    console.log("After exchange your goods count will become more than 7!!!");
    return false;
  }

  if (!doContainFromExistings(marketCards, market)) {
    console.log("Please enter cards from the list you have!!!");
    return false;
  }

  return true;
};

const getMarketCards = (market, hand, playerCards) => {
  const cardsFromMarket = prompt("Enter the cards you want from market : ");
  const cardsOfMarket = cardsFromMarket.split(",");
  if (
    !isGoodsLessThan8(cardsOfMarket, playerCards, hand) &&
    playerCards.includes("m")
  ) {
    return;
  }
  if (!areValidMarketCards(market, hand, cardsOfMarket, playerCards)) {
    return getMarketCards(market, hand, playerCards);
  }
  return cardsOfMarket;
};

export const exchange = (player, gameData) => {
  const market = gameData.market;
  console.log(`
    Market : ${market}\n
    Hand : ${player.hand}
    Herd : ${player.herd}`);
  const playerCards = getPlayerCards(market, player.hand, player.herd);

  if (!playerCards) {
    console.log("Exchange is not possible in this situation!!!\nPlay again");
    return;
  }

  const marketCards = getMarketCards(market, player.hand, playerCards);

  if (!marketCards) {
    console.log("Exchange is not possible in this situation!!!\nPlay again");
    return;
  }

  const tempCards = takeFromPlayer(playerCards, player);
  return swapCards(tempCards, marketCards, market, player);
};
const testcases = {
  1: {
    gameData: { market: ["r", "r", "o", "m", "m"] },
    player: { hand: ["v", "v", "r", "r"], herd: ["m"] },
  },
  2: {
    gameData: { market: ["r", "r", "o", "r", "m"] },
    player: { hand: ["v", "v", "o", "r", "r"], herd: ["m", "m", "m"] },
  },
};

const input = testcases[2];
console.log(exchange(input.player, input.gameData));
