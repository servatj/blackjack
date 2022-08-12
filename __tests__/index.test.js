import { createDeck, shuffleDeck } from '../src/lib/blackJack';

describe('blackJack', () => {
  it('should created deck of 52 cards', () => {
    const expectedDeckLength = 52;
    const deck = createDeck([]);
    expect(deck.length).toBe(expectedDeckLength);
    expect(deck.includes('AS')).toBeTruthy();
  })

  it('first element of the deck must be different after shuffling', () => {
    const deck = createDeck([]);
    const initial = deck[0];
    const newDeck = shuffleDeck(deck) ;
    expect(initial).not.toBe(newDeck[0]);
  })
})
