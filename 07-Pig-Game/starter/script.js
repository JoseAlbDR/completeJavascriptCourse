'use strict';
// Active player by default player 1
let activePlayer = document.querySelector('.player--0');
let playerCurrent = document.getElementById('current--0');
let playerScore = document.getElementById('score--0');

// Dice vars
const diceImg = document.querySelector('.dice');

// Buttons vars
const diceRollBtn = document.querySelector('.btn--roll');
const holdScoreBtn = document.querySelector('.btn--hold');
const newGameBtn = document.querySelector('.btn--new');

// Default player
let currentPlayer = 0;

// Default score
let turnScore = 0;
let acumPlayer0Score = 0;
let acumPlayer1Score = 0;

// gameOver checker99uuu
let gameOver = false;
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
  // Show current score
  showCurrentScore();
  // Chek if there is a 1
  checkOne(randomNumber);
};

/**
 * Show the acumulated score of the currentPlayer
 */
const showCurrentScore = () => {
  playerCurrent.textContent = turnScore;
};

/**
 * Chek if the dice is 1, in that case
 * reset the activePlayer acumulated score to 0
 * and switch players
 * @param {*} randomNumber dice number
 */
const checkOne = randomNumber => {
  if (randomNumber === 1) switchPlayer();
};

/**
 * Hold the current and switch players
 * If there is a winner stop buttons listener and show
 * Else switch players
 */
const holdScore = () => {
  saveScore();
  playerScore.textContent < 100 ? switchPlayer() : showWinner();
};

/**
 * Change ccs styles to show the winner
 */
const showWinner = () => {
  activePlayer.classList.add('player--winner');
  gameOver = true;
};

/**
 * Switch the current player to the next player
 * apliying css styles and setting current to 0
 */
const switchPlayer = () => {
  activePlayer.classList.remove('player--active');
  playerCurrent.textContent = 0;
  nextPlayer();
  activePlayer.classList.add('player--active');
  playerCurrent.textContent = 0;
  turnScore = 0;
};

/**
 * Change the actual player to the next player
 */
const nextPlayer = () => {
  // Check whoever the currentPlayer is
  currentPlayer === 0 ? (currentPlayer = 1) : (currentPlayer = 0);
  // Save in vars
  playerCurrent = document.getElementById(`current--${currentPlayer}`);
  playerScore = document.getElementById(`score--${currentPlayer}`);
  activePlayer = document.querySelector(`.player--${currentPlayer}`);
};

/**
 * Save the current score of the active player
 */
const saveScore = () => {
  // Check the current player add the current score to his score
  if (currentPlayer === 0) {
    acumPlayer0Score += turnScore;
    playerScore.textContent = acumPlayer0Score;
  } else {
    acumPlayer1Score += turnScore;
    playerScore.textContent = acumPlayer1Score;
  }
  playerCurrent.textContent = 0;
};

/**
 * Reset the score of the current player to 0
 */
const resetScore = () => {
  playerScore.textContent = 0;
};

/**
 * Generates a new game by reseting everything to 0 and switching players
 */
const newGame = () => {
  acumPlayer0Score = 0;
  acumPlayer1Score = 0;
  resetScore();
  activePlayer.classList.remove('player--winner');
  switchPlayer();
  resetScore();
  gameOver = false;
};

// Listeners
if (!gameOver) {
  diceRollBtn.addEventListener('click', rollDice);
  holdScoreBtn.addEventListener('click', holdScore);
}
newGameBtn.addEventListener('click', newGame);
