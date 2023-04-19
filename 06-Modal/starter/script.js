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

// // Loop the buttons
// for (let button in btnShowModal)
//   btnShowModal[button].addEventListener('click', () => {
//     console.log(`Button ${btnShowModal[button].textContent} clicked.`);
//   });

// To close the modal
/**
 * Closes the modal windows
 * by adding the .hidden class
 *
 */
const closeModal = () => {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
/**
 * Show the modal windows
 * by removing the .hidden class
 */
// To show the modal
const showModal = () => {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

// Add eventListener to buttons
for (let i = 0; i < btnShowModal.length; i++)
  btnShowModal[i].addEventListener('click', showModal);

// X (Close modal button) listener
btnCloseModal.addEventListener('click', closeModal);

// Click outside modal close listener
overlay.addEventListener('click', closeModal);

// Esc keypress listener
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeModal();
});
