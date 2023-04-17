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
let marks = {
  name: "Marks",
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
let marksBmi = calculateBmi(marks);
let johnBmi = calculateBmi(john);

// Show BMI of both
console.log(marksBmi);
console.log(johnBmi);

// See if Marks has a higher BMI than John and show
let markHigherBMI = marksBmi > johnBmi;
console.log(markHigherBMI);

// Change variables for TEST DATA 2
marks.weight = 95;
marks.height = 1.88;
john.weight = 85;
john.height = 1.76;

// Calculate BMI of both
marksBmi = calculateBmi(marks);
johnBmi = calculateBmi(john);

// Show BMI of both
console.log(marksBmi);
console.log(johnBmi);

// See if Marks has a higher BMI than John and show
markHigherBMI = marksBmi > johnBmi;
console.log(markHigherBMI);
