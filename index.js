const createDeck = () => {
  const suits = ['S', 'H', 'C', 'D']
  const values = ['A', '2', '3', '4','5','6','7','8','9', 'T', 'J', 'Q', 'K']
  const cards = []
  suits.forEach((suit) => {
    values.forEach((value) => {
      cards.push(`${value}${suit}`)
    })
  })
  return cards;
}

const shuffleDeck = (deck) => {
  const newDeck = [...deck]
  for(let i = 0; i < deck.length; i++) {
    const numberRandom = Math.floor(Math.random() * i)
    const temp = newDeck[i]
    newDeck[i] = newDeck[numberRandom]
    newDeck[numberRandom] = temp
  }
  return newDeck
}

module.exports = {
  createDeck,
  shuffleDeck
}
