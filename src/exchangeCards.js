const hand = ["L", "S", "CL", "D", "R", "CA", "CA"];
const market = ["CA", "D", "R", "R", "CA"];
import { withoutAll } from "jsr:@std/collections";

const takeFromMarket = (indices, market) => {
  const temp = [];
  for (const index of indices) {
    temp.push(market[index]);
  }

  const modifiedMarket = withoutAll(market, temp);
  return { temp, modifiedMarket };
};

const swapCards = (indices, hand, market, temp) => {
  let i = 0;
  for (const index of indices) {
    market.push(hand[index]);
    hand[index] = temp[i++];
  }

  return { hand, market };
};

const validate = (noOfCard) => {
  if (noOfCard < 2) {
    console.log("Please enter more than or equal to 2 !!!");
    return getNoOfCardsExchange();
  }

  return noOfCard;
};

const getNoOfCardsExchange = () => {
  const noOfCard = +prompt("Enter the no of cards you want to exchange : ");
  return validate(noOfCard);
};

const parse = string => string.split(",").map((index) => parseInt(index));

const getCardIndicesOfMarket = () => {
  const indicesInString = prompt(
    "Enter the indices of cards you want to exchange with: ",
  );
  return parse(indicesInString);
};

const getCardIndicesOfHand = () => {
  const indicesInString = prompt(
    "Enter the indices of cards from your hand you want to exchange : ",
  );
  return parse(indicesInString);
};

export const exchange = (hand, market) => {
  console.log(market, "hand : ", hand);
  const noOfCardForExchange = getNoOfCardsExchange();
  const cardIndicesOfMarket = getCardIndicesOfMarket();
  const { temp, modifiedMarket } = takeFromMarket(cardIndicesOfMarket, market);
  const cardIndicesOfHand = getCardIndicesOfHand();
  return swapCards(cardIndicesOfHand, hand, modifiedMarket, temp);
};

console.log(exchange(hand, market));
