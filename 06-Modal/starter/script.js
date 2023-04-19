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
const closeModal = () => {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// To show the modal
const showModal = () => {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

//
for (let i = 0; i < btnShowModal.length; i++)
  btnShowModal[i].addEventListener('click', () => showModal());

// X (Close modal button)
btnCloseModal.addEventListener('click', () => closeModal());

// Esc keypress listener
modal.addEventListener('keypress', event => {
  if (event.key === 'Escape') closeModal();
});
