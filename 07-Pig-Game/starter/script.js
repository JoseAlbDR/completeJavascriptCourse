'use strict';

// Const
const WINSCORE = 100;

// Active player by default player 1
let activePlayer = document.querySelector('.player--0');
let playerCurrent = document.getElementById('current--0');
let playerScore = document.getElementById('score--0');

// Dice vars
const diceImg = document.querySelector('.dice');
// Hide the dice image
diceImg.classList.add('hidden');

// Buttons vars
const diceRollBtn = document.querySelector('.btn--roll');
const holdScoreBtn = document.querySelector('.btn--hold');
const newGameBtn = document.querySelector('.btn--new');

// Default player
let currentPlayer = 0;

// Default scores
let turnScore = 0;
const acumScores = [99, 0];

// gameOver checker
let gameOver = false;

/**
 * Generates a random number between 1 and 6
 * and changes the dice Image
 */
const rollDice = () => {
  // Only rool the dice if is not game over
  if (gameOver === false) {
    // Random number to show dice
    const diceNumber = Math.trunc(Math.random() * 6) + 1;
    const diceImgString = `dice-${diceNumber}.png`;
    // Show the dice image
    diceImg.classList.remove('hidden');
    // Adds the dice valor to the score in this turn
    turnScore += diceNumber;
    // Change the dice image
    diceImg.src = diceImgString;
    // Chek if there is a 1
    checkOne(diceNumber);
    // Show current score
    showCurrentScore();
  }
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
 * @param {*} diceNumber dice number
 */
const checkOne = diceNumber => {
  if (diceNumber === 1) switchPlayer();
};

/**
 * Hold the current and switch players
 * If there is a winner stop buttons listener and show
 * Else switch players
 */
const holdScore = () => {
  if (!gameOver) {
    saveScore();
    playerScore.textContent < WINSCORE ? switchPlayer() : showWinner();
  }
};

/**
 * Change ccs styles to show the winner
 */
const showWinner = () => {
  activePlayer.classList.add('player--winner');
  diceImg.classList.toggle('hidden');
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
  acumScores[currentPlayer] += turnScore;
  playerScore.textContent = acumScores[currentPlayer];
  playerCurrent.textContent = 0;
};

/**
 * Reset the score of the current player to 0
 */
const resetScore = () => {
  playerScore.textContent = 0;
};

/**
 * Generates a new game by reseting everything to 0
 * switching players and hiding dice image
 */
const newGame = () => {
  [acumScores[0], acumScores[1]] = [0, 0];
  diceImg.classList.toggle('hidden');
  resetScore();
  activePlayer.classList.remove('player--winner');
  switchPlayer();
  resetScore();
  gameOver = false;
};

// Listeners
diceRollBtn.addEventListener('click', rollDice);
holdScoreBtn.addEventListener('click', holdScore);
newGameBtn.addEventListener('click', newGame);
