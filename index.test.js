const { createDeck, shuffleDeck } = require('./index')

describe('blackJack', () => {
  it('should created deck of 52 cards', () => {
    const expectedDeckLength = 52;
    const deck = createDeck()
    expect(deck.length).toBe(expectedDeckLength)
    expect(deck.includes('AS')).toBeTruthy()
  })

  it('first element of the deck must be different after shuffling', () => {
    const deck = createDeck();
    const newDeck = shuffleDeck(deck) ;
    console.log(deck, newDeck)
    expect(deck[0]).not.toBe(newDeck[0])
    expect(deck).not.toBe(newDeck)
  })


})
