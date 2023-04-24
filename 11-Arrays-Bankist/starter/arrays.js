'use strict';
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/////////////////////////////////////////////////
// SLICE
let arr = ['a', 'b', 'c', 'd', 'e'];
console.log(arr.slice(2, 3));
// Start at index 1 and extract everything except the 2 last
console.log(arr.slice(1, -2));

// SPLICE Mutate
// console.log(arr.splice(2));
// arr.splice(-1);
// arr.splice(1, 2);
console.log(arr);

// REVERSE Mutate
const arr2 = ['j', 'i', 'h', 'g', 'j'];
console.log(arr2.reverse());
console.log(arr2);

// CONCAT
const letters = arr.concat(arr2);
// const letters = [...arr, ...arr2];
console.log(letters);

// JOIN
console.log(letters.join(', '));

// AT
const arr3 = [23, 11, 64];
console.log(arr3[0]);
console.log(arr3.at(0));

console.log(arr3.at(-1));

console.log('alberto'.at(-1));

// FOREACH
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

movements.forEach(move =>
  move > 0
    ? console.log(`You deposited ${move}`)
    : console.log(`You withdrew ${Math.abs(move)}`)
);

movements.forEach((move, index, array) => {
  console.log(`Movements ${array.join(' |')}`),
    move > 0
      ? console.log(`Movement ${index}: you deposited ${move}`)
      : console.log(`Movement ${index}: you withdrew ${Math.abs(move)}`);
});

// FOREACH IN MAP
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach((value, key, map) => console.log(`${key}: ${value}`));

// FOREACH SET
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
currenciesUnique.forEach((value, _, set) => console.log(`${_}: ${value}`));

// MAP METHOD
const eurToUsd = 1.1;
// const usdMovements = movements.map(function (move, i) {
//   // return (move * eurToUsd).toFixed(2);
//   return `Movement ${i} is ${move}`;
// });

const usdMovs = movements.map(move => (move * eurToUsd).toFixed(2));
console.log(usdMovs);

const movementUSDfor = [];
for (const move of movements) movementUSDfor.push(move * eurToUsd);
console.log(movementUSDfor);

// FILTER
console.log(movements.filter(mov => mov > 0));

const withdrawals = movements.filter(mov => mov < 0);
console.log(withdrawals);

// REDUCE
const averageMov =
  movements.reduce((acc, mov) => acc + mov, 0) / movements.length;
const globalBalance = movements.reduce((acc, mov) => acc + mov, 0);
console.log(averageMov);
console.log(globalBalance / movements.length);

// Maximun value
const maximun = movements.reduce(
  (acc, mov) => (acc = mov > acc ? mov : acc),
  movements[0]
);
console.log(maximun);

// FIND
// Only returns the first one that match the condition
const firstWithdrawal = movements.find(mov => mov < 0);

// SOME value match the condition
console.log(movements);

//Equality
console.log(movements.includes(-130));

// Condition
const anyDeposits = movements.some(mov => mov > 0);
console.log(anyDeposits);

// EVERY values match the condition
console.log(movements.every(mov => mov > 0));

// Separate callback
const deposit = mov => mov > 0;
console.log(movements.every(deposit));
console.log(movements.some(deposit));
console.log(movements.filter(deposit));

// FLAT FLATMAP
// Merge nested arrays
const arr4 = [[1, 2, 3], [(4, 5, 6)], 7, 8];
console.log(arr4.flat());

const arr5 = [[[1, 2], 3], [[4, 5], 6], 7, 8];
console.log(arr5.flat());
// Deep or level of nested arrays
console.log(arr5.flat(2));

//SORT
// Strings
const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
console.log(owners.sort());

// Numbers
console.log(movements);
// console.log(movements.sort());

// return < 0, A > B (keep order)
// Return > 0, B, A (switch order)
movements.sort((a, b) => {
  return a > b ? -1 : 1;
});

movements.sort((a, b) => a - b); // Descending
movements.sort((a, b) => b - a); // Ascending
console.log(movements);

// Creating and filling arrays
const x = new Array(7).fill('', 3, 5); // Just like slice
console.log(x);

// Array.from
console.log(Array.from({ length: 7 }, () => 1));

const z = Array.from({ length: 7 }, (_, i) => i * 1);
console.log(z);

const dice = Array.from({ length: 100 }, () => Math.ceil(Math.random() * 6));
console.log(dice);

const movementsUI = Array.from(document.querySelectorAll('.movements__value'));
console.log(movementsUI);
