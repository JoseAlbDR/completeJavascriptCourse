'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

const weekDays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const openingHours = {
  [weekDays[3]]: {
    open: 12,
    close: 22,
  },
  [weekDays[4]]: {
    open: 11,
    close: 23,
  },
  [weekDays[5]]: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  // Old
  // openingHours: openingHours,

  // ES6 enhanced object literals, INCLUDING AN OBJECT INSIDE ANOTHER
  openingHours,

  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery({ starterIndex = 1, mainIndex = 0, time = '20:00', address }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]}, ${this.mainMenu[mainIndex]}, ${time}, ${address}`
    );
  },

  orderPasta(ing1, ing2, ing3) {
    console.log(`Here is your delicious pasta with ${ing1}, ${ing2}, ${ing3}.`);
  },

  orderPizza(mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
  },
};

const properties = Object.keys(openingHours);
console.log(properties);
let openStr = `We are open on ${properties.length} days: `;

// LOOPING OBJECTS
// Property NAMES
for (const day of properties) {
  openStr += `${day}, `;
}
console.log(openStr);

// Property VALUES
const values = Object.values(openingHours);
console.log(values);

// Property ENTRIES
const entries = Object.entries(openingHours);
console.log(entries);

for (const [key, { open, close }] of entries) {
  console.log(`On ${key} we open at ${open} and close at ${close}`);
}

// Optional chaining
if (restaurant.openingHours.mon) console.log(restaurant.openingHours.mon.open);
if (restaurant.openingHours.fri) console.log(restaurant.openingHours.fri.open);
restaurant.openingHours.fri && console.log(restaurant.openingHours.fri.open);

// WITH optional chaining
console.log(restaurant.openingHours?.mon?.open);
console.log(restaurant.openingHours?.fri?.open);

const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

for (const day of days) {
  // if (restaurant.openingHours[day]?.open === undefined) continue;
  const open = restaurant.openingHours[day]?.open ?? 'closed';
  console.log(`On ${day}, we open at ${open}`);
}

// METHODS
console.log(restaurant.order?.(0, 1) ?? 'Method does not exist.');
console.log(restaurant.orderRissoto?.(0, 1) ?? 'Method does not exist.');

// ARRAYS
const users = [{ name: 'Alberto', email: 'alberto@gmail.com' }];
console.log(users[0]?.name ?? 'User array empty');
console.log(users[1]?.name ?? 'User does not exist');

//
// restaurant.orderDelivery({
//   time: '22:30',
//   address: 'Via del Sole, 21',
//   mainIndex: 2,
//   starterIndex: 2,
// });

// restaurant.orderDelivery({
//   address: 'Via del sole, 21',
//   starterIndex: 1,
// });

// console.log(restaurant.mainMenu[2]);

// // Object destructuring
// const { name, openingHours, categories } = restaurant;
// console.log(name, openingHours, categories);

// const {
//   name: restaurantName,
//   openingHours: hours,
//   categories: tags,
// } = restaurant;
// console.log(restaurantName, openingHours, tags);

// // Default values
// const { menu = [], starterMenu: starters = [] } = restaurant;
// console.log(menu, starters);

// // Mutating variables
// let a = 111;
// let b = 999;
// const obj = { a: 23, b: 7, c: 14 };
// ({ a, b } = obj);
// console.log(a, b);

// // Nested objets
// const {
//   fri: { open, close },
// } = openingHours;
// console.log(open, close);

// // Destructuring arrays
// // const arr = [2, 3, 4, 5];
// // const a = arr[0];
// // const b = arr[1];
// // const c = arr[2];

// // const [x, y, z] = arr;
// // console.log(x, y, z); // 2 3 4

// let [main, , secondary] = restaurant.categories;
// console.log(main, secondary);

// // Switching variables
// // const temp = main;
// // main = secondary;
// // secondary = temp;
// // console.log(main, secondary);

// [secondary, main] = [main, secondary];
// console.log(main, secondary);

// // Recieve 2 return values from a function
// const [starter, mainCourse] = restaurant.order(2, 0);
// console.log(starter, mainCourse);

// // Nested destructuring
// const nested = [2, 4, [5, 6]];
// // const [i, , j] = nested;
// const [i, , [j, k]] = nested;
// console.log(i, j, k);

// // Default values
// const [p = 1, q = 1, r = 1] = [8, 9];
// console.log(p, q, r);

// // Spread operator
// const arr = [7, 8, 9];
// const badNewArr = [1, 2, arr[0], arr[1], arr[2]];
// console.log(badNewArr);

// const newArray = [1, 2, ...arr];
// console.log(newArray);

// console.log(...newArray);

// const newMenu = [...restaurant.mainMenu, 'Gnocci'];
// console.log(newMenu);

// // Uses: Copy array
// const mainMenuCopy = [...restaurant.mainMenu];
// console.log(mainMenuCopy);

// // Join 2 arrays
// const joinMenu = [...restaurant.starterMenu, ...restaurant.mainMenu];
// console.log(joinMenu);

// // Iterables: arrays, strings, maps, sets. NOT objects
// const str = 'Alberto';
// const letters = [...str, ' ', 'S.'];
// console.log(letters);
// console.log(...str);
// // console.log(`${...str}`); // NONONO

// // Real-wordl example
// // const ingredients = [
// //   prompt("Let's make pasta! Ingrediente 1?: "),
// //   prompt("Let's make pasta! Ingrediente 2?: "),
// //   prompt("Let's make pasta! Ingrediente 3?: "),
// // ];
// // console.log(ingredients);

// // restaurant.orderPasta(...ingredients);

// // DESTRUCTURING
// // Spread in objetes
// const newRestaurant = { foundedIn: 1998, ...restaurant, founder: 'Giuseppe' };
// console.log(newRestaurant);

// const restaurantCopy = { ...restaurant };
// restaurantCopy.name = 'Ristorante Roma';
// console.log(restaurantCopy.name);
// console.log(restaurant.name);

// // SPREAD, becaouse on RIGHT side
// const arr2 = [1, 2, ...[3, 4]];
// console.log(arr2);

// // REST, becaouse on LEFT side
// const [s, d, ...others] = [1, 2, 3, 4, 5];
// console.log(s, d, others);

// const [pizza, , risotto, ...otherFood] = [
//   ...restaurant.mainMenu,
//   ...restaurant.starterMenu,
// ];
// console.log(pizza, risotto, otherFood);

// Objects
const { sat: saturday, ...restOpening } = { ...restaurant.openingHours };
console.log(saturday, restOpening);

// // FUNCTIONS
// const add = function (...args) {
//   let sum = 0;
//   for (let arg in args) {
//     sum += args[arg];
//   }
//   return console.log(sum);
// };

// add(2, 3);
// add(5, 3, 7, 2);
// add(8, 2, 5, 3, 2, 1, 4);

// const xes = [23, 5, 10, 7];
// add(...xes);

// restaurant.orderPizza('mushrooms', 'onion', 'olives', 'spinash');
// restaurant.orderPizza('pepperoni');

// // BOOLEANS
// console.log('------OR------');

// // Use ANY data type, return ANY data type, short-circuiting
// // Return the first truthy value
// console.log(3 || 'Jonas');
// console.log(0 || 'Alberto');
// console.log('' || 0);
// console.log(true || 0);
// console.log(undefined || null);
// console.log(undefined || 0 || '' || 'hello' || 23 || null);

// restaurant.numGuest = 0;
// // const guest1 = restaurant.numGuest ? restaurant.numGuest : 10;
// // console.log(guest1);
// const guest2 = restaurant.numGuest || 10;
// console.log(guest2);

// // Nullish coalising operator: null and undefined (NOT 0 or "")
// const guestCorrect = restaurant.numGuest ?? 10;
// console.log(guestCorrect);

// console.log('--------AND-------');
// console.log(0 && 'Jonas');
// console.log(7 && 'Jonas');

// console.log('Hello' && 23 && null && 'jonas');

// if (restaurant.orderPizza) {
//   restaurant.orderPizza('cheese', 'tomato');
// }

// restaurant.orderPizza && restaurant.orderPizza('olives', 'tune');

// // Logical asignement operators

// const rest1 = {
//   name: 'Capri',
//   numGuest: 20,
// };

// const rest2 = {
//   name: 'La Piazza',
//   owner: 'Giovanni Rossi',
// };

// // OR assignment operator
// rest2.numGuest = rest2.numGuest ?? 10;
// rest1.numGuest = rest1.numGuest ?? 10;
// console.log(rest1.numGuest);
// console.log(rest2.numGuest);

// // If variable (rest*.numGuest) dont exist assign the value
// rest1.numGuest ??= 10;
// rest2.numGuest ??= 10;
// console.log(rest1.numGuest);
// console.log(rest2.numGuest);

// rest2.owner = rest2.owner && '<ANONYMOUS';
// console.log(rest2.owner);

// // If variable (rest2.owner) exist assign the value
// rest2.owner &&= '<anonymous>';
// console.log(rest2.owner);

// FOR OF LOOP
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

for (const item of menu) console.log(item);

for (const [i, el] of menu.entries()) {
  console.log(`${i + 1}: ${el}`);
}

// SETS
const ordersSet = new Set([
  'Pasta',
  'Pizza',
  'Pizza',
  'Rissoto',
  'Pasta',
  'Pizza',
]);
console.log(ordersSet);
console.log(new Set('Jonas'));
console.log(ordersSet.size);
console.log(ordersSet.has('Pizza'));
console.log(ordersSet.has('Bred'));
ordersSet.add('Garlic Bread');
ordersSet.add('Garlic Bread');
ordersSet.delete('Rissoto');
// ordersSet.clear();
console.log(ordersSet);
for (const order of ordersSet) console.log(order);

// Example
const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];
const staffUnique = [...new Set(staff)];
console.log(new Set('josealbertodelgadorobles').size);
console.log(staffUnique);

// MAPS
const rest = new Map();
rest.set('name', 'Classico Italiano');
rest.set(1, 'Firenze, Itali');
rest.set(2, 'Lisbon, Portugal');
rest
  .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
  .set('open', 11)
  .set('close', 23)
  .set(true, 'We are open :D')
  .set(false, 'We are closed :(');
console.log(rest);
console.log(rest.get('name'));
console.log(rest.get(true));
console.log(rest.get(1));
const time = 21;
console.log(rest.get(time > rest.get(open) && time < rest.get(close)));
console.log(rest.has('categories'));
rest.delete(2);
console.log(rest);
console.log(rest.size);
// rest.clear();
const arr = [1, 2];
rest.set(arr, 'Test');
console.log(rest);
console.log(rest.get(arr));
rest.set(document.querySelector('h1'), 'Heading');
console.log(rest);

// MAP iteration
const question = new Map([
  ['question', 'What is the best programming language in the world?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'JavaScript'],
  ['correct', 3],
  [true, 'Correct'],
  [false, 'Try again'],
]);

// Convert object to map
const hoursMap = new Map(Object.entries(openingHours));
console.log(hoursMap);

// Quiz app
console.log(question.get('question'));

for (const [key, value] of question) {
  if (typeof key === 'number') console.log(`Answer ${key}: ${value}`);
}
// const answer = Number(prompt('Your answer: '));
// console.log(question.get(question.get('correct') === answer));

// Convert map to array
console.log([...question]);
console.log(...question.entries());
console.log(...question.keys());
console.log(...question.values());
