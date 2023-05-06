'use strinct';
// Importing module
import './shoppingCart.js';
// import { addToCart, shippingCost } from './shoppingCart.js';
import * as ShoppingCart from './shoppingCart.js';
console.log('Importing module');
console.log(ShoppingCart.shippingCost);
ShoppingCart.addToCart('bread', 5);

import add from './shoppingCart.js';
