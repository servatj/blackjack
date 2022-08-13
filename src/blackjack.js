
let  dealerSum = 0;
let  yourSum = 0;
let  dealerAceCount = 0;
let  yourAceCount = 0;
let  hidden;
let  canHit = true;
let  canStand = true;

export const shuffleDeck = (deck) => {
  for (let i = 0; i < deck.length; i++) {
    const numberRandom = Math.floor(Math.random() * deck.length);
    const temp = deck[i];
    deck[i] = deck[numberRandom];
    deck[numberRandom] = temp;
  }
  return deck;
};

export const createDeck = (deck) => {
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
  return deck;
};

const playTurnDealer = (deck) => {
  let cardImg = document.createElement("img");
  let card = deck.pop();
  cardImg.src = "./assets/" + card.split("").join("-") + ".png";
  dealerSum += getValue(card);
  dealerAceCount += checkAce(card);
  document.getElementById("dealer-cards").append(cardImg);
};

const playTurnPlayer = (deck) => {
  let cardImg = document.createElement("img");
  let card = deck.pop();
  cardImg.src = "./assets/" + card.split("").join("-") + ".png";
  document.getElementById("your-cards").append(cardImg);
  yourSum += getValue(card);
  yourAceCount += checkAce(card);
  document.getElementById("your-sum").innerText = yourSum;
  if(yourSum > 21) {
    const message = 'You Lose';
    canHit = false;
    document.getElementById("results").innerText = message;
    document.getElementById("stand").setAttribute('disabled', '')
  }
};

const getValue = (card) => {
  let value = card[0];

  if (isNaN(value)) {
    if (value == "A") {
      return 11;
    }
    return 10;
  }
  return parseInt(value);
};

const checkAce = (card) => {
  return card[0] === "A" ? 1 : 0;
};

const reduceAce = (playerSum, playerAceCount) => {
  if (playerSum > 21 && playerAceCount > 0) {
    playerSum -= 10;
    playerAceCount -= 1;
  }
  return playerSum;
};

const pipe =
  (...fns) =>
  (x) =>
    fns.reduce((y, f) => f(y), x);

const hit = (canHit, deck) => {
  if (!canHit) {
    return;
  } else {
    playTurnPlayer(deck);
  }

  if (reduceAce(yourSum, yourAceCount) >= 21) {
    canHit = false;
  }
};

const stand = () => {
  dealerSum = reduceAce(dealerSum, dealerAceCount);
  yourSum = reduceAce(yourSum, yourAceCount);

  canHit = false;
  document.getElementById("hidden").src =
    "./assets/" + hidden.split("").join("-") + ".png";

  let message = "";
  if (yourSum > 21) {
    message = "You Lose!";
  } else if (dealerSum > 21) {
    message = "You win!";
  } else if (dealerSum === yourSum) {
    message = "Tie!";
  } else if (dealerSum < yourSum) {
    message = "You win!";
  } else if (dealerSum > yourSum) {
    message = "You lose";
  }

  document.getElementById("dealer-sum").innerText = dealerSum;
  document.getElementById("your-sum").innerText = yourSum;
  document.getElementById("results").innerText = message;
};

export const startGame = () => {
  const deck = pipe(createDeck, shuffleDeck)([]);
  hidden = deck.pop();
  dealerSum += getValue(hidden);
  dealerAceCount += checkAce(hidden);

  while (dealerSum < 17) {
    playTurnDealer(deck);
  }

  for (let i = 0; i < 2; i++) {
    playTurnPlayer(deck);
  }

  document.getElementById("hit").addEventListener("click", () => hit(canHit, deck));
  document.getElementById("stand").addEventListener("click", () => stand(yourSum, dealerAceCount, yourAceCount));
  document.getElementById("game").addEventListener("click", () => location.reload());
};
