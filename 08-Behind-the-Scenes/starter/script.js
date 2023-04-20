'use strict';

// SCOPES, BLOCK - GLOBAL - LOCAL
function calcAge(birthYear) {
  // Local scope
  const age = 2023 - birthYear;
  // console.log(firstName);

  function printAge() {
    // Chain scope
    let output = `${firstName}, You are ${age}, born in ${birthYear}`;
    console.log(output);

    if (birthYear >= 1981 && birthYear <= 1996) {
      // Var is not block scoped
      var millenial = true;
      // Black scope, scope chain is not neccesary
      // Creating NEW variable with same name as outer scopes variable
      const firstName = 'Steven';
      // Block scope
      var str = `Oh, and you are a millenial, ${firstName}`;
      console.log(str);

      function add(a, b) {
        return a + b;
      }
      // Redefined variable that we have access to
      output = 'NEW OUTPUT';
      // New variable with the same name
      // const output = 'NEW OUTPUT';
    }
    // Error str is block scope
    // console.log(str);
    // You can reasign becaouse millenial is a var declaration
    // millenial = false;
    console.log(millenial);
    // Not defined, inside if block scope
    // add(2, 3);
    console.log(output);
  }
  printAge();
  return age;
}

// Global scope
const firstName = 'Alberto';

calcAge(1984);
// console.log(age);
// printAge();

// Hoisting and TDZ
// Variables
console.log(me);
// console.log(job);
// console.log(year);

var me = 'Alberto';
let job = 'unemployed';
const year = 1984;

// Functions
console.log(addDecl(2, 3));
// console.log(addExpr(2, 3));
console.log(addArrow);
// console.log(addArrow(2, 3));

function addDecl(a, b) {
  return a + b;
}

const addExpr = function (a, b) {
  return a + b;
};

var addArrow = (a, b) => a + b;

// Example
console.log(numProducts);
// Will show the message becaouse numProduct is a var so "undefined"
if (!numProducts) deletShoppingCar();

var numProducts = 10;
function deletShoppingCar() {
  console.log('All products deleted!');
}

var x = 1;
let y = 2;
const z = 3;

console.log(x === window.x); // true
console.log(y === window.y); // false
console.log(z === window.z); // false

// The THIS keyword
console.log(this);

const calcAge1 = function (birthYear) {
  console.log(2023 - birthYear);
  console.log(this);
};
calcAge1(1984);

// Arrow function does not have his own this keyword
// Owns the parent this keyword
const calcAgeArrow = birthYear => {
  console.log(2023 - birthYear);
  console.log(this);
};
calcAgeArrow(1984);

const alberto = {
  year: 1984,
  calcAge: function () {
    console.log(this);

    console.log(2023 - this.year);
  },
};
alberto.calcAge();

const matilde = {
  year: 2017,
};

// Copy calcAge function to matilde
matilde.calcAge = alberto.calcAge;
matilde.calcAge();

const f = alberto.calcAge;
f();
