'use strict';

// Variables querySelector
const modal = document.querySelector('.modal');
// querySelector for only one button
// const btnShowModal = document.querySelector('.show-modal');
// querySelectorAll for all buttons
const btnShowModal = document.querySelectorAll('.show-modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
// console.log(modalButton.textContent);

// Loop the buttons
for (let button in btnShowModal) console.log(btnShowModal[button].textContent);
