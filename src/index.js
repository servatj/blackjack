import {  startGame  } from "./lib/blackjack.js";

const bootstrap = () => {
  console.log("Bootstrap");
  startGame();
}

window.onload = function () {
  bootstrap();
};
