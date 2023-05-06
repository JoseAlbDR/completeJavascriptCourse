// Exporting module

console.log('Exporting Module.');

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
