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

// const alberto = new Person('Alberto', 1984);
// console.log(alberto);

// 1. New {} is created
// 2. function is called, this => {}
// 3. {} linked to prototype
// 4. function automatically return {}

// const matilde = new Person('Matilde', 1984);
// const leo = new Person('Leonidas', 2020);
// console.log(matilde, leo);
// console.log(alberto instanceof Person);

// Person.hey = function () {
//   console.log('Hey there!!!!!!!!!');
// };
// Static method
// Person.hey();
// // alberto.hey(); // Is not a function, not in the prototype
// // PROTOTIPES
// // Methods

// alberto.calcAge();
// matilde.calcAge();
// leo.calcAge();

// console.log(alberto.toString());
// console.log(alberto.__proto__);
// console.log(leo.__proto__ === Person.prototype); // true
// console.log(Person.prototype.isPrototypeOf(alberto)); // true
// console.log(Person.prototype.isPrototypeOf(Person)); // false

// // Properties
// Person.prototype.species = 'Homo Sapiens';
// console.log(alberto.species, leo.species); // Homo Sapiens
// console.log(leo.hasOwnProperty('firstName')); // true
// console.log(leo.hasOwnProperty('species')); // false

// // The prototype of Person is object.prototype
// // alberto.__proto__ => Person.prototype, Person.prototype.__proto__ => Object.prototype
// console.log(Person.prototype.__proto__ === Object.prototype); // True

// // INHERITANCE
// console.log(leo.__proto__); // Person
// console.log(leo.__proto__.__proto__); // Object, top of prototype chain
// console.log(leo.__proto__.__proto__.__proto__); // null

// console.dir(Person.prototype.constructor); // class Person

// const arr = [1, 1, 1, 1, 1, 1, 0]; // new Array === []
// console.log(arr.__proto__); // Array.prototype
// console.log(arr.__proto__ === Array.prototype); // true
// console.log(arr.__proto__.__proto__); // Object

// // DONT DO IS
// // Return unique values of a Array
// Array.prototype.unique = function () {
//   return [...new Set(this)];
// };
// // All arrays inherits unique
// console.log(arr.unique()); //[1, 0]

// const h1 = document.querySelector('h1');
// console.dir(x => x + 1);

/////////////////////////////////////////////////////
/// ES6 CLASSES

// class expresion
// const PersonCl = class {}

// class decoration

// Same as

// const jess = new PersonCl('Jessica Davis', 1996);
// jess.calcAge();
// console.log(jess.age);
// jess.greet();
// console.log(jess);

// // 1. Classes are NOT hoisted (u cannot use them b4 declaration)
// // 2. Calsses are first-class citizes (pass to functions and return from functions)
// // 3. Classes are executed in strict mode

// const walter = new PersonCl('Walter White', 1965);
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

// PersonCl.hey();

// steven.calcAge(); //43
// console.log(steven.__proto__); //PersonProto
// console.log(steven.__proto__ === PersonProto); //true
// const sara = Object.create(PersonProto);
// sara.init('Sara', 1979);
// console.log(sara); // "Sara", 1970
// const { name: firstName, birthYear } = sara;
// sara.calcAge(); // 44
// console.log(firstName); // Sara
// console.log(birthYear); // 19

//////////////////////////////////////////////////////////
/// INHERITANCE BETWEEN CLASSES

// const Person = function (firstName, birthYear) {
//   // Instance properties
//   this.firstName = firstName;
//   this.birthYear = birthYear;

//   // Never to this (function inside of constructor function)
//   // this.calcAge = function () {
//   //   console.log(2023 - this.birthYear);
//   // };
// };

// Person.prototype.calcAge = function () {
//   console.log(2020 - this.birthYear);
// };

// const Student = function (firstName, birthYear, course) {
//   // This points to new Student(...) inherits atributtes from Person
//   Person.call(this, firstName, birthYear);
//   this.course = course;
// };
// // In Person.prototype only exist caclAge
// Student.prototype = Object.create(Person.prototype);
// Student.prototype.introduce = function () {
//   console.log(`My name is ${this.firstName} and I study ${this.course}`);
// };
// const mike = new Student('Mike', 2000, 'Computer Science');
// console.log(mike);
// mike.introduce();
// console.log(mike.__proto__); // Student
// mike.calcAge();

