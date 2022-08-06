let dealerSum = 0;
let yourSum = 0;
let dealerAceCount = 0;
let yourAceCount = 0;
let hidden;
let canHit = true;
let deck = [];

window.onload = function() {
  console.log('load')
  createDeck();
  deck = shuffleDeck(deck);
  startGame()
}

const compose =
  (...fns) =>
  (x) =>
    fns.reduceRight((y, f) => f(y), x);

const createDeck = () => {
  const suits = ["S", "H", "C", "D"];
  const values = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "T",
    "J",
    "Q",
    "K",
  ];
  suits.forEach((suit) => {
    values.forEach((value) => {
      deck.push(`${value}${suit}`);
    });
  });
};

const shuffleDeck = () => {
  for (let i = 0; i < deck.length; i++) {
    const numberRandom = Math.floor(Math.random() * deck.length);
    const temp = deck[i];
    deck[i] = deck[numberRandom];
    deck[numberRandom] = temp;
  }
  return deck;
};

const dealHand = (n) => {
  return deck.splice(0, n);
};

const computeThePoints = (hand) => {
  const values = { A: 11, T: 10, J: 10, Q: 10, K: 10 };
  let handContainAces = false;
  const value = hand
    .map((card) => {
      if (card[0] === "A") {
        handContainAces = true;
      }
      return Number(values[card[0]]) || Number(card[0]);
    })
    .reduce((a, b) => a + b);
  return handContainAces && value < 10 ? value + 10 : value;
};

const getValue = (card) => {
  let value = card[0];

  if(isNaN(value)) {
    if(value == "A") {
      return 11
    }
    return 10;
  }
  return parseInt(value);
}

const checkAce = (card) => {
  return card[0] === 'A' ? 1 : 0
}

const playTurnDealer = () => {
  let cardImg = document.createElement("img");
  let card = deck.pop();
  cardImg.src = "./cards/" + card.split('').join('-') + ".png";
  dealerSum += getValue(card);
  dealerAceCount += checkAce(card);
  document.getElementById("dealer-cards").append(cardImg);
}

const playTurnPlayer = () => {
  let cardImg = document.createElement("img");
  let card = deck.pop();
  cardImg.src = "./cards/" + card.split('').join('-') + ".png";
  yourSum += getValue(card);
  yourAceCount += checkAce(card);
  document.getElementById("your-cards").append(cardImg);
}

const reduceAce = (playerSum, playerAceCount) => {
  if(playerSum > 21  && playerAceCount > 0) {
    playerSum -= 10;
    playerAceCount -= 1;
  }
  return playerSum;
}

const hit = () => {
  if(!canHit) {
    return;
  } else {
    playTurnPlayer();
  }

  if(reduceAce(yourSum, yourAceCount) >= 21) {
    canHit = false
  }
}

const stand = () => {
    dealerSum = reduceAce(dealerSum, dealerAceCount)
    yourSum = reduceAce(yourSum, yourAceCount)

    canHit = false
    document.getElementById('hidden').src = "./cards/" + hidden.split('').join('-') + '.png'

    let message = ''
    if (yourSum > 21) {
      message = "You Lose!"
    } else if (dealerSum > 21) {
      message = "You win!"
    } else if (dealerSum === yourSum) {
      message = "Tie!"
    } else if (dealerSum < yourSum) {
      message = "You win!"
    } else if (dealerSum > yourSum) {
      message = "You lose"
    }

    document.getElementById('dealer-sum').innerText = dealerSum;
    document.getElementById('your-sum').innerText = yourSum;
    document.getElementById('results').innerText = message;
}

const startGame = () => {
  const deck = compose(shuffleDeck, createDeck)([]);
  hidden = deck.pop();
  dealerSum += getValue(hidden);
  dealerAceCount += checkAce(hidden);

  while (dealerSum < 17) {
    playTurnDealer();
  }

  for (let i = 0; i < 2; i++) {
    playTurnPlayer();
  }

  document.getElementById('hit').addEventListener('click', hit);
  document.getElementById('stand').addEventListener('click', stand);
}
