'use strict';

////////////////////////////////////////
// Variables
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
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

/////////////////////////////////////////////////////////
/// SMOOTH SCROLL

// EVENT LISTENERS

// Button scrolling
btnScrollTo.addEventListener('click', event => {
  // MODERM WAY SMOOOOOOOTH
  section1.scrollIntoView({ behavior: 'smooth' });
});

//////////////////////////////////////////////////////////
/// PAGE NAVIGATION

// NOT EFFICIENT
// document.querySelectorAll('.nav__link').forEach(nav =>
//   nav.addEventListener('click', function (event) {
//     event.preventDefault();
//     // ABSOLUTE PATH
//     // const id = this.href;

//     // RELATIVE PATH
//     // One eventlistener foreach menu element is not efficient
//     const id = this.getAttribute('href'); // section--1, section--2, section--3
//     const section = document.querySelector(id); // Select the element with that id
//     section.scrollIntoView({ behavior: 'smooth' }); // Smooth scroll
//   })
// );

// EVENT DELEGATION
// 1. Add event listener to a common parent element
// 2. Determine what element originated the event
document
  .querySelector('.nav__links')
  .addEventListener('click', function (event) {
    // Prevent default behaviour (href anchor in html)
    event.preventDefault();

    // Matching strategy
    // If the element that generates the event have the class
    // that we are lookin for
    if (event.target.classList.contains('nav__link')) {
      // Select the id in href
      const id = event.target.getAttribute('href');

      // Get that element
      const section = document.querySelector(id);

      // Add scrollIntoView to the element that created the event
      section.scrollIntoView({ behavior: 'smooth' });
    }
  });

// EVENT PROPAGATION
// EVENTS
// Mouseenter
// const h1 = document.querySelector('h1');

// // Need a named function to remove an event listener
// // Remove event listener
// // Once the mouse enter the h1 the first time it will remove the eventListener
// // And it wont pop alert anymore
// const alertH1 = function (event) {
//   alert('addEventListener: Great! You are reading the heading :D');

//   // h1.removeEventListener('mouseenter', alertH1);
// };
// h1.addEventListener('mouseenter', alertH1);

// // Remove the event listener after 3 seconds
// setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);

// EVENTS BUBBLING AND CAPTURING

// const randomNumber = (max, min) => {
//   return Math.trunc(Math.random() * (min - max + 1) + max);
// };

// const randomColor = () =>
//   `rgb(${randomNumber(0, 255)}, ${randomNumber(0, 255)}, ${randomNumber(
//     0,
//     255
//   )})`;

// // When click in .nav__link, .nav__links and .nav also changes its color becaouse of
// // the event propagation ONLY TO PARENTS ELEMENTS
// // Only with parents not siblings
// // Clicking on LINK will propage to CONTAINER and NAVE as they are his parents
// // THEY RECIEVE THE EXACT SAME EVENT
// document
//   .querySelector('.nav__link')
//   .addEventListener('click', function (event) {
//     this.style.backgroundColor = randomColor();
//     console.log('LINK', event.target, event.currentTarget);

//     // STOP EVENT PROPAGATIN
//     // event.stopPropagation();
//   });

// document
//   .querySelector('.nav__links')
//   .addEventListener('click', function (event) {
//     this.style.backgroundColor = randomColor();
//     console.log('CONTAINER', event.target, event.currentTarget);
//   });

// document.querySelector('.nav').addEventListener('click', function (event) {
//   this.style.backgroundColor = randomColor();
//   console.log('NAV', event.target, event.currentTarget);
// });
// // Coordinates
// const s1coords = section1.getBoundingClientRect();
// // console.log(s1coords);

// // SMOOOOOOTH SCROOOOOOLL
// window.scrollTo({
//   left: s1coords.left + window.scrollX,
//   top: s1coords.top + window.scrollY,
//   behavior: 'smooth',
// });

// window.scrollTo(s1coords.x, s1coords.y);

// // Target is btnScrollTo
// console.log(event.target.getBoundingClientRect());

// console.log('Current scroll (X/Y)', window.scrollX, window.scrollY);

// // Dimensions of the viewport
// console.log(
//   'height/width viewport',
//   document.documentElement.clientHeight,
//   document.documentElement.clientWidth
// );

// Scrolling
// The position s1coords.top is relative to the viewport
// If we are at the top s1coords.top is the distance to s1coords and window.scrollY is 0
// If we scroll down s1coords.top change, are less, so we have to add to its coordinates the current scroll
// s1coords.top + window.scrollY
//   window.scrollTo(
//     s1coords.left + window.scrollX,
//     s1coords.top + window.scrollY
//   );

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

// const message = document.createElement('div');
// message.classList.add('cookie-message');
// // message.textContent = "We use cookies for improved functionality and analytics."
// message.innerHTML =
//   "We use cookies for improved functionality and analytics. <button class='btn btn--close-cookie'>Got it!</button>";
// // header.prepend(message); // First child
// // header.append(message); // Last child
// // header.append(message.cloneNode(true)); // To have the same DOM element cloned
// header.before(message); // Before header, sibling
// // header.after(message); // After header, sibling

// // Delete elements
// document.querySelector('.btn--close-cookie').addEventListener('click', () => {
//   message.remove();
//   // message.parentElement.removeChild(message);
// });

///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
/// STYLES, ATTRIBUTES AND CLASSES

// STYLES
// message.style.backgroundColor = '#37383d';
// message.style.width = '120%';

// // Only show styles set by ourselves
// console.log(message.style.height); //""
// console.log(message.style.width); //120%

// // To get every style
// console.log(getComputedStyle(message).color);
// console.log(getComputedStyle(message).height);

// // Change a style by taking the previus one
// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

// // :root{} propertys
// document.documentElement.style.setProperty('--color-primary', 'orangered');

// // ATTRIBUTES
// // Read
// const logo = document.querySelector('.nav__logo');
// console.log(logo.alt);
// console.log(logo.src); // Absolute path
// console.log(logo.className);

// // Set
// logo.alt = 'Beautiful minimalist logo';
// logo.setAttribute('compay', 'Bankist');
// logo.setAttribute('designer', 'Alberto');
// console.log(logo.getAttribute('designer'));
// console.log(logo.getAttribute('src')); // Relative path

// const link = document.querySelector('.nav__link--btn');
// console.log(link.href); // Absolute path
// console.log(link.getAttribute('href')); // Relative path

// // Non-standard
// console.log(logo.designer);

// // Data attribute
// logo.setAttribute('data-version-number', '3.0');
// console.log(logo.dataset.versionNumber);

// // Classes
// logo.classList.add('c', 'j');
// logo.classList.remove('c');
// logo.classList.toggle('c');
// logo.classList.contains('c'); // not includes

// // DONT USE OVERWRITE
// // logo.className = "alberto"
