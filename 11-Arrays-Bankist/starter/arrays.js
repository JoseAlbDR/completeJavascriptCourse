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
