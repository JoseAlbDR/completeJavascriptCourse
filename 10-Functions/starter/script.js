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
document.body.addEventListener('click', high5);

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
