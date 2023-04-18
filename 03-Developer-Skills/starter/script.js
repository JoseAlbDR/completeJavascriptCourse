// Remember, we're gonna use strict mode in all scripts now!
"use strict";

// Problem solving
// We work for a company building a smart home thermometer. Our most recent task si this: "Given an array of temperatures of one day, calculate the temperature amplitude. Keep in mind that somethimes there might be a sensor error."

const temperaturesOne = [3, -2, -6, -1, "error", 9, 13, 17, 15, 14, 9, 5];
const temperaturesTwo = [3, -2, -20, -1, "error", 9, 13, 20, 15, 14, 9, 5];
// 1) Undesrtanding the problem
// - What is temp amplitude= Answer? difference between highest and lowest temp
// - How to compute max and min temperatures?
// - Whats a sensor error? And what todo?

// 2) Breaking up into sub-problems
// - How to ignore errors?

const calcTempAmplitude = function (tempsOne, tempsTwo) {
  const temps = tempsOne.concat(tempsTwo);
  let max = temps[0];
  let min = max;
  for (let value in temps) {
    if (typeof temps[value] !== "number") continue;
    // - Find max value in temp array
    if (temps[value] > max) max = temps[value];
    // - Find min value in temp array
    if (temps[value] < min) min = temps[value];
  }
  // - Subtract min from max (ampitude) and return it
  return max - min;
};

console.log(calcTempAmplitude(temperaturesOne, temperaturesTwo));

// PROBLEM 2:
// Function should now recieve 2 arrays of temperatures

// 1) Understanding the problem
// - With 2 arrays, should we implement funcionality
// Merge arrays
// 2) Breaking up into sub-problems
// Merge two arrays

// Debugging
const measureKelvin = function () {
  const measurement = {
    type: "temp",
    unit: "cels",
    value: Number(prompt("Degrees celcius:")),
  };
  console.log(measurement.value);
  console.table(measurement);
  //   console.warn(measurement.value);
  //   console.error(measurement.value);

  const kelvin = measurement.value + 273;
  return kelvin;
};
// A) IDENFIFY
console.log(measureKelvin());
