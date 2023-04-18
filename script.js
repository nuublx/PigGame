'use strict';

const rollDice = document.querySelector('.btn--roll');
const newGame = document.querySelector('.btn--new');
const holdScore = document.querySelector('.btn--hold');
const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');
const player1WholeScore = document.querySelector('#score--0');
const player2WholeScore = document.querySelector('#score--1');

const player1CurrentScore = document.querySelector('#current--0');
const player2CurrentScore = document.querySelector('#current--1');

const dice = document.querySelector('.dice');

const modalWon = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const closeModalBtn = document.querySelector('.close-modal');

let player = 1;
const closeModal = function () {
  modalWon.classList.add('hidden');
  overlay.classList.add('hidden');
};

closeModalBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

const switchPlayer = function () {
  if (player == 1) {
    player = 2;
    player1.classList.remove('player--active');
    player2.classList.add('player--active');
  } else {
    player = 1;
    player2.classList.remove('player--active');
    player1.classList.add('player--active');
  }
};
const clearCurrent = function () {
  if (player === 1) player1CurrentScore.textContent = '0';
  else player2CurrentScore.textContent = '0';
  switchPlayer();
};

const checkWinner = function () {
  debugger;
  if (Number(player1WholeScore.textContent) >= 100) {
    document.querySelector('#playerWon').textContent = 'PLAYER 1';
  } else if (Number(player2WholeScore.textContent) >= 100) {
    document.querySelector('#playerWon').textContent = 'PLAYER 2';
  } else {
    return;
  }
  modalWon.classList.remove('hidden');
  overlay.classList.remove('hidden');
  newGame.click();
};
const addCurrentScore = function (randomDice) {
  if (randomDice == 1) {
    clearCurrent();
    return;
  }

  let currentScore = 0;
  if (player === 1) {
    currentScore = Number(player1CurrentScore.textContent);
    currentScore += randomDice;
    player1CurrentScore.textContent = String(currentScore);
  } else {
    currentScore = Number(player2CurrentScore.textContent);
    currentScore += randomDice;
    player2CurrentScore.textContent = String(currentScore);
  }
};
// New Game
newGame.addEventListener('click', function () {
  // RESET PLAYERS SCORE
  player1CurrentScore.textContent = '0';
  player2CurrentScore.textContent = '0';

  player1WholeScore.textContent = '0';
  player2WholeScore.textContent = '0';

  dice.src = 'dice-1.png';
  // make it player 2 turn so switchPlayer resets to player 1 turn
  player = 2;
  switchPlayer();
});

// Roll Dice
rollDice.addEventListener('click', function () {
  debugger;
  let randomDice = Math.trunc(Math.random() * 6) + 1;
  dice.src = `dice-${randomDice}.png`;

  addCurrentScore(randomDice);
});

holdScore.addEventListener('click', function () {
  let currentScore = 0;
  if (player == 1) {
    currentScore = Number(player1CurrentScore.textContent);
    currentScore += Number(player1WholeScore.textContent);
    player1WholeScore.textContent = String(currentScore);
  } else {
    currentScore = Number(player2CurrentScore.textContent);
    currentScore += Number(player2WholeScore.textContent);
    player2WholeScore.textContent = String(currentScore);
  }
  clearCurrent();
  checkWinner();
});
