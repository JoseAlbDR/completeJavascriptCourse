'use strict';
// const pepe = {
//   name: 'pepe',
//   age: 26,
// };
// console.log(Object.entries(pepe)); // [["name", "pepe"], ["age"][26]]

// const [name, age] = Object.entries(pepe);
// console.log(name); // ["name", "pepe"]
// console.log(age); // ["age", 26]

// // Iterating objects reminder
// for (const [key, value] of Object.entries(pepe)) {
//   console.log(key, value); // name pepe, age 26
// }
// Object.entries(pepe).forEach(([key, value]) => console.log(key, value));
class Person {
  constructor(firstName, birthYear) {
    // Instance properties
    this.firstName = firstName;
    this.birthYear = birthYear;

    // Never to this (function inside of constructor function)
    // this.calcAge = function () {
    //   console.log(2023 - this.birthYear);
    // };
  }
}

const alberto = new Person('Alberto', 1984);
console.log(alberto);

// 1. New {} is created
// 2. function is called, this => {}
// 3. {} linked to prototype
// 4. function automatically return {}

const matilde = new Person('Matilde', 1984);
const leo = new Person('Leonidas', 2020);
console.log(matilde, leo);
console.log(alberto instanceof Person);

// PROTOTIPES
// Methods
Person.prototype.calcAge = function () {
  console.log(2020 - this.birthYear);
};

alberto.calcAge();
matilde.calcAge();
leo.calcAge();

console.log(alberto.toString());
console.log(alberto.__proto__);
console.log(leo.__proto__ === Person.prototype); // true
console.log(Person.prototype.isPrototypeOf(alberto)); // true
console.log(Person.prototype.isPrototypeOf(Person)); // false

// Properties
Person.prototype.species = 'Homo Sapiens';
console.log(alberto.species, leo.species); // Homo Sapiens
console.log(leo.hasOwnProperty('firstName')); // true
console.log(leo.hasOwnProperty('species')); // false

// The prototype of Person is object.prototype
// alberto.__proto__ => Person.prototype, Person.prototype.__proto__ => Object.prototype
console.log(Person.prototype.__proto__ === Object.prototype); // True

// INHERITANCE
console.log(leo.__proto__); // Person
console.log(leo.__proto__.__proto__); // Object, top of prototype chain
console.log(leo.__proto__.__proto__.__proto__); // null

console.dir(Person.prototype.constructor); // class Person

const arr = [1, 1, 1, 1, 1, 1, 0]; // new Array === []
console.log(arr.__proto__); // Array.prototype
console.log(arr.__proto__ === Array.prototype); // true
console.log(arr.__proto__.__proto__); // Object

// DONT DO IS
// Return unique values of a Array
Array.prototype.unique = function () {
  return [...new Set(this)];
};
// All arrays inherits unique
console.log(arr.unique()); //[1, 0]

const h1 = document.querySelector('h1');
console.dir(x => x + 1);
