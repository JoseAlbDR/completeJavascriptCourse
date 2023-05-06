// 'use strinct';
// // Importing module
// import './shoppingCart.js';
// // import { addToCart, shippingCost } from './shoppingCart.js';
import * as ShoppingCart from './shoppingCart.js';
// console.log('Importing module');
// console.log(ShoppingCart.shippingCost);
// ShoppingCart.addToCart('bread', 5);

// // Default
// import add from './shoppingCart.js';

// TOP LEVEL AWAIT IN MODULES
// Block the execution of the script not ASYNC
// const res = await fetch('https://jsonplaceholder.typicode.com/posts');
// const data = await res.json();
// console.log(data);

// // REAL LIVE SITUATION
// const getLastPost = async function () {
//   const res = await fetch('https://jsonplaceholder.typicode.com/posts');
//   const data = await res.json();
//   console.log(data);
//   return { title: data.at(-1).title, text: data.at(-1).body };
// };

// // lastPost.then(last => console.log(last));
// const lastPost = await getLastPost();
// console.log(lastPost);

// MODULE PATRON
// Create a new scope and return data one time
// const ShoppingCart2 = (function () {
//   const cart = [];
//   // Private
//   const shippingCost = 10;
//   const totalPrice = 237;
//   const totalQuantity = 23;

//   const addToCart = function (product, quantity) {
//     cart.push(product, quantity);
//     console.log(`${quantity} ${product} added to cart.`);
//     console.log(cart);
//   };

//   const oderStock = function (product, quantity) {
//     cart.push(product, quantity);
//     console.log(`${quantity} ${product} ordered from supplier.`);
//   };

//   // Public
//   return {
//     addToCart,
//     cart,
//     totalPrice,
//     totalQuantity,
//   };
// })();

// ShoppingCart2.addToCart('apple', 4);
// ShoppingCart2.addToCart('pizza', 2);
// console.log(ShoppingCart2);
