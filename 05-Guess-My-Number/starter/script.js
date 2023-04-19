'use strict';

// DOM manipulation
// Text
// console.log(document.querySelector('.message').textContent);
// document.querySelector('.message').textContent = 'Correct Number';
// console.log(document.querySelector('.message').textContent);
// document.querySelector('.number').textContent = 13;
// document.querySelector('.score').textContent = 10;

// // Input
// document.querySelector('.guess').value = 20;

// Game Logic
const gameLogic = () => {
  // If it is not the end of the game
  if (!endGame) {
    // Player guess a number
    const guess = Number(document.querySelector('.guess').value);
    // When there is no input
    if (!guess) {
      displayMessage('No number!');

      // When player wins
    } else if (guess === random) {
      displayMessage('Correct number!!!!');
      displayNumber(guess);
      // Update highscore
      highScore = highScore < score ? score : highScore;
      document.querySelector('.highscore').textContent = highScore;

      // Change background color and width
      bodyBackgroud('#60b347');
      numberWidth('30rem');
      endGame = true;

      // When guess is wrong
    } else {
      let higherLower = '';
      score--;
      displayScore(score);
      random > guess ? (higherLower = 'higher') : (higherLower = 'lower');
      // Show the message higher or lower
      displayMessage(`The number is ${higherLower}.`);
      // Update the score
      if (score > 0) {
        // When score === 0
      } else {
        endGame = true;
        displayScore(score);
        displayMessage('You lost the game.');
        bodyBackgroud('#ffaeae');
        numberWidth('30rem');
        displayNumber(random);
      }
    }
  }
};

// Queryselectors Functions
const displayMessage = message => {
  document.querySelector('.message').textContent = message;
};

const displayNumber = number => {
  document.querySelector('.number').textContent = number;
};

const displayScore = score => {
  document.querySelector('.score').textContent = score;
};

const displayGuess = guess => {
  document.querySelector('.guess').value = guess;
};

const bodyBackgroud = color => {
  document.querySelector('body').style.backgroundColor = color;
};

const numberWidth = width => {
  document.querySelector('.number').style.width = width;
};

const randomNumber = () => {
  return Math.trunc(Math.random() * 20) + 1;
};
// Event listener (button)
let random = randomNumber();
let score = 20;
let highScore = 0;
let endGame = false;
// Functionallity of Check button click
document.querySelector('.check').addEventListener('click', gameLogic);

// Enter keypress on input
document.querySelector('.guess').addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    gameLogic();
  }
});

// Coding Challenge #1
// Implement a game rest functionality, so that the player can make a new guess!
// Your tasks:
// 1. Select the element with the 'again' class and attach a click event handler
// 2. In the handler function, restore initial values of the 'score' and
// 'secretNumber' variables
// 3. Restore the initial conditions of the message, number, score and guess input
// fields
// 4. Also restore the original background color (#222) and number width (15rem)
// Again button, reset all to default

document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  displayMessage('Start guessing...');
  displayNumber('?');
  displayScore(score);
  displayGuess('');
  bodyBackgroud('#222');
  numberWidth('15rem');
  random = randomNumber();
  endGame = false;
});

// Event listener on enter keypress
// document.querySelector('.guess').addEventListener('keypress', function (event) {
//   if (event.key === 'Enter') {
//     const guess = document.querySelector('.guess').value;
//   }
// });