// console.log(mike instanceof Student); // true
// console.log(mike instanceof Person); // true

// console.dir(Student.prototype.constructor); // Person
// Student.prototype.constructor = Student;
// console.dir(Student.prototype.constructor); // Student

// Inheritance with class
// class PersonCl {
//   constructor(fullName, birthYear) {
//     // this.fullName is a setter
//     this.fullName = fullName;
//     this.birthYear = birthYear;
//   }

//   // Instance methods
//   // Methods will be added to PersonCl.prototype property
//   calcAge() {
//     return 2023 - this.birthYear;
//   }

//   greet() {
//     console.log(`Hey ${this.fullName}`);
//   }
//   get age() {
//     return this.calcAge();
//   }

//   // Set a property that already exist
//   set fullName(name) {
//     if (name.includes(' ')) this._fullName = name;
//     else alert(`${name} is not a full name!`);
//   }

//   // is like a property, Personcl.prototype.fullName
//   get fullName() {
//     return this._fullName;
//   }

//   // Static method PersonCl.hey()
//   static hey = function () {
//     console.log('Hey there!!!!!!!!!');
//   };
// }

// // Extends links the prototipes
// class StudentCl extends PersonCl {
//   constructor(fullName, birthYear, course) {
//     // Always needs to happen first
//     super(fullName, birthYear);
//     this.course = course;
//   }
//   introduce() {
//     console.log(`My name is ${this.fullName} and I study ${this.course}`);
//   }

//   calcAge() {
//     console.log(
//       `Im ${
//         2023 - this.birthYear
//       } years old, but as a student I feel more like ${
//         2023 - this.birthYear + 10
//       } `
//     );
//   }
// }

// const martha = new StudentCl('Martha Stuart', 1969, 'Computer Science');
// console.log(martha);
// martha.introduce();
// martha.calcAge();

// Inheritance Object.create
// OBJECT.CREATE
// const PersonProto = {
//   calcAge() {
//     console.log(2023 - this.birthYear);
//   },

//   init(firstName, birthYear) {
//     this.firstName = firstName;
//     this.birthYear = birthYear;
//   },
// };

// const steven = Object.create(PersonProto);

// const StudentProto = Object.create(PersonProto);
// const jay = Object.create(StudentProto);

// StudentProto.init = function (firstName, birthYear, course) {
//   PersonProto.init.call(this, firstName, birthYear);
//   this.course = course;
// };

// StudentProto.introduce = function () {
//   console.log(`My name is ${this.firstName} and I study ${this.course}`);
// };
// jay.init('Jay Z', 1970, 'Computer Science');
// jay.introduce();
// jay.calcAge();

// Public fields
// Private fields
// Purblic methods
// Private methods

class Account {
  // PUBLIC FIELDS (intstances not prototype)
  locale = navigator.languaje;
  _balance = 0;

  // PRIVATE FIELDS
  #movements = [];
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin;
    console.log(`Thanks ${this.owner} for opening an account.`);
  }

  // PRIVATE METHODS
  #calcBalance() {
    this.balance = this.#movements.reduce((acc, mov) => (acc += mov), 0);
  }

  #aproveLoan(value) {
    // LOGIC
    return true;
  }

  // PUBLIC METHODS
  getMovements() {
    return this.#movements;
  }

  deposit(value) {
    this.#movements.push(value);
    this.#calcBalance();
  }

  withdraw(value) {
    this.deposit(-value);
    this.#calcBalance();
  }

  requestLoan(value) {
    if (this.#aproveLoan(value)) {
      this.deposit(value);
      console.log('Loan approved');
    }
  }
}

const acc1 = new Account('Alberto', 'EUR', 1111);
console.log(navigator.languaje);

acc1.deposit(250);
acc1.withdraw(140);
acc1.requestLoan(1000);
console.log(acc1);
console.log(acc1.getMovements());
// console.log(acc1.#pin); // ERROR PRIVATE
// console.log(acc1.#movements); // ERROR PRIVATE
