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

// const addExpr = function (a, b) {
//   return a + b;
// };

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

// Var is included in windows object, windows.name
// var name = 'Pepe';

const alberto = {
  name: 'Alber',
  year: 1984,
  calcAge: function () {
    // console.log(this);
    console.log(2023 - this.year);

    // Copy this keyword into a variable becaouse calcAge have access to this
    const self = this;
    const isMillenial = function () {
      // isMillenial can use self becaouse is in his scope
      console.log(self); // Undefined
      console.log(self.year >= 1981 && self.year <= 1996);
    };
    isMillenial();
  },
  // Accesing windows.name variable
  greet: () => console.log(`Hey ${this.name}`),
};

const matilde = {
  year: 2017,
};

// Copy calcAge function to matilde
matilde.calcAge = alberto.calcAge;
matilde.calcAge();

const f = alberto.calcAge;
// f();

alberto.greet();
alberto.calcAge();

const leo = {
  firstName: 'Leo',
  year: 2020,
  calcAge: function () {
    console.log(2023 - this.year);

    // In an arrow function the this keyword will be his parents scope, this = leo
    const isMillenial = () => {
      console.log(this);
      console.log(this.year >= 1981 && this.year <= 1996);
    };
    isMillenial();
  },
};

leo.calcAge();

// Arguments keyword
const addExpr = function (a, b) {
  console.log(arguments);
  return a + b;
};

var addArrow = (a, b) => {
  console.log(arguments);
  return a + b;
};

addExpr(2, 5);
addExpr(2, 5, 8, 9);

// addArrow(1, 2);

// Primitive vs Objet (Primitive vs reference)
// let age = 38;
// let oldAge = age;
// age = 31;
// console.log(age);
// console.log(oldAge);

// const meAgain = {
//   name: 'Alberto',
//   age: 30,
// };

// const friend = meAgain;
// friend.age = 27;

// console.log(friend.age);
// console.log(meAgain.age);

// Primitive types
let lastName = 'Williams';
let oldLastName = lastName;
lastName = 'Davis';
console.log(lastName, oldLastName);

// Reference types
const jessica = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: '27',
};
// Copiying the REFERENCE to the object, not the object itself
const marriedJessica = jessica;
marriedJessica.lastName = 'Davis';
// They both to de same memory address in the heap
// Same values, if we change something in one it is changed in the other
console.log('Before marriage: ', jessica);
console.log('After marriage: ', marriedJessica);

// Is a const so we CANT reasign
// marriedJessica = {}

// Copying objects
const jessica2 = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: '27',
  family: ['Alice', 'Bob'],
};

// Dont create a deep copy
const marriedJessica2 = Object.assign({}, jessica2);
marriedJessica2.lastName = 'Davis';
console.log('Before marriage: ', jessica2);
console.log('After marriage: ', marriedJessica2);

// Object.assign WONT copy family array, just point to his reference
marriedJessica2.family.push('Mary');
marriedJessica2.family.push('John');
console.log('Before marriage: ', jessica2);
console.log('After marriage: ', marriedJessica2);
