import { shuffle } from "../take/makeShuffledDeck.js";
import { gameData } from "../game_ds/game_data.js";

// const market = ["CA", "CA", "CA"];
// const DECK = shuffleDeck();

const fillMarket = ({ market, deck }) => {
  if (deck.length < 1) return market;

  while (market.length < 5) {
    const good = deck.pop();
    if (good) market.push(good);
  }
  return market;
};

const takeFromMarket = (market, index) => {
  if (market[index] === "m") {
    const camels = [];
    while (market.includes("m")) {
      camels.push(market.splice(market.indexOf("m"), 1));
    }
    return camels.flat();
  }
  return market.splice(index, 1);
};

const addPlayerDetails = (gameData) => {
  for (const player of gameData.players) {
    player.playerName = prompt(`enter player ${player.playerId} name`);
  }
};

const setUpGame = (gameData) => {
  gameData.deck = shuffle(gameData.deck);
  gameData.bonus["3"] = shuffle(gameData.bonus["3"]);
  gameData.bonus["4"] = shuffle(gameData.bonus["4"]);
  gameData.bonus["5"] = shuffle(gameData.bonus["5"]);
  addPlayerDetails(gameData);
};

const main = () => {
  setUpGame(gameData);
  console.log(gameData);
  while (true) {
    const market = gameData.market;
    fillMarket(gameData);
    if (market.length < 5) {
      console.log("GameOver not enough goods in the market");
      break;
    }
    console.log(market.join(""));
    console.log([0, 1, 2, 3, 4].join(""));
    const index = parseInt(prompt("Enter index of good to take"));
    const good = takeFromMarket(market, index);
    console.log("\nYou took = ", good.join(""));
  }
};

main();