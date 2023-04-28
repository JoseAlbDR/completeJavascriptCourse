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
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const content = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');

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

// COOKIES STICKY BOTTOM
const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent = "We use cookies for improved functionality and analytics."
message.innerHTML =
  "We use cookies for improved functionality and analytics. <button class='btn btn--close-cookie'>Got it!</button>";
// header.prepend(message); // First child
// header.append(message); // Last child

// // header.append(message.cloneNode(true)); // To have the same DOM element cloned
// header.before(message); // Before header, sibling
document.body.append(message); // After header, sibling

// Delete elements
document.querySelector('.btn--close-cookie').addEventListener('click', () => {
  message.remove();
  // message.parentElement.removeChild(message);
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
    if (
      event.target.classList.contains('nav__link') &&
      !event.target.classList.contains('nav__link--btn')
    ) {
      // Select the id in href
      const id = event.target.getAttribute('href');

      // Get that element
      const section = document.querySelector(id);

      // Add scrollIntoView to the element that created the event
      section.scrollIntoView({ behavior: 'smooth' });
    }
  });

//////////////////////////////////////////////////////////
/// TABBED COMPONENT

tabsContainer.addEventListener('click', function (event) {
  event.preventDefault();
  // The closest father with operations__tabs (to get rid of SPAN clicks)
  const currentTab = event.target.closest('.operations__tab');

  // Select the content asocciated with the current tab
  // <button class="btn operations__tab operations__tab--2" data-tab="2"> currentTab.dataset.tab => 2
  // <div class="operations__content operations__content--2">
  const currentContent = document.querySelector(
    `.operations__content--${currentTab.dataset.tab}`
  );

  // Guard clause (to prevent the click in the father (operations__tab--container))
  if (!currentTab) return;

  // Active
  // Remove active from each tab
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));

  // Remove active from each content
  content.forEach(cont => cont.classList.remove('operations__content--active'));

  // Add active to currentTab and currentContent
  currentTab.classList.add('operations__tab--active');
  currentContent.classList.add('operations__content--active');
});

//////////////////////////////////////////////////////////
/// MENU FADE ANIMATION
const handleHover = function (event) {
  if (event.target.classList.contains('nav__link')) {
    const currentNavLink = event.target;
    // all children of .nav (closes father with that class) that have the class .nav__link
    const siblings = currentNavLink
      .closest('.nav')
      .querySelectorAll('.nav__link');
    const logo = currentNavLink.closest('.nav').querySelector('.nav__logo');

    // Foreach sibling that is not the currentNavLink
    siblings.forEach(sibling => {
      if (sibling !== currentNavLink) sibling.style.opacity = this;
      logo.style.opacity = this;
    });
  }
};

// hadleHover.bind(0.5) is like call handleHover(event, 0.5)
// It is like nav.addEventListener('mouseover', function());
// Passing "argument" into handler
// handleHover 0.5
const handleHoverHalf = handleHover.bind(0.5);

nav.addEventListener('mouseover', handleHoverHalf);
nav.addEventListener('mouseout', handleHover.bind(1));

//////////////////////////////////////////////////////////
/// INTERSECTION OBSERVER API

// STICKY NAV BAR
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function (entries) {
  const [entry] = entries;
  // const entrie = entries[0]
  !entry.isIntersecting
    ? nav.classList.add('sticky')
    : nav.classList.remove('sticky');
};

const headerObs = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 1,
});
headerObs.observe(header);

// REVEAL SECTION
// Select all sections
const allSections = document.querySelectorAll('.section');
const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  // Unobserve each entry
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

// One observer foreach section
allSections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// LAZY LOADING IMAGES
// All the images that have the property data-src
const imgTargets = document.querySelectorAll('.features__img');
// const imgTargets1 = document.querySelectorAll('img[data-src]');
const loadImg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('lazy-img');
  entry.target.src = entry.target.dataset.src;
  // const img = entry.target.getAttribute('data-src');
  // entry.target.setAttribute('src', img);
  // Removes the blur ONCE the img is loaded
  // entry.target.addEventListener('load', () =>
  //   entry.target.classList.remove('lazy-img')
  // );
  observer.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0.5,
});

imgTargets.forEach(img => imgObserver.observe(img));

