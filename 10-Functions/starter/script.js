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
