const { createDeck, shuffleDeck, dealHand, computeThePoints } = require('./index')()

describe('blackJack', () => {
  it('should created deck of 52 cards', () => {
    const expectedDeckLength = 52;
    const deck = createDeck();
    expect(deck.length).toBe(expectedDeckLength);
    expect(deck.includes('AS')).toBeTruthy();
  })

  it('first element of the deck must be different after shuffling', () => {
    const deck = createDeck();
    const initial = deck[0];
    const newDeck = shuffleDeck(deck) ;
    expect(initial).not.toBe(newDeck[0]);
  })

  it('Should deal a hand with 5 cards when passing deck and 5', () => {
    const deck = shuffleDeck(createDeck());
    const hand = dealHand(deck, 2);
    expect(deck.length).toBe(50);
    expect(hand.length).toBe(2);
  })

  it("Should calculate the value given the folowing hand ['AS', 5'] ", () => {
    expect(computeThePoints(['AS', '5H'])).toBe(16);
    expect(computeThePoints(['AC', '2S'])).toBe(13);
    expect(computeThePoints(['5D', 'TH'])).toBe(15);
    expect(computeThePoints(['AH', 'AS'])).toBe(12);
  })
})
