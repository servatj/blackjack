import {  startGame  } from "./lib/blackjack.js";

const state = {
  dealerSum: 0,
  yourSum: 0,
  dealerAceCount: 0,
  yourAceCount: 0,
  hidden: '',
  canHit: true,
  deck: [],
}

const bootstrap = () => {
  console.log("Bootstrap");
  startGame(state);
}

window.onload = function () {
  bootstrap();
};
