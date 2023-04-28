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

Person.hey = function () {
  console.log('Hey there!!!!!!!!!');
};
// Static method
Person.hey();
// alberto.hey(); // Is not a function, not in the prototype
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

/////////////////////////////////////////////////////
/// ES6 CLASSES

// class expresion
// const PersonCl = class {}

// class decoration
class PersonCl {
  constructor(fullName, birthYear) {
    // this.fullName is a setter
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // Instance methods
  // Methods will be added to PersonCl.prototype property
  calcAge() {
    return 2023 - this.birthYear;
  }

  get age() {
    return this.calcAge();
  }

  // Set a property that already exist
  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name!`);
  }

  // is like a property, Personcl.prototype.fullName
  get fullName() {
    return this._fullName;
  }

  // Static method PersonCl.hey()
  static hey = function () {
    console.log('Hey there!!!!!!!!!');
  };
}
// Same as
PersonCl.prototype.greet = function () {
  console.log(`Hey ${this.fullName}`);
};
const jess = new PersonCl('Jessica Davis', 1996);
jess.calcAge();
console.log(jess.age);
jess.greet();
console.log(jess);

// 1. Classes are NOT hoisted (u cannot use them b4 declaration)
// 2. Calsses are first-class citizes (pass to functions and return from functions)
// 3. Classes are executed in strict mode

const walter = new PersonCl('Walter White', 1965);
/// SETTERS AND GETTERS
// class Account {
//   constructor(owner, movements) {
//     this.owner = owner;
//     this.movements = movements;
//   }

//   get latest() {
//     return this.movements.slice(-1).pop();
//   }

//   set latest(move) {
//     this.movements.push(move);
//   }
// }

// const jonas = new Account('Leo', [200, 530, 120, 300]);
// console.log(jonas.latest);
// jonas.latest = 500;
// console.log(jonas.latest);

// STATIC METHODS

PersonCl.hey();
