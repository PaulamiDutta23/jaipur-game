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

const isEnoughAvailableCards = (market, playerCards) => {
  const differentFromPlayerCardsInMarket = withoutAll(market, playerCards);
  return (differentFromPlayerCardsInMarket.length >= playerCards.length);
};

const wilGoodslBecomeMoreThan7 = (hand, playerCards) => {
  const camelCountInPlayerCards = playerCards.reduce(
    (count, x) => x === "m" ? count + 1 : count,
    0,
  );
  return hand.length + camelCountInPlayerCards > 7;
};

const isExchangePossible = (market, hand, playerCards) => {
  if (!isEnoughAvailableCards(market, playerCards)) {
    console.log("There are not enough available cards to exchange from market");
    return false;
  }
  if (wilGoodslBecomeMoreThan7(hand, playerCards)) {
    console.log("After exchange your goods count will become more than 7!!!");
    return false;
  }
  return true;
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
    console.log("Please enter cards from your hand!!!");
    return false;
  }

  return true;
};

const getPlayerCards = (market, hand, herd) => {
  const cardsFromPlayer = prompt(
    "Enter the cards you want to exchange from your hand (separated by ','): ",
  ); //supposed seperated by ","
  const playerCards = cardsFromPlayer.split(",");

  if (!areValidPlayerCards(playerCards, hand, herd)) {
    return getPlayerCards(market, hand, herd);
  }

  if (!isExchangePossible(market, hand, playerCards)) {
    return getPlayerCards(market, hand, herd);
  }
  return playerCards;
};

const doIntersect = (marketCards, playerCards) =>
  marketCards.some((card) => playerCards.includes(card));

const areValidMarketCards = (market, marketCards, playerCards) => {
  if (marketCards.length !== playerCards.length) {
    console.log("Please enter equal number of cards!!!");
    return false;
  }

  if (doIntersect(marketCards, playerCards)) {
    console.log("You can't exchange same cards!!!");
    return false;
  }

  if (!doContainFromExistings(marketCards, market)) {
    console.log("Please enter cards from existing market!!!");
    return false;
  }

  return true;
};

const getMarketCards = (market, playerCards, hand, herd) => {
  const cardsFromMarket = prompt("Enter the cards you want from market : ");
  let cardsOfMarket = cardsFromMarket.split(",");

  if (!areValidMarketCards(market, cardsOfMarket, playerCards)) {
    const response = confirm("Do you want to exchange ?");
    if(response) {
      playerCards = getPlayerCards(market,hand,herd);
      return getMarketCards(market,playerCards,hand,herd);
    } else {
      cardsOfMarket = [];
    }
  }
  return [playerCards, cardsOfMarket];
};

export const exchange = (player, gameData) => {
  const market = gameData.market;
  console.log(`
    Market : ${market}\n
    Hand : ${player.hand}
    Herd : ${player.herd}`);

  const playerCard = getPlayerCards(market, player.hand, player.herd);
  const [playerCards, marketCards] = getMarketCards(market,playerCard,player.hand,player.herd);
    if (marketCards.length < 1) {
      console.log("choose other option");
      return; // returns to the main function so that player can change functionality option from exchange to other
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
  3: {
    gameData: { market: ["r", "r", "o", "r", "l"] },
    player: { hand: [], herd: ["m", "m", "m", "m", "m"] },
  },
  4: {
    gameData: { market: ["r", "r", "r", "r", "r"] },
    player: {
      hand: ["l", "l", "l", "l", "l"],
      herd: ["m", "m", "m", "m", "m"],
    },
  },
};

const input = testcases[1];
console.log(exchange(input.player, input.gameData));
