// Array Methods Practice

// Your tasks:
// 1. Loop over the 'dogs' array containing dog objects, and for each dog, calculate
// the recommended food portion and add it to the object as a new property. Do
// not create a new array, simply loop over the array. Forumla:
// recommendedFood = weight ** 0.75 * 28. (The result is in grams of
// food, and the weight needs to be in kg)
// 2. Find Sarah's dog and log to the console whether it's eating too much or too
// little. Hint: Some dogs have multiple owners, so you first need to find Sarah in
// the owners array, and so this one is a bit tricky (on purpose) �
// 3. Create an array containing all owners of dogs who eat too much
// ('ownersEatTooMuch') and an array with all owners of dogs who eat too little
// ('ownersEatTooLittle').
// 4. Log a string to the console for each array created in 3., like this: "Matilda and
// Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat
// too little!"
// 5. Log to the console whether there is any dog eating exactly the amount of food
// that is recommended (just true or false)
// 6. Log to the console whether there is any dog eating an okay amount of food
// (just true or false)
// 7. Create an array containing the dogs that are eating an okay amount of food (try
// to reuse the condition used in 6.)
// 8. Create a shallow copy of the 'dogs' array and sort it by recommended food
// portion in an ascending order (keep in mind that the portions are inside the
// array's objects �)
// The Complete JavaScript Course 26
// Hints:
// § Use many different tools to solve these challenges, you can use the summary
// lecture to choose between them �
// § Being within a range 10% above and below the recommended portion means:
// current > (recommended * 0.90) && current < (recommended *
// 1.10). Basically, the current portion should be between 90% and 110% of the
// recommended portion.
// Test data:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

const printDogs = (dogs, message = '') =>
  dogs.forEach(dog => {
    console.log(message);
    for (const [key, value] of Object.entries(dog)) {
      console.log(`${key}: ${value}\n`);
    }
    console.log('\n');
  });

// 1. Loop over the 'dogs' array containing dog objects, and for each dog, calculate
// the recommended food portion and add it to the object as a new property. Do
// not create a new array, simply loop over the array. Forumla:
// recommendedFood = weight ** 0.75 * 28. (The result is in grams of
// food, and the weight needs to be in kg)

dogs.forEach(dog => {
  dog.recoFoodPort = (dog.weight ** 0.75 * 28).toFixed(2);
});
printDogs(dogs);
// console.log(dogs);

// 2. Find Sarah's dog and log to the console whether it's eating too much or too
// little. Hint: Some dogs have multiple owners, so you first need to find Sarah in
// the owners array, and so this one is a bit tricky (on purpose) �
// console.log(dogs.find(dog => dog.owners.some(name => name === 'Sarah')));
// console.log(dogs.filter(dog => dog.owners.includes('Sarah')));
const sarahDog = dogs.find(dog => dog.owners.includes('Sarah'));
sarahDog.recoFoodPort > sarahDog.curFood
  ? console.log('Eating too much.')
  : console.log('Eating too little');

// 3. Create an array containing all owners of dogs who eat too much
// ('ownersEatTooMuch') and an array with all owners of dogs who eat too little
// ('ownersEatTooLittle').

const ownersEatTooMuch = dogs.filter(dog => dog.curFood > dog.recoFoodPort);
const ownersEatTooLittle = dogs.filter(dog => dog.curFood < dog.recoFoodPort);
printDogs(ownersEatTooLittle, 'Eating too little\n');
printDogs(ownersEatTooMuch, 'Eating too much\n');

// 4. Log a string to the console for each array created in 3., like this: "Matilda and
// Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat
// too little!"
console.log(
  `${ownersEatTooLittle
    .flatMap(dog => dog.owners)
    .join(' and ')}'s dogs eat too little.`
);
// dog.curFood > dog.recoFoodPort + 0.9 && dog.curFood < dog.recoFoodPort * 1.1
console.log(
  `${ownersEatTooMuch
    .flatMap(dog => dog.owners)
    .join(' and ')}'s dogs eat too much.`
);

// 5. Log to the console whether there is any dog eating exactly the amount of food
// that is recommended (just true or false)
console.log(dogs.some(dog => dog.curFood === dog.recoFoodPort));

// 6. Log to the console whether there is any dog eating an okay amount of food
// (just true or false)
console.log(
  dogs.some(
    dog =>
      dog.curFood > dog.recoFoodPort * 0.9 &&
      dog.curFood < dog.recoFoodPort * 1.1
  )
);

// 7. Create an array containing the dogs that are eating an okay amount of food (try
// to reuse the condition used in 6.)
const okAmount = dogs.filter(
  dog =>
    dog.curFood > dog.recoFoodPort * 0.9 && dog.curFood < dog.recoFoodPort * 1.1
);

printDogs(okAmount, 'ok amount');
34;

// 8. Create a shallow copy of the 'dogs' array and sort it by recommended food
// portion in an ascending order (keep in mind that the portions are inside the
// array's objects �)

const orderedDogs = dogs
  .slice()
  .map(dog => dog)
  .sort((a, b) => a.recoFoodPort - b.recoFoodPort);
console.log(orderedDogs);
