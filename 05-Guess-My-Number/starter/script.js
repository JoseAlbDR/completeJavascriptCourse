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
// Functionallity of Check button click
document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  let score = document.querySelector('.score').textContent;
  console.log(random);
  document.querySelector('.guess').value = '';
  if (!guess) {
    document.querySelector('.message').textContent = 'No number!';
  } else if (guess === random) {
    document.querySelector('.message').textContent = 'It is the number!!!!';
    document.querySelector('.number').textContent = guess;
    document.querySelector('.highscore').textContent = score;
  } else {
    document.querySelector(
      '.message'
    ).textContent = `${guess} is not the number`;
    score--;
    document.querySelector('.score').textContent = score;
  }
});

// Event listener on enter keypress
// document.querySelector('.guess').addEventListener('keypress', function (event) {
//   if (event.key === 'Enter') {
//     const guess = document.querySelector('.guess').value;
//   }
// });
