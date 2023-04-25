// Array Methods Practice
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  transferTo: {},
  transferFrom: {},
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  transferTo: {},
  transferFrom: {},
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  transferTo: {},
  transferFrom: {},
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  transferTo: {},
  transferFrom: {},
};

const accounts = [account1, account2, account3, account4];

// 1. SUM of all deposits
const bankDepositSum = accounts
  .flatMap(account => account.movements)
  .filter(movement => movement > 0)
  .reduce((acc, mov) => acc + mov, 0);

console.log(bankDepositSum);

// How many deposits have been in the bank with at least 100 dolars
const deposit100 = accounts
  .flatMap(account => account.movements)
  //   .filter(mov => mov >= 1000)
  .reduce((acc, value) => (value >= 1000 ? ++acc : acc), 0);

console.log(deposit100);

// IMPORTANT
// Create a new object wich contains the sum of the deposits and the sum of the withdrawals
const sums = accounts
  .flatMap(account => account.movements)
  .reduce(
    (sums, curr) => {
      //   curr > 0 ? (sums.deposits += curr) : (sums.withdrawals += curr);
      sums[curr > 0 ? 'deposits' : 'withdrawals'] += curr;
      return sums;
    },
    { deposits: 0, withdrawals: 0 }
  );
console.log(sums);

// 4.
// this is a nice title => This Is a Nice Title

const convertTitle = 'this is a nice title'
  .toLowerCase()
  .split(' ')
  .map(word => (word.length > 1 ? word[0].toUpperCase() + word.slice(1) : word))
  .join(' ');

const convertTitleReduce = function (title) {
  // Array of exceptions
  const exceptions = ['a', 'an', 'the', 'and', 'but', 'or', 'on', 'in', 'with'];

  // Function to capitalize a given word
  const capitalize = word => word[0].toUpperCase() + word.slice(1);
  return title
    .toLowerCase() // All words to lowerCase by default
    .split(' ') // Conver to array with ' ' separator
    .reduce((acc, word, index) => {
      // If word IS NOT in the exceptions or the word IS the first
      !exceptions.includes(word) || index === 0
        ? (acc += capitalize(word) + ' ') // Capitalize the word and chain it
        : (acc += word + ' '); // Chain the lowerCased word
      return acc; // Return acc where the words are chaining
    }, '')
    .trimEnd(); // To remove the final space
};

console.log(convertTitle);
console.log(convertTitleReduce(convertTitle));
console.log(convertTitleReduce('this is a LONG title but not too long'));
console.log(convertTitleReduce('and here is another title with an EXAMPLE'));

const exceptions = ['a', 'an', 'the', 'and', 'but', 'or', 'on', 'in', 'with'];

const title1 = 'and here is another title with an EXAMPLE';
const title2 = 'this is a LONG title but not too long';

const capitalizeTitle = title => {
  return title.split(' ').reduce((result, word, index) => {
    if (exceptions.includes(word) && index !== 0) {
      result += word.toLowerCase();
    } else {
      result += word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }
    if (index !== title.split(' ').length - 1) {
      result += ' ';
    }
    return result;
  }, '');
};

console.log(capitalizeTitle(title1)); // "And Here Is Another Title with an Example"
console.log(capitalizeTitle(title2)); // "This Is a Long Title but Not Too Long"

