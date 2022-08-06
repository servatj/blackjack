const compose = (...fns) => x => fns.reduceRight((y, f) => f(y), x)

const createDeck = () => {
  const suits = ['S', 'H', 'C', 'D']
  const values = ['A', '2', '3', '4','5','6','7','8','9', 'T', 'J', 'Q', 'K']
  const deck = []
  suits.forEach((suit) => {
    values.forEach((value) => {
      deck.push(`${value}${suit}`)
    })
  })
  return deck;
}

const shuffleDeck = (deck) => {
  for(let i = 0; i < deck.length; i++) {
    const numberRandom = Math.floor(Math.random() * i)
    const temp = deck[i]
    deck[i] = deck[numberRandom]
    deck[numberRandom] = temp
  }
  return deck
}

const dealHand = (deck, n) => {
  return deck.splice(0, n)
}

const computeThePoints = (hand) => {
  const values = { 'A': 1, 'T' : 10, 'J' : 10, 'Q' : 10, 'k' : 10 }
  let handContainAces = false
  console.log('hand', hand)
  const value = hand.map((card) =>  {
      if(card[0] === 'A') {
        handContainAces = true
      }
      return Number(values[card[0]]) || Number(card[0])
    }).reduce((a, b) => a + b)
  return handContainAces && value < 10 ? value + 10 : value;
}

const game = () => {
  const deck = compose(createDeck, shuffleDeck)([])
  const hand = dealHand(deck, 2)
  const hand2 = dealHand(deck, 2)
  const p1 = computeThePoints(hand)
  const p2 = computeThePoints(hand2)
  console.log(p1, p2)
  if(p1 === 21) {
    console.log('p1 black Jack')
  } else if (p2 == 21) {
    console.log('p2 black Jack')
  } else {
    if(p1 < 21 && p2 < 21) {
      if(p1 > p2) {
        console.log('p1 won')
      } else {
        console.log('p2 won')
      }
    }
  }
}

module.exports = {
  createDeck,
  shuffleDeck,
  dealHand,
  computeThePoints,
  game
}
