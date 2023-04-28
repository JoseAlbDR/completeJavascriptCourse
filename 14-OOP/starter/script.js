'use strict';

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

// Prototipes
