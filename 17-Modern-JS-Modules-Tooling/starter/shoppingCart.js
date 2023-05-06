// Exporting module

console.log('Exporting Module.');

// Bocking code
// console.log('Start fetching users.');
// await fetch('https://jsonplaceholder.typicode.com/users');
// console.log('Finish fetching users.');

const shippingCost = 10;
const cart = [];

const addToCart = function (product, quantity) {
  cart.push(product, quantity);
  console.log(`${quantity} ${product} added to cart.`);
  console.log(cart);
};

export { shippingCost, cart, addToCart };
export default function (product, quantity) {
  cart.push(product, quantity);
  console.log(`${quantity} ${product} added to cart.`);
  console.log(cart);
}
