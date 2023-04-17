// Values and Variables
let country = "Spain";
let continent = "Europe";
let population = 49;
console.log(country);
console.log(continent);
console.log(population);

// Data Types
const isIsland = false;
let languaje;
console.log(typeof isIsland);
console.log(typeof population);
console.log(typeof country);
console.log(typeof languaje);

// let, const and var
languaje = "Spanish";
// isIsland = false; Error

// Basic Operators
console.log(population / 2);
console.log(++population);
console.log(population > 6);
console.log(population < 33);
let description = `${country} is in ${continent}, and its ${population} million people speak ${languaje}`;
console.log(description);

// Strings and Template Literals
// Already done it

// Taking Decisions: if / else Statements
if (population > 33) {
  console.log(`${country}'s population is above average.`);
} else {
  console.log(`${country}'s population is below average.`);
}

// Type Conversion and Coercion
console.log("9" - "5"); // 4
console.log("19" - "13" + "17"); // 617
console.log("19" - "13" + 17); // 23
console.log("123" < 57); // false
console.log(5 + 6 + "4" + 9 - 4 - 2); // 1143

// Equality Operators: == vs. ===
// let numNeighbours = Number(
//   prompt("How many neighbour countries does your country have?")
// );
// if (numNeighbours === 1) {
//   console.log("Only 1 border!");
// } else if (numNeighbours > 1) {
//   console.log("More than 1 border.");
// } else {
//   console.log("No borders");
// }
