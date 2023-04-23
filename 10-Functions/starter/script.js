'use strict';

// Default parameters
const bookings = [];
const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  // ES5
  //   numPassengers = numPassengers || 1;
  //   price = price || 199;
  const booking = {
    flightNum,
    // numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};
createBooking('LH123');
createBooking('LH123', 2, 800);
createBooking('LH123', 5);
createBooking('LH123', 2);
createBooking('LH123', undefined, 500);

// Calling functions
const flight = 'LH234';
const alberto = {
  name: 'Alberto Delgado',
  passport: 123456789,
};

// passenger === alberto
const checkIn = function (flightNum, passenger) {
  // Not a good practice
  (flightNum = 'LH999'), (passenger.name = 'Mr.' + passenger.name);

  if (passenger.passport === 123456789) {
    alert('Check in.');
  } else {
    alert('Wrong passport!');
  }
};

// checkIn(flight, alberto);
console.log(flight);
console.log(alberto);

// Example
const newPassword = function (person) {
  person.passport = Math.trunc(Math.random() * 100000000);
};

newPassword(alberto);
// checkIn(flight, alberto);

// Higher Order funcionts
const oneWord = function (str) {
  return str.replaceAll(' ', '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

const transformer = function (str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);
  console.log(`Transformed by: ${fn.name}`);
};

transformer('JavaScript is the best!', upperFirstWord);
transformer('JavaScript is the best!', oneWord);

// JS uses callbacks all the time
const high5 = function () {
  console.log('Hey');
};
// document.body.addEventListener('click', high5);

['Alberto', 'Jonas', 'Marta'].forEach(high5);
//

// Function returning functions
// const greet = greeting => {
//   return function (name) {
//     console.log(`${greeting} ${name}`);
//   };
// };

const greet = greeting => name => console.log(`${greeting} ${name}`);
const greeterHey = greet('Hey');
greeterHey('Alberto');
greeterHey('Jonas');

greet('Hello')('ALberto');

// THIS keyword call apply
const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  book(fligthNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${fligthNum}.`
    );
    this.bookings.push({ flight: `${this.iataCode}${fligthNum}`, name });
  },
};

lufthansa.book(239, 'Alberto Delgado');
lufthansa.book(635, 'Mike Smith');
console.log(lufthansa);

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
  book: lufthansa.book,
};

const book = lufthansa.book;

// book(23, 'Sarah Williams'); // Undefined because of this

book.call(eurowings, 23, 'Sarah Williams');
book.call(lufthansa, 23, 'Sarah Williams');
eurowings.book(239, 'Alberto Delgado');
console.log(eurowings);
console.log(lufthansa);

const swiss = {
  airline: 'Swiss Air Lines',
  iataCode: 'EW',
  bookings: [],
};

book.call(swiss, 77, 'Leo Delgado');
console.log(swiss);

// APPLY not used
const flightData = [583, 'George Cooper'];
book.apply(swiss, flightData);
console.log(swiss);
book.call(swiss, ...flightData);

// BIND
// Bind the this keyword
const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);

bookEW(239, 'Steven Williams');
const bookEW23 = book.bind(eurowings, 23);
bookEW23('Pepe');

// With Event Listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);
  this.planes++;
  console.log(this.planes);
};
// If you dont use a bind the this keyword wont point to lufthansa
const fn = lufthansa.buyPlane.bind(lufthansa);
document.querySelector('.buy').addEventListener('click', fn);

// Partial application
const addTax = (rate, value) => value + value * rate;
const addTax21 = addTax.bind(null, 0.21);
console.log(addTax21(100));

const addTaxb = rate => value => value + value * rate;
const addTax23 = addTaxb(0.23);
console.log(addTax23(100));
