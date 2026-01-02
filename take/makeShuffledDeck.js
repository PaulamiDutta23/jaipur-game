export const shuffle = (deck) => {
  const shuffledDeck = [];
  const deckCount = deck.length;

  for (let index = 0; index < deckCount; index++) {
    const deckLength = deck.length;
    const randomIndex = Math.floor(Math.random() * deckLength);
    shuffledDeck.push(deck.splice(randomIndex, 1)[0]);
  }
  return shuffledDeck;
};