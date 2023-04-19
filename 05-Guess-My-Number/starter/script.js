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

// Event listener (button)
const random = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let endGame = false;
// Functionallity of Check button click
document.querySelector('.check').addEventListener('click', function () {
  // If it is not the end of the game
  if (!endGame) {
    // Player guess a number
    const guess = Number(document.querySelector('.guess').value);
    // Get the current score
    score = document.querySelector('.score').textContent;
    console.log(random);
    // document.querySelector('.guess').value = '';

    // When there is no input
    if (!guess) {
      document.querySelector('.message').textContent = 'No number!';

      // When player wins
    } else if (guess === random) {
      document.querySelector('.message').textContent = 'Correct number!!!!';
      document.querySelector('.number').textContent = guess;
      if (Number(document.querySelector('.highscore').textContent) < score) {
        document.querySelector('.highscore').textContent = score;
      }
      document.querySelector('body').style.backgroundColor = '#60b347';
      document.querySelector('.number').style.width = '30rem';
      endGame = true;

      // When number is higher or lower
    } else {
      let higherLower = '';
      random > guess ? (higherLower = 'higher') : (higherLower = 'lower');
      // Show the message higher or lower
      document.querySelector(
        '.message'
      ).textContent = `The number is ${higherLower}.`;
      score--;
      // Update the score
      if (score > 0) {
        document.querySelector('.score').textContent = score;
        // When score === 0
      } else {
        endGame = true;
        document.querySelector('.score').textContent = score;
        document.querySelector('.message').textContent = 'You lost the game.';
        document.querySelector('body').style.backgroundColor = '#ffaeae';
        document.querySelector('.number').style.width = '30rem';
        document.querySelector('.number').textContent = random;
      }
    }
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
  document.querySelector('.message').textContent = 'Start guessing...';
  document.querySelector('.number').textContent = '?';
  document.querySelector('.score').textContent = 20;
  document.querySelector('.guess').value = '';
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
  endGame = false;
});

// Event listener on enter keypress
// document.querySelector('.guess').addEventListener('keypress', function (event) {
//   if (event.key === 'Enter') {
//     const guess = document.querySelector('.guess').value;
//   }
// });