const dogs = [
  { weight: 22, curFood: 240, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

// Your tasks:
// 1. Loop over the 'dogs' array containing dog objects, and for each dog, calculate
// the recommended food portion and add it to the object as a new property. Do
// not create a new array, simply loop over the array. Forumla:
// recommendedFood = weight ** 0.75 * 28. (The result is in grams of
// food, and the weight needs to be in kg)
dogs.forEach(
  dog => (dog.recoFood = Number(Math.trunc(dog.weight ** 0.75 * 28)))
);
console.log(dogs);

// 2. Find Sarah's dog and log to the console whether it's eating too much or too
// little. Hint: Some dogs have multiple owners, so you first need to find Sarah in
// the owners array, and so this one is a bit tricky (on purpose) �
console.log(
  dogs
    .filter(dog => dog.owners.includes('Sarah'))
    .reduce(
      (acc, curr) =>
        curr.curFood < curr.recoFood
          ? (acc = `Eating to little`)
          : (acc = `Eating too much`),
      ''
    )
);
// 3. Create an array containing all owners of dogs who eat too much
// ('ownersEatTooMuch') and an array with all owners of dogs who eat too little
// ('ownersEatTooLittle').
const [ownersEatTooMuch, ownersEatTooLittle] = dogs.reduce(
  (acc, curr) => {
    curr.curFood > curr.recoFood
      ? acc[0].push(curr.owners)
      : acc[1].push(curr.owners);
    return acc;
  },
  [[], []]
);

console.log(ownersEatTooMuch.flat());
console.log(ownersEatTooLittle.flat());

// 4. Log a string to the console for each array created in 3., like this: "Matilda and
// Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat
// too little!"
console.log(`${ownersEatTooMuch.flat().join(' and ')} dogs eat too much!`);
console.log(`${ownersEatTooLittle.flat().join(' and ')} dogs eat too little!`);

// 5. Log to the console whether there is any dog eating exactly the amount of food
// that is recommended (just true or false)
console.log(dogs.some(dog => dog.recoFood === dog.curFood));

// 6. Log to the console whether there is any dog eating an okay amount of food
// (just true or false)
const okFood = dog =>
  dog.recoFood * 1.1 > dog.curFood && dog.curFood > dog.recoFood * 0.9;
console.log(
  dogs.some(
    dog => dog.recoFood * 1.1 > dog.curFood && dog.curFood > dog.recoFood * 0.9
  )
);

// 7. Create an array containing the dogs that are eating an okay amount of food (try
// to reuse the condition used in 6.)
const okAmount = dogs.filter(dog => okFood(dog));
console.log(okAmount);

// 8. Create a shallow copy of the 'dogs' array and sort it by recommended food
// portion in an ascending order (keep in mind that the portions are inside the
// array's objects �)

console.log(dogs.slice().sort((a, b) => a.recoFood - b.recoFood));
console.log(dogs);

// The Complete JavaScript Course 26
// Hints:
// § Use many different tools to solve these challenges, you can use the summary
// lecture to choose between them �
// § Being within a range 10% above and below the recommended portion means:
// current > (recommended * 0.90) && current < (recommended *
// 1.10). Basically, the current portion should be between 90% and 110% of the
// recommended portion.
// Test data:

// const printDogs = (dogs, message = '') =>
//   dogs.forEach(dog => {
//     console.log(message);
//     for (const [key, value] of Object.entries(dog)) {
//       console.log(`${key}: ${value}\n`);
//     }
//     console.log('\n');
//   });

// // 1. Loop over the 'dogs' array containing dog objects, and for each dog, calculate
// // the recommended food portion and add it to the object as a new property. Do
// // not create a new array, simply loop over the array. Forumla:
// // recommendedFood = weight ** 0.75 * 28. (The result is in grams of
// // food, and the weight needs to be in kg)

// dogs.forEach(dog => {
//   dog.recoFoodPort = (dog.weight ** 0.75 * 28).toFixed(2);
// });
// printDogs(dogs);
// // console.log(dogs);

// // 2. Find Sarah's dog and log to the console whether it's eating too much or too
// // little. Hint: Some dogs have multiple owners, so you first need to find Sarah in
// // the owners array, and so this one is a bit tricky (on purpose) �
// // console.log(dogs.find(dog => dog.owners.some(name => name === 'Sarah')));
// // console.log(dogs.filter(dog => dog.owners.includes('Sarah')));
// const sarahDog = dogs.find(dog => dog.owners.includes('Sarah'));
// sarahDog.recoFoodPort > sarahDog.curFood
//   ? console.log('Eating too much.')
//   : console.log('Eating too little');

// // 3. Create an array containing all owners of dogs who eat too much
// // ('ownersEatTooMuch') and an array with all owners of dogs who eat too little
// // ('ownersEatTooLittle').

// const ownersEatTooMuch = dogs.filter(dog => dog.curFood > dog.recoFoodPort);
// const ownersEatTooLittle = dogs.filter(dog => dog.curFood < dog.recoFoodPort);
// printDogs(ownersEatTooLittle, 'Eating too little\n');
// printDogs(ownersEatTooMuch, 'Eating too much\n');

// // 4. Log a string to the console for each array created in 3., like this: "Matilda and
// // Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat
// // too little!"
// console.log(
//   `${ownersEatTooLittle
//     .flatMap(dog => dog.owners)
//     .join(' and ')}'s dogs eat too little.`
// );
// // dog.curFood > dog.recoFoodPort + 0.9 && dog.curFood < dog.recoFoodPort * 1.1
// console.log(
//   `${ownersEatTooMuch
//     .flatMap(dog => dog.owners)
//     .join(' and ')}'s dogs eat too much.`
// );

// // 5. Log to the console whether there is any dog eating exactly the amount of food
// // that is recommended (just true or false)
// console.log(dogs.some(dog => dog.curFood === dog.recoFoodPort));

// // 6. Log to the console whether there is any dog eating an okay amount of food
// // (just true or false)
// console.log(
//   dogs.some(
//     dog =>
//       dog.curFood > dog.recoFoodPort * 0.9 &&
//       dog.curFood < dog.recoFoodPort * 1.1
//   )
// );

// // 7. Create an array containing the dogs that are eating an okay amount of food (try
// // to reuse the condition used in 6.)
// const okAmount = dogs.filter(
//   dog =>
//     dog.curFood > dog.recoFoodPort * 0.9 && dog.curFood < dog.recoFoodPort * 1.1
// );

// printDogs(okAmount, 'ok amount');
// 34;

// // 8. Create a shallow copy of the 'dogs' array and sort it by recommended food
// // portion in an ascending order (keep in mind that the portions are inside the
// // array's objects �)

// const orderedDogs = dogs
//   .slice()
//   .map(dog => dog)
//   .sort((a, b) => a.recoFoodPort - b.recoFoodPort);
// console.log(orderedDogs);
