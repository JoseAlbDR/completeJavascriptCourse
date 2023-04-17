"use strict";

let hadDriversLicense = false;
const passTest = true;

passTest ? (hadDriversLicense = true) : (hadDriversLicense = false);
console.log(passTest);

// Functions
function describeCountry(country, population, capitalCity) {
  return `${country} has ${population} million people and its capital city is ${capitalCity}.`;
}

const firstCountry = describeCountry("Spain", 49, "Madrid");
const secondCountry = describeCountry("England", 29, "London");
const thirdCountry = describeCountry("France", 47, "Paris");

console.log(firstCountry);
console.log(secondCountry);
console.log(thirdCountry);
