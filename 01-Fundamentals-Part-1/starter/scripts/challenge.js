/*
Mark and John are trying to compare their BMI (Body Mass Index), which is calculated using the formula: BMI = mass / height ** 2 = mass / (height * height). (mass in kg and height in meter).

1. Store Mark's and John's mass and height in variables
2. Calculate both their BMIs using the formula (you can even implement both versions)
3. Create a boolean variable 'markHigherBMI' containing information about whether Mark has a higher BMI than John.

TEST DATA 1: Marks weights 78 kg and is 1.69 m tall. John weights 92 kg and is 1.95 m tall.
TEST DATA 2: Marks weights 95 kg and is 1.88 m tall. John weights 85 kg and is 1.76 m tall.

GOOD LUCK 😀
*/

// Variables for TEST DATA 1
let mark = {
  name: "Mark",
  weight: 78,
  height: 1.69,
};
let john = {
  name: "John",
  weight: 92,
  height: 1.95,
};

// Function to calculate BMI
function calculateBmi(person) {
  return person.weight / person.height ** 2;
}

// Calculate BMI of both
mark.bmi = calculateBmi(mark);
john.bmi = calculateBmi(john);

// Show BMI of both
console.log(mark.bmi);
console.log(john.bmi);

// See if mark has a higher BMI than John and show
let markHigherBMI = mark.bmi > john.bmi;
console.log(markHigherBMI);

// Change variables for TEST DATA 2
// mark.weight = 95;
// mark.height = 1.88;
// john.weight = 85;
// john.height = 1.76;

// Calculate BMI of both
mark.bmi = calculateBmi(mark);
john.bmi = calculateBmi(john);

// Show BMI of both
console.log(mark.bmi);
console.log(john.bmi);

// See if mark has a higher BMI than John and show
markHigherBMI = mark.bmi > john.bmi;
console.log(markHigherBMI);

////////////////////////////////////
// Coding Challenge #2

/*
Use the BMI example from Challenge #1, and the code you already wrote, and improve it:

1. Print a nice output to the console, saying who has the higher BMI. The message can be either "Mark's BMI is higher than John's!" or "John's BMI is higher than Mark's!"
2. Use a template literal to include the BMI values in the outputs. Example: "Mark's BMI (28.3) is higher than John's (23.9)!"

HINT: Use an if/else statement 😉

GOOD LUCK 😀
*/

let bmiResult = "";
if (markHigherBMI) {
  bmiResult = "higher";
} else {
  bmiResult = "lower";
}

console.log(
  `${mark.name}'s BMI (${mark.bmi.toFixed(1)}) is ${bmiResult} than ${
    john.name
  }'s (${john.bmi.toFixed(1)})! `
);
