'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

////////////////////////////////////////
// Variables
const header = document.querySelector('.header');

const openModal = function (event) {
  event.preventDefault();
  modal.classList.toggle('hidden');
  overlay.classList.toggle('hidden');
};

const closeModal = function () {
  modal.classList.toggle('hidden');
  overlay.classList.toggle('hidden');
};

btnsOpenModal.forEach(button => button.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
/// SELECTING CREATING AND DELETING ELEMENTS

// // Select all html, body or head
// console.log(document.documentElement); // HTML
// console.log(document.head);
// console.log(document.body);

// // Select an element by class
// const header = document.querySelector('.header');
// const allSections = document.querySelectorAll('.header');
// console.log(allSections);

// // Select an element by ....
// document.getElementById('section--1');
// const allButtons = document.getElementsByTagName('button');
// console.log(allButtons);
// console.log(document.getElementsByClassName('btn'));

// // Creating and inserting elements
// const html = `
//     <div class="movements__row">
//           <div class="movements__type movements__type--${movementType}">${
//   i + 1
// } ${movementType.toUpperCase}</div>
//           <div class="movements__value">${movement}</div>
//         </div>
//     `;
// containerMovements.insertAdjacentHTML('afterbegin', html);

const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent = "We use cookies for improved functionality and analytics."
message.innerHTML =
  "We use cookies for improved functionality and analytics. <button class='btn btn--close-cookie'>Got it!</button>";
// header.prepend(message); // First child
// header.append(message); // Last child
// header.append(message.cloneNode(true)); // To have the same DOM element cloned
header.before(message); // Before header, sibling
// header.after(message); // After header, sibling

// Delete elements
document.querySelector('.btn--close-cookie').addEventListener('click', () => {
  message.remove();
  // message.parentElement.removeChild(message);
});

///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
/// STYLES, ATTRIBUTES AND CLASSES

// STYLES
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

// Only show styles set by ourselves
console.log(message.style.height); //""
console.log(message.style.width); //120%

// To get every style
console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

// Change a style by taking the previus one
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

// :root{} propertys
document.documentElement.style.setProperty('--color-primary', 'orangered');

// ATTRIBUTES
// Read
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src); // Absolute path
console.log(logo.className);

// Set
logo.alt = 'Beautiful minimalist logo';
logo.setAttribute('compay', 'Bankist');
logo.setAttribute('designer', 'Alberto');
console.log(logo.getAttribute('designer'));
console.log(logo.getAttribute('src')); // Relative path

const link = document.querySelector('.nav__link--btn');
console.log(link.href); // Absolute path
console.log(link.getAttribute('href')); // Relative path

// Non-standard
console.log(logo.designer);

// Data attribute
logo.setAttribute('data-version-number', '3.0');
console.log(logo.dataset.versionNumber);

// Classes
logo.classList.add('c', 'j');
logo.classList.remove('c');
logo.classList.toggle('c');
logo.classList.contains('c'); // not includes

// DONT USE OVERWRITE
// logo.className = "alberto"
