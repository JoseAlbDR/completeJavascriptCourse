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

/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/// SMOOTH SCROLL

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

// EVENT LISTENERS

btnScrollTo.addEventListener('click', event => {
  // MODERM WAY SMOOOOOOOTH
  section1.scrollIntoView({ behavior: 'smooth' });

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
