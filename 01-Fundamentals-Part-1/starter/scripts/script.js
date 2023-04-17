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

// Logical Operators
if (languaje === "English" && population <= 50 && !isIsland) {
  console.log(`You should live in ${country}`);
} else {
  console.log(`${country} does not meet your criteria :()`);
}

// The switch Statement
switch (languaje.toLowerCase()) {
  case "chinese" || "mandarin":
    console.log("MOST number of native speakers!");
    break;
  case "spanish":
    console.log("2nd place in number of native speakers");
    break;
  case "english":
    console.log("3rd place");
    break;
  case "hindi":
    console.log("Number 4");
    break;
  case "arabic":
    console.log("5th most spoken languaje");
    break;
  default:
    console.log("Great languaje too :D");
}

// The Conditional(Ternary) Operator
const age = 23;
age >= 15
  ? console.log("I like to drink wine.")
  : console.log("I like to drink water");

const drink = age >= 18 ? "wine" : "water";
console.log(drink);

let drink2;
if (age >= 18) {
  drink2 = "wine ";
} else {
  drink2 = "water";
}
console.log(drink2);

console.log(`I like to drink ${age >= 18 ? "wine" : "water"}`);

// population = 13;
population > 33
  ? console.log(`${country}'s population is above average.`)
  : console.log(`${country}'s population is below average.`);
