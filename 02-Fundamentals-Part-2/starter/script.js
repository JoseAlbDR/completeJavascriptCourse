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

// Expresion
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

// Expresion
const percentageOfWorld2 = function (population) {
  return (population / 7900) * 100;
};

firstCountry = percentageOfWorld2(1441);
secondCountry = percentageOfWorld2(49);
thirdCountry = percentageOfWorld2(13);

console.log(firstCountry);
console.log(secondCountry);
console.log(thirdCountry);
