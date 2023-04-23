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

// IIFE
const runOnce = function () {
  console.log('This will never run again.');
};
runOnce();

// Inmediatly invoke function expression
(function () {
  console.log('This will never run again.');
  const isPrivate = 23;
});

// console.log(isPrivate); // Error becaouse of scope
() => console.log('This will ALSO never run again.');
{
  const isPrivate = 23;
  var notPrivate = 46;
}

// console.log(isPrivate); // Error becaouse of scope
console.log(notPrivate);

// CLOSURES
const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

const booker = secureBooking();
booker();
booker();
booker();

// A closure is the closed-over variable environment of the execution context in which a function was created, even after that execution context is gone
// A closure gives a function access to all the variables of its parent function, even aflter that parent function has returned. The function keeps a reference to its outer scope, which preserves the scope chain throughout time.
// A closure makes sure that a function doesnt loose connection to variables that existed at the functions birth place
// A closure is like a backpack that a function carries around wherever it goes. This backpack has all the variables that were present in the environment where the function was created

console.dir(booker);

// Example MEMOIZING (with cached results)
function memoized(func) {
  // cache objet will store results with key: valor pair
  const cache = {};

  return function (...args) {
    // Create an UNIQUE key using JSON.stringify, u can use another formula to make the key
    // Like concatenating strings or some calculation
    const key = JSON.stringify(args);
    // If we ALREADY have that key stored
    if (cache[key]) {
      // We dont have to call again the function to calculate te result, we just print it
      console.log('Returning a cached result');
      return cache[key];
      // If we DONT have that key stored
    } else {
      // Calculate the result by calling the function passed to memoized with the args
      // Within the example func = fibonnaci and args = n = 10
      const result = func(...args);
      // Store the result in the cache with his key
      cache[key] = result;
      // Print the result
      console.log('Computing result');
      return result;
    }
  };
}

// This is an example the function, could be any function, usually an expensive one
function fibonnaci(n) {
  if (n < 2) {
    return n;
  } else {
    return fibonnaci(n - 1) + fibonnaci(n - 2);
  }
}

// Just another simple example with variable number of arguments
function add(...numbers) {
  let result = 0;
  numbers.forEach(number => (result += number));
  return result;
}

// Create a function memoizedFb calling memoized with fibonnaci
// In the memoized function func = fibonnaci
const memoizedFb = memoized(fibonnaci);

// Log in console so in this calls args = 10
// The first time the function calculates the result of fibonnaci(10) and stores it in cache
console.log(memoizedFb(10)); // Computing result 55
// The second a next times we call the function it will return the cached result
console.log(memoizedFb(10)); // Returning a cached result 55

// We can use it with function with any length of arguments
const memoizedAdd = memoized(add);
console.log(memoizedAdd(5, 2, 3, 4)); // Computing result 14
console.log(memoizedAdd(5, 2, 3, 4)); // Returning a cached result 14
console.log(memoizedAdd(5, 2, 13, -1, 8, 10, 22, 14)); // Computing result 73
console.log(memoizedAdd(5, 2, 13, -1, 8, 10, 22, 14)); // Returning a cached result 73

// More examples
// Example 1
let f;

const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};

g();
f();
console.dir(f);

// Re-assigning f function
h();
f();
console.dir(f);

// Example 2
const boardPassegers = function (n, wait) {
  const perGroup = n / 3;
  setTimeout(function () {
    console.log(`We are now boarding all ${n} passengers.`);
    console.log(`There are 3 groups, each with ${perGroup} passenger`);
  }, wait * 1000);
  console.log(`Will start boarding in ${wait} seconds.`);
};

const perGroup = 1000000;
boardPassegers(180, 3);
//
