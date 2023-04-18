"use strict";

let hadDriversLicense = false;
const passTest = true;

passTest ? (hadDriversLicense = true) : (hadDriversLicense = false);
console.log(passTest);

// Functions
function describeCountry(country, population, capitalCity) {
  return `${country} has ${population} million people and its capital city is ${capitalCity}.`;
}

let firstCountry = describeCountry("Spain", 49, "Madrid");
let secondCountry = describeCountry("England", 29, "London");
let thirdCountry = describeCountry("France", 47, "Paris");

console.log(firstCountry);
console.log(secondCountry);
console.log(thirdCountry);

// Function Declaration vs Expressions
// Declaration, can be invoqued b4 declaration
console.log(calcAge1(1984));

function calcAge1(birthYear) {
  return 2037 - birthYear;
}

// Expression
const calcAge2 = function (birthYear) {
  return 2037 - birthYear;
};
console.log(calcAge2(2020));

// Exercise
// Declaration
function percentageOfWorld1(population) {
  return (population / 7900) * 100;
}

firstCountry = percentageOfWorld1(1441);
secondCountry = percentageOfWorld1(49);
thirdCountry = percentageOfWorld1(13);

console.log(firstCountry);
console.log(secondCountry);
console.log(thirdCountry);

// Expression
const percentageOfWorld2 = function (population) {
  return (population / 7900) * 100;
};

firstCountry = percentageOfWorld2(1441);
secondCountry = percentageOfWorld2(49);
thirdCountry = percentageOfWorld2(13);

console.log(firstCountry);
console.log(secondCountry);
console.log(thirdCountry);

// Arrow functions
const calcAge3 = (birthYear) => 2037 - birthYear;
console.log(calcAge3(2010));

const yearsUntilRetirement = (birthYear, firstName) => {
  const age = 2037 - birthYear;
  return `${firstName} retires in ${67 - age} years`;
};
console.log(yearsUntilRetirement(1984, "Alberto"));

// Exercise
const percentageOfWorld3 = (population) => population - 7900 / 100;
console.log(percentageOfWorld3(100));

// Functions calling other functions
const describePopulation = (country, population) =>
  `${country} has ${population} million people, wich is about ${percentageOfWorld1(
    population
  ).toFixed(2)}% of the world.`;

console.log(describePopulation("China", 1441));

// Arrays
// Introduction to Arrays
// Array with populations
let population = [59, 13, 1441, 70];
// Check if length === 4
console.log(population.length === 4 ? true : false);
let percentages = [];
// For a position in population
for (let position in population) {
  // Add the percentage to the array
  percentages.push(percentageOfWorld1(population[position]).toFixed(2));
}
// Print result
console.log(percentages);

// Operations with arrays
const friends = ["Michael", "Steven", "Peter"];
// Add
const newLength = friends.push("Jay");
console.log(newLength);
friends.unshift("Jonas");
console.log(friends);
// Remove
console.log(friends.pop());
console.log(friends.shift());
console.log(friends);
// IndexOf
console.log(friends.indexOf("Peter"));
console.log(friends.indexOf("Petah"));
// Include
friends.push("23");
console.log(friends.includes("Peter"));
console.log(friends.includes("Petah"));
console.log(friends.includes(23));

friends.includes("Peter")
  ? console.log("You have a friend called Peter.")
  : console.log("You dont have a friend called Peter.");

// Practice
const neighbours = ["Portugal", "France", "Marruecos"];
neighbours.push("Utopia");
neighbours.pop();
neighbours.includes("Germany")
  ? console.log("A central European country.")
  : console.log("Probably not a central European country :D");

const index = neighbours.indexOf("Marruecos");
neighbours[index] = "Gibraltar";
console.log(neighbours);

// Introduction to Objects
const myCountry = {
  country: "Spain",
  capital: "Madrid",
  languaje: "Spanish",
  population: 49,
  neighbours: ["Portugal", "France", "Gibraltar"],

  describe: function () {
    return `${myCountry.country} has ${myCountry.population} million ${myCountry.languaje}-speaking people, ${myCountry.neighbours.length} neighbouring countries and a capital called ${myCountry.capital}`;
  },

  checkIsland: function () {
    this.isIsland = this.neighbours.length === 0 ? true : false;
    return this.isIsland;
  },
};

// Dot vs Bracket Notation
console.log(myCountry.describe());
myCountry.checkIsland();
console.log(myCountry.isIsland);

myCountry.population += 2;
myCountry["population"] -= 2;
console.log(myCountry.population);

// Object methods

const alberto = {
  firstName: "Alberto",
  lastName: "Delgado",
  birthYear: 1984,
  job: "unemployed",
  friends: ["Guille", "Wanin", "Pelos"],
  hasDriverLicense: true,

  calcAge: function () {
    this.age = 2023 - this.birthYear;
    console.log(this.age);
    return this.age;
  },

  getSummary: function () {
    return `${this.firstName} is a ${this.age}-year old ${this.job} and ${
      this.hasDriverLicense ? "he has" : "he has not"
    } a driver's lisence.`;
  },
};

console.log(alberto.calcAge());
console.log(alberto.age);

// Challenge
// "Jonas is a 39-year old unemployed, and he has a driver's lisence"
console.log(alberto.getSummary());

// Loops
// for (let n = 1; n <= 50; n++) {
//   console.log(`Voter number ${n} is currently voting.`);
// }

// Loop arrays

const myArray = [
  "Alberto",
  "Delgado",
  2023 - 1984,
  "unemployed",
  ["Guille", "Wanin", "Pelos"],
];

for (let i = 0; i < myArray.length; i++) {
  if (typeof myArray[i] !== "string") continue;
  console.log(myArray[i], typeof myArray[i]);
}

const years = [1991, 2007, 1969, 2020];
const ages = [];

for (let year in years) {
  ages.push(2023 - years[year]);
}
console.log(ages);

// Looping Backwards and Loops in Loops
const listOfNeighbours = [
  ["Canada", "Mexico"],
  ["Spain"],
  ["Norway", "Sweden", "Russia"],
];
for (let neigh in listOfNeighbours) {
  for (let country in listOfNeighbours[neigh]) {
    console.log(`Neighbour: ${listOfNeighbours[neigh][country]}`);
  }
}

// The while Loop
console.log(population);
let n = 0;
while (n < population.length) {
  console.log(percentageOfWorld1(population[n]).toFixed(2));
  n++;
}
