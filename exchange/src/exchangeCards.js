import { withoutAll } from "jsr:@std/collections";

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

const getInputFromUser = () => {
  const cardsFromUser = prompt("Enter the cards you want to exchange : "); //supposed seperated by ","
  const cardsOfUser = cardsFromUser.split(",");
  if (cardsOfUser.length < 2) {
    console.log("Please enter more than or equal to 2 !!!");
    return getInputFromUser();
  }
  const cardsFromMarket = prompt("Enter the cards you want from market : ");
  const cardsOfMarket = cardsFromMarket.split(",");
  return [cardsOfUser, cardsOfMarket];
};

const doIntersect = (marketCards, playerCards) =>
  !marketCards.some((card) => playerCards.includes(card));

const isGoodsLessThan8 = (marketCards, playerCards, hand) => {
  const goodsInExchange = withoutAll(playerCards, ["m"]);
  const remainingGoods = withoutAll(hand, goodsInExchange);
  const goodsInMarketCards = withoutAll(marketCards, ["m"]);
  console.log(goodsInExchange, remainingGoods, goodsInMarketCards);

  return (remainingGoods.length + goodsInMarketCards.length) < 8;
};

const isValidInput = (playerCards, marketCards, hand) => {
  const areOfEqualNumbers = marketCards.length === playerCards.length;
  const hasNoIntersectionSet = doIntersect(marketCards, playerCards);
  const isGoodsCountBelow8 = isGoodsLessThan8(marketCards, playerCards, hand);
  console.log(areOfEqualNumbers, hasNoIntersectionSet, isGoodsCountBelow8);

  return areOfEqualNumbers && hasNoIntersectionSet && isGoodsCountBelow8;
};

export const exchange = (player, gameData) => {
  const market = gameData.market;
  console.log(`
    Market : ${market}\n
    Hand : ${player.hand}
    Herd : ${player.herd}`);
  let [playerCards, marketCards] = getInputFromUser();

  if (!isValidInput(playerCards, marketCards, player.hand)) {
    [playerCards, marketCards] = getInputFromUser();
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
