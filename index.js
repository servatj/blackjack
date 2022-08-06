const blackJack = () => {
  let dealerSum = 0;
  let yourSum = 0;
  let dealerAceCount = 0;
  let yourAceCount = 0;

  let hidden;
  let canHit = true;

  const compose =
    (...fns) =>
    (x) =>
      fns.reduceRight((y, f) => f(y), x);

  const getDealerSum = () => {
    return dealerSum;
  }

  const getYourSum = () => {
    return yourSum;
  }

  const getDealerAceCount = () => {
    return dealerAceCount;
  }

  const getYourAceCount = () => {
    return yourAceCount;
  }

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
    const deck = [];
    suits.forEach((suit) => {
      values.forEach((value) => {
        deck.push(`${value}${suit}`);
      });
    });
    return deck;
  };

  const shuffleDeck = (deck) => {
    for (let i = 0; i < deck.length; i++) {
      const numberRandom = Math.floor(Math.random() * deck.length);
      console.log(numberRandom)
      const temp = deck[i];
      deck[i] = deck[numberRandom];
      deck[numberRandom] = temp;
    }
    console.log(deck)
    return deck;
  };

  const dealHand = (deck, n) => {
    console.log(deck)
    return deck.splice(0, n);
  };

  const computeThePoints = (hand) => {
    const values = { A: 1, T: 10, J: 10, Q: 10, K: 10 };
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
    if(card[0] == "A") {
      return 1;
    }
    return 0;
  }



  const startGame = () => {
    const deck = compose(shuffleDeck, createDeck)([]);
    hidden = deck.pop();
    dealerSum += getValue(hidden);
    delaerCount += checkAce(hidden);

    while (dealerSum < 17) {
      let cardImg = document.createElement("img");
      let card = deck.pop();
      cardImg.src = "./cards/" + card.split('').join('-') + ".png";
      dealerSum += getValue(card);
      dealerAceCount += checkAce(card);
      document.getElementById("dealer-cards").append(cardImg);
    }

  }

  const game = () => {
    const deck = compose(shuffleDeck, createDeck)([]);
    const hand = dealHand(deck, 2);
    const hand2 = dealHand(deck, 2);
    const p1 = computeThePoints(hand);
    const p2 = computeThePoints(hand2);
    console.log(p1, p2);
    if (p1 === 21) {
      console.log("p1 black Jack");
    } else if (p2 == 21) {
      console.log("p2 black Jack");
    } else {
      if (p1 < 21 && p2 < 21) {
        if (p1 > p2) {
          console.log("p1 won");
        } else {
          console.log("p2 won");
        }
      }
    }
  };

  return {
    createDeck,
    shuffleDeck,
    dealHand,
    computeThePoints,
    game,
    getDealerAceCount,
    getYourAceCount,
    getYourSum,
    getDealerSum,
    startGame
  };
};

module.exports = blackJack;

// blackJack().game()

// blackJack().startGame()
