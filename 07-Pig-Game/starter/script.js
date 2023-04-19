'use strict';
// Active player
let activePlayer = document.querySelector('.player--0');

// Default player vars
let playerCurrent = document.getElementById('current--0');
let playerScore = document.getElementById('score--0');

// Dice vars
const diceImg = document.querySelector('.dice');

// Buttons vars
const diceRollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const newGameBtn = document.querySelector('.btn--new');

// Default player
let currentPlayer = 0;

// Default score
let turnScore = 0;
let acumPlayer0Score = 0;
let acumPlayer1Score = 0;

/**
 * Generates a random number between 1 and 6
 * and changes the dice Image
 */
const rollDice = () => {
  // Random number to show dice
  const randomNumber = Math.trunc(Math.random() * 6) + 1;
  const diceNumber = `dice-${randomNumber}.png`;

  // Adds the dice valor to the score in this turn
  turnScore += randomNumber;

  // Change the dice image
  diceImg.src = diceNumber;
  showScore();

  if (randomNumber === 1) {
    currentPlayer === 0 ? (acumPlayer0Score = 0) : (acumPlayer1Score = 0);
    resetScore();
    switchPlayer();
  }
};

const hold = () => {
  saveScore();
  switchPlayer();
  turnScore = 0;
};

const saveScore = () => {
  if (currentPlayer === 0) {
    acumPlayer0Score += turnScore;
    console.log(playerScore.textContent);
    playerScore.textContent = acumPlayer0Score;
    console.log(playerScore.textContent);
  } else {
    acumPlayer1Score += turnScore;
    playerScore.textContent = acumPlayer1Score;
  }
  playerCurrent.textContent = 0;
};
/**
 * Show the score in the current turn
 * @param {*} turnScore acumulated score during the turn
 * @param {*} currentPlayer player who is playing
 */
const showScore = () => {
  playerCurrent.textContent = turnScore;
};

const switchPlayer = () => {
  activePlayer.classList.remove('player--active');
  playerCurrent.textContent = 0;
  nextPlayer();
  activePlayer.classList.add('player--active');
  playerCurrent.textContent = 0;
  turnScore = 0;
};

const nextPlayer = () => {
  currentPlayer === 0 ? (currentPlayer = 1) : (currentPlayer = 0);
  playerCurrent = document.getElementById(`current--${currentPlayer}`);
  playerScore = document.getElementById(`score--${currentPlayer}`);
  activePlayer = document.querySelector(`.player--${currentPlayer}`);
};

const resetScore = () => {
  playerScore.textContent = 0;
};

const newGame = () => {
  currentPlayer = 0;
  turnScore = 0;
  acumPlayer0Score = 0;
  acumPlayer1Score = 0;
  playerCurrent.textContent = 0;
  playerScore.textContent = 0;
  nextPlayer();
  playerCurrent.textContent = 0;
  playerScore.textContent = 0;
};

// Listeners
diceRollBtn.addEventListener('click', rollDice);
holdBtn.addEventListener('click', hold);
newGameBtn.addEventListener('click', newGame);