//////////////////////////////////////////////////////////
/// SLIDER
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const slider = document.querySelector('.slider');
  const dotContainer = document.querySelector('.dots');

  const maxSlide = slides.length;
  let curSlide = 0;
  // slider.style.transform = 'scale(0.5) translateX(-500px)';
  slider.style.overflow = 'visible';

  const createDots = function () {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  // Show only the current slide
  const hideSlides = function () {
    slides.forEach(slide => {
      if (!slide.classList.contains(`slide--${curSlide + 1}`)) {
        console.log(slide);
        slide.style.opacity = 0;
      } else {
        slide.style.opacity = 100;
      }
    });
  };

  /**
   * Activate currentSlide dot
   * @param {*} slide current slide
   */
  const activateDot = function (slide) {
    // Select all dots
    const allDots = document.querySelectorAll('.dots__dot');
    // For each dot
    allDots.forEach(dot => {
      // Remove active
      dot.classList.remove('dots__dot--active');
      // Get current dot index as number
      const currentDot = Number(dot.getAttribute('data-slide'));
      // Activate the dot of current slide
      // Current slide as a Number because in click event we get a String
      if (currentDot === Number(slide)) {
        dot.classList.add('dots__dot--active');
      }
    });
  };

  // Go desired slide
  const goToSlide = function (slide) {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
    });
  };

  // Next slide
  const nextSlide = function () {
    curSlide === maxSlide - 1 ? (curSlide = 0) : curSlide++;
    // console.log('curSlide inside nextSlide:', curSlide);

    hideSlides();
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  // Prev slide
  const prevSlide = function () {
    curSlide === 0 ? (curSlide = maxSlide - 1) : curSlide--;
    // console.log('curSlide inside prevSlide:', curSlide);

    hideSlides();
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  // Initialize
  const init = function () {
    createDots();
    activateDot(curSlide);
    goToSlide(curSlide);
    hideSlides();
  };
  init();

  // Event handlers
  // Next arrow
  btnRight.addEventListener('click', nextSlide);
  // Previous arrow
  btnLeft.addEventListener('click', prevSlide);
  // Key arrow press
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') {
      nextSlide();
    } else if (e.key === 'ArrowLeft') {
      prevSlide();
    }
  });

  // Click on dot
  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      // Get the number of dot clicked
      // const slide = e.target.dataset.slide
      const { slide } = e.target.dataset;
      // Change the current slide to match the current dot
      curSlide = Number(slide);
      // Go the slide
      goToSlide(slide);
      // Activate the dot
      activateDot(slide);
    }
  });
};
slider();

// document.addEventListener('DOMContentLoaded', function (event) {
//   console.log('HTML parsed and DOM tree built!', event);
// });

// window.addEventListener('load', function (event) {
//   console.log(('Plage fully loaded', event));
// });

// window.addEventListener('beforeunload', function (event) {
//   event.preventDefault();
//   console.log('Page exited', event);
//   e.returnValue = '';
// });

// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     entry.isIntersecting
//       ? nav.classList.add('sticky')
//       : nav.classList.remove('sticky');
//   });
// };

// const obsOptions = {
//   root: document, // Target element for intersection, VIEWPORT if null
//   threshold: [0.2], // The % of witch isIntersection will become true
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);
// window.addEventListener('scroll', function () {
//   const s1coords = section1.getBoundingClientRect();
//   console.log(window.scrollY);
//   console.log(s1coords.top);

//   s1coords.top <= 0
//     ? nav.classList.add('sticky')
//     : nav.classList.remove('sticky');
// });
// document
//   .querySelector('.operations__tab-container')
//   .addEventListener('click', function (event) {
//     event.preventDefault();
//     const current = event.target;

//     [...current.parentElement.children].forEach(children => {
//       if (children !== event.target || children.tagName === 'SPAN') {
//         children.classList.remove('operations__tab--active');
//       } else {
//         children.classList.add('operations__tab--active');
//       }
//     });
//   });

//////////////////////////////////////////////////////////
/// DOM REVERSING
// const h1 = document.querySelector('h1');

// // Going downards: children
// // Select the childrens of h1 that meet class = "highlight"
// console.log(h1.querySelectorAll('.highlight'));
// // Every single node
// console.log(h1.childNodes);
// // Only children (span, br, span)
// console.log(h1.children);
// // Change color of first and last children (span)
// h1.firstElementChild.style.color = 'white';
// h1.lastElementChild.style.color = 'orangered';

// // Going upwards: parents
// // header__title is the direct pather
// console.log(h1.parentNode);
// console.log(h1.parentElement);
// // Closes father that meet the requeriment
// console.log(h1.closest('.header'));
// h1.closest('.header').style.background = 'var(--gradient-secondary)';

// // Going sideways: siblings
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);
// console.log(h1.previousSibling);
// console.log(h1.nextSibling);

// // Get ALL of the siblings, move to parent, and select children, includes itself
// console.log(h1.parentElement.children);

// // ALl the siblings except for h1
// [...h1.parentElement.children].forEach(function (el) {
//   if (el !== h1) el.style.transform = 'scale(0.5)';
// });

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
