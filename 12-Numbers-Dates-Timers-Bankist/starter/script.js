'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [
    { value: 200, date: '2019-11-18T21:31:17.178Z' },
    { value: 455.23, date: '2019-12-23T07:42:02.383Z' },
    { value: -306.5, date: '2020-01-28T09:15:04.904Z' },
    { value: 25000, date: '2020-04-01T10:17:24.185Z' },
    { value: -642.21, date: '2023-04-29T14:11:59.604Z' },
    { value: -133.9, date: '2023-04-28T17:01:17.194Z' },
    { value: 79.97, date: '2023-04-27T09:17:17.929Z' },
    { value: 1300, date: '2023-04-26T10:51:36.790Z' },
  ],
  interestRate: 1.2, // %
  pin: 1111,
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [
    { value: 5000, date: '2019-11-01T13:15:33.035Z' },
    { value: 3400, date: '2019-11-30T09:48:16.867Z' },
    { value: -150, date: '2019-12-25T06:04:23.907Z' },
    { value: -790, date: '2020-01-25T14:18:46.235Z' },
    { value: -3210, date: '2020-02-05T16:33:06.386Z' },
    { value: -1000, date: '2020-04-10T14:43:26.374Z' },
    { value: 8500, date: '2020-06-25T18:49:59.371Z' },
    { value: -30, date: '2023-04-27T12:01:20.894Z' },
  ],
  interestRate: 1.5,
  pin: 2222,
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: 'Chigiro Nagata',
  movements: [
    { value: 5000, date: '2019-11-01T13:15:33.035Z' },
    { value: 3400, date: '2019-11-30T09:48:16.867Z' },
    { value: -150, date: '2019-12-25T06:04:23.907Z' },
    { value: -790, date: '2020-01-25T14:18:46.235Z' },
    { value: -3210, date: '2020-02-05T16:33:06.386Z' },
    { value: -1000, date: '2020-04-10T14:43:26.374Z' },
    { value: 8500, date: '2020-06-25T18:49:59.371Z' },
    { value: -30, date: '2023-04-27T12:01:20.894Z' },
  ],
  interestRate: 1.5,
  pin: 3333,
  currency: 'JPY',
  locale: 'ja-JP',
};

const accounts = [account1, account2, account3];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions

////////////////////////////////////////////////
// FORMATERS
/**
 * Format the date shown in the movements
 * @param {*} date
 * @param {*} locale
 * @returns
 */
const formatMovementDate = (date, locale) => {
  // Format Date String
  // console.log(date);

  const daysPassed = calcDaysPassed(date, new Date());
  // console.log(daysPassed);

  if (daysPassed < 1 && daysPassed >= 0) return 'Today';
  if (daysPassed >= 1 && daysPassed < 2) return `yesterday`;
  if (daysPassed >= 2 && daysPassed <= 4) return `${daysPassed} days ago`;

  // const day = `${date.getDate()}`.padStart(2, 0);
  // const month = `${date.getMonth() + 1}`.padStart(2, 0);
  // const year = date.getFullYear();
  // return `${day}/${month}/${year}`;
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  };
  return new Intl.DateTimeFormat(locale, options).format(date);
};

/**
 * Format number into locale string and currency
 * @param {*} locale
 * @param {*} number
 * @param {*} currency
 * @returns
 */
const formatCurrency = (locale, value, currency) => {
  const options = {
    // style: 'unit',
    // style: 'percent',
    style: 'currency',
    // unit: 'mile-per-hour',
    // unit: 'celsius',
    currency: currency,
    // useGrouping: false,
  };
  return new Intl.NumberFormat(locale, options).format(value);
};

/**
 * Format date to acc locale
 * @param {*} date
 * @param {*} locale
 * @returns
 */
const formatIntlDate = (date, locale) => {
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
    year: 'numeric',
    month: 'long',
    weekday: 'long',
  };
  // const locale = navigator.languaje;
  return new Intl.DateTimeFormat(locale, options).format(date);
};

////////////////////////////////////////////////////////////////
// UTILITIES

/**
 * Calculates the days passed between 2 different dates
 * @param {*} date1
 * @param {*} date2
 * @returns
 */
const calcDaysPassed = (date1, date2) =>
  Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

/**
 * Create the usernames for the accounts given the first letter of the name and last name of the user
 * @param {*} accs
 */
const createUsernames = function (accs) {
  accs.forEach(acc => {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

createUsernames(accounts);

/////////////////////////////////////////////////////////////////
// TIMER
/**
 * Creates a logout timer with time = x seconds
 * @returns timer = setInterval()
 */
const timerOut = () => {
  const tick = () => {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    labelTimer.textContent = `${min}:${sec}`;
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    }
    time--;
  };
  let time = 300;

  // Call the timer every second
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};

///////////////////////////////////////////////////////////////////////
// DISPLAYS

// MOVEMENTS
/**
 * Displays all the movements
 * @param {*} acc
 * @param {*} sorted
 */
const displayMovements = function (acc, sorted = false) {
  // Erase previous movements
  containerMovements.innerHTML = '';

  // Sort movements
  const movs = sorted
    ? acc.movements.slice().sort((a, b) => a.value - b.value)
    : acc.movements;

  // Check if deposit of withdrawal
  movs.forEach(function (movement, i) {
    const movementType = movement.value > 0 ? 'deposit' : 'withdrawal';
    const date = new Date(movement.date);
    const displayDate = formatMovementDate(date, currentAccount.locale);

    // Add the movement
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${movementType}">
      ${i + 1} ${movementType.toUpperCase()}
      </div>
      <div class="movements__date">
        ${displayDate}
      </div>
      <div class="movements__value">
      ${formatCurrency(acc.locale, movement.value.toFixed(2), acc.currency)}
      </div>
    </div> `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// SUMMARY
/**
 * Display summary for account
 * @param {*} account
 */
const calcDisplaySummary = account => {
  // Add every movement > 0
  const incomes = account.movements
    .filter(mov => mov.value > 0)
    .reduce((acc, inc) => acc + inc.value, 0);
  // Show incomes
  labelSumIn.textContent = `${formatCurrency(
    account.locale,
    incomes,
    account.currency
  )}`;

  // Add every movement < 0
  const outcomes = account.movements
    .filter(mov => mov.value < 0)
    .reduce((acc, inc) => acc + inc.value, 0);
  // Show outcomes
  labelSumOut.textContent = `${formatCurrency(
    account.locale,
    Math.abs(outcomes),
    account.currency
  )}`;

  // Calculate the interest based on incomes and interest rate
  const interest = account.movements
    .filter(mov => mov.value > 0)
    .reduce(
      (acc, dep) =>
        (dep.value * 1.2) / 100 > 1
          ? acc + (dep.value * account.interestRate) / 100
          : acc + 0,
      0
    );
  // Show the interest earned
  labelSumInterest.textContent = `${formatCurrency(
    account.locale,
    interest,
    account.currency
  )}`;
};

// CURRENT BALANCE
/**
 * Canculate the current balance of the user given his movements
 * @param {*} movements
 * @returns the sum of all his movements
 */
const calcDisplayBalance = account => {
  account.balance = account.movements.reduce(
    (acc, salary) => acc + salary.value,
    0
  );
  labelBalance.textContent = `${formatCurrency(
    account.locale,
    account.balance,
    account.currency
  )}`;
};
// UI
/**
 * Update the UI for acc
 * @param {*} acc
 */
const updateUI = acc => {
  displayMovements(acc);
  calcDisplayBalance(acc);
  calcDisplaySummary(acc);
};

/////////////////////////////////////////////////////////////////////
// EVENT HANDLERS
let currentAccount, timer;

/**
 * LOGIN button click event handler
 */
btnLogin.addEventListener('click', function (event) {
  // Prevent the reload behaviour in a form button
  event.preventDefault();

  // Get the username and pin from form
  const username = inputLoginUsername.value;
  const pin = +inputLoginPin.value;

  // Clear fields
  inputLoginUsername.value = inputLoginPin.value = '';

  // Get the account that match with de username
  currentAccount = accounts.find(acc => acc.username === username);
  inputLoginPin.blur();

  // Check if the pin is correct
  if (currentAccount?.pin === pin) {
    // Logout timer
    if (timer) clearInterval(timer);
    timer = timerOut();
    // Display UI and welcome message
    updateUI(currentAccount);
    // If not correct show an alert
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }.`;
    containerApp.style.opacity = 100;
    // Get current date
    const now = new Date();
    // Format and show current date string
    labelDate.textContent = formatIntlDate(now, currentAccount.locale);
    // Display all the data from the currentAccount
  } else {
    alert('Incorrect User or Password.');
  }
});

// TRANSFER button click event handler
/**
 * Transfer money from one account to another
 */
btnTransfer.addEventListener('click', event => {
  // Prevent the reload behaviour in a form button
  event.preventDefault();
  if (timer) clearInterval(timer);
  timer = timerOut();
  // Save data from form
  const transferTo = inputTransferTo.value;
  const amount = +inputTransferAmount.value;
  console.log(transferTo);

  // Find the account to transfer to
  const transferToAccount = accounts.find(
    account => account.username === transferTo
  );

  // let currentExchange = {
  //   "USD": 1,
  //   "EURO": 0.91,
  //   "JPY": 124.17,
  //   "GBP": 0.65,
  //   "BRL": 3.51,
  // }
  // Process the tranfer if the transferToAccount exist, the amount is greater than 0 and the amount is lesser than the balance
  if (
    transferToAccount?.username &&
    amount > 0 &&
    amount < currentAccount.balance &&
    transferToAccount.username !== currentAccount
  ) {
    setTimeout(() => {
      // Doing the transfer
      const movement = { value: -amount, date: new Date().toISOString() };
      currentAccount.movements.push(movement);

      // Add transfer date
      const movementTo = { value: amount, date: new Date().toISOString() };
      transferToAccount.movements.push(movementTo);

      updateUI(currentAccount);
    }, 3000);
  } else {
    alert('The account does not exist or the quantity is incorrect.');
    inputTransferTo.value = inputTransferAmount.value = '';
  }

  // Display changes in currentAccount and reset values
  inputTransferTo.value = inputTransferAmount.value = '';
});

// LOAN
/**
 * Request loan button event handler
 */
btnLoan.addEventListener('click', event => {
  event.preventDefault();
  if (timer) clearInterval(timer);
  timer = timerOut();
  const inputLoan = Math.floor(inputLoanAmount.value);
  console.log(inputLoan);
  console.log(currentAccount.movements);

  if (
    inputLoan > 0 &&
    currentAccount.movements.some(movement => movement.value >= inputLoan * 0.1)
  ) {
    setTimeout(() => {
      // Add movement
      console.log(new Date());
      const movement = { value: inputLoan, date: new Date().toISOString() };
      currentAccount.movements.push(movement);
      currentAccount.movements.forEach(movement => console.log(movement.date));

      // Update UI
      updateUI(currentAccount);
    }, 3000);
  } else {
    alert('Invalid amount.');
  }
  inputLoanAmount.value = '';
});

// DELETE ACCOUNT
/**
 * Close account button event handler
 */
btnClose.addEventListener('click', event => {
  event.preventDefault();
  if (timer) clearInterval(timer);
  timer = timerOut();
  // Variables
  const closeUser = inputCloseUsername.value;
  const closePin = +inputClosePin.value;

  // If user and pin given are eaquals to the currentAccount
  if (
    closeUser === currentAccount.username &&
    closePin === currentAccount.pin
  ) {
    // Find the account in the accounts array
    const index = accounts.findIndex(
      closeAccount => closeAccount.username === closeUser
    );
    // Alert the user
    alert(accounts[index].owner + ' account deleted.');
    // Delete the account from the accounts array
    accounts.splice(index, 1);
    // Hide UI
    containerApp.style.opacity = 0;
    // Show a message with incorrect data
  } else {
    alert('Incorrect username or pin.');
    inputCloseUsername.value = inputClosePin.value = '';
  }
});

// SORT
/**
 * Button listener to sort or unsort movements
 */
let sort = false;
btnSort.addEventListener('click', event => {
  event.preventDefault();
  displayMovements(currentAccount, !sort);
  sort = !sort;
  clearInterval(timer);
  timer = timerOut();
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
// // Convert to numbers
// console.log(+'23');
// console.log(+'23');

// // Parsing
// console.log(Number.parseInt('100.100x'));
// console.log(Number.parseFloat('2.5rem'));
// // console.log(parseFloat('2.5rem'));

// // Check is value is NaN
// console.log(Number.isNaN(Number.parseInt('c10')));
// console.log(Number.isNaN(Number.parseInt('10c')));
// console.log(Number.isNaN(+'234'));
// console.log(Number.isNaN(23 / 0));

// // Checking if value is number
// console.log(Number.isFinite('c10'));
// console.log(Number.isFinite(20));
// console.log(Number.isFinite('10c'));
// console.log(Number.isFinite(+'234'));
// console.log(Number.isFinite(23 / 0));

// // Check if value is integer
// console.log(Number.isInteger(23));
// console.log(Number.isInteger(23.0));
// console.log(Number.isInteger(23.7));

// // Math and rounding
// console.log(Math.sqrt(25));
// console.log(25 ** (1 / 2));
// console.log(8 ** (1 / 3));

// console.log(Math.max(5, 18, '23', 11, 2));
// console.log(Math.max(Number.parseFloat(5, 18, '23', 11, 2))); // NONONO

// console.log(Math.PI * Number.parseFloat('10px')) ** 2;

// console.log(Math.trunc(Math.random() * 6) + 1);

// const randomInt = (min, max) => Math.trunc(Math.random() * (max - min) + 1);
// // 0....1 => 0....(max - min) => min...max
// console.log(randomInt(1, 6));

// // Rounding integers
// console.log(Math.trunc(23.3)); // Remove decimal parts
// console.log(Math.round(23.5)); // Normal round
// console.log(Math.floor(23.8)); // Round always bottom
// console.log(Math.ceil(23.3)); // Round always up

// // Rounding decimals
// console.log((2.7899).toFixed(0)); // "3"
// console.log((2.7899).toFixed(5)); // "2.78990"

// //REMINDER operator (module)
// console.log(5 % 2);
// console.log(5 / 2); // 5 = 2 * 2 + 1

// const isEven = n => n % 2 === 0;
// console.log(isEven(10));
// console.log(isEven(11));

// // const allRows = () =>
// //   [...document.querySelectorAll('.movements__row')].forEach((row, i) => {
// //     if (isEven(i)) {
// //       row.style.backgroundColor = 'orangered';
// //       console.log(row.style.backgroundColor);
// //     }
// //   });

// document.querySelector('.balance__label').addEventListener('click', () => {
//   [...document.querySelectorAll('.movements__row')].forEach((row, i) => {
//     if (isEven(i)) {
//       row.style.backgroundColor = 'teal';
//     } else {
//       row.style.backgroundColor = 'lightblue';
//     }
//   });
// });

// // NUMERIC SEPARATORS
// const diameter = 287_460_000_000;
// console.log(diameter);

// const priceCents = 345_99;
// console.log(priceCents);

// const transferFee1 = 15_00;
// const transferFee2 = 1_500;
// console.log(transferFee1);
// console.log(transferFee2);

// console.log(Number('230_000')); // NaN

// // BIG NUMBERS
// console.log(2 ** 53 - 1);
// console.log(Number.MAX_SAFE_INTEGER);

// console.log(6491981869819168165131351651651651351651615n);
// console.log(BigInt(6491984984));

// // Operations
// console.log(10000n + 10000n);

// DATES AND TIMES
// Create a date
// const now = new Date();
// console.log(now);

// console.log(new Date('Tue Apr 25 2023 22:51:04'));
// console.log(new Date('December 24, 2015'));
// console.log(new Date(account1.movementsDates[0]));
// console.log(new Date(2037, 10, 19, 16, 23, 5));
// console.log(new Date(2037, 10, 33, 16, 23, 5));

// console.log(new Date(0));
// console.log(new Date(3 * 24 * 60 * 60 * 1000));

// Working with dates
// const future = new Date(2037, 10, 19, 16, 23);
// console.log(future);
// console.log(future.getFullYear());
// console.log(future.getMonth());
// console.log(future.getDate()); // Day
// console.log(future.getDay()); // Day of the week
// console.log(future.getHours());
// console.log(future.getMinutes());
// console.log(future.getSeconds());
// console.log(future.toISOString());
// console.log(future.getTime());

// console.log(new Date(2142256980000));
// console.log(Date.now());
// future.setFullYear(2040);
// console.log(future);

// // Operations with Dates
// const future = new Date(2037, 10, 19, 16, 23);
// // console.log(+future);

// const days1 = calcDaysPassed(new Date(2023, 3, 27), new Date(2023, 3, 28));
// // console.log(days1);

// const num = 38812398.123;

// const options = {
//   // style: 'unit',
//   // style: 'percent',
//   style: 'currency',
//   // unit: 'mile-per-hour',
//   // unit: 'celsius',
//   currency: 'EUR',
// };

// console.log(`US: `, new Intl.NumberFormat('en-US', options).format(num));
// console.log(`Germany: `, new Intl.NumberFormat('de-DE', options).format(num));
// console.log(`Syria: `, new Intl.NumberFormat('er-SY', options).format(num));
// console.log(
//   `Local: `,
//   new Intl.NumberFormat(navigator.languaje, options).format(num)
// );

// SETTIMEOUT
// ing1 = "olives"
// ing2 = "spinach"

// const ingredients = ['olives', ''];

// // Calling the timeout
// const pizzaTimer = setTimeout(
//   (ing1, ing2) => console.log(`Here is your pizza with ${ing1} and ${ing2}`),
//   3000,
//   ...ingredients
// );

// // Waiting message
// console.log('Waiting...');

// // To clear the 3000ms timeout b4 it ends
// if (ingredients.includes('spinach')) clearTimeout(pizzaTimer);

// //SETINTERVAL
// setInterval(() => {
//   const now = new Date();
//   const options = {
//     hour: 'numeric',
//     minute: 'numeric',
//     second: 'numeric',
//   };
//   console.log(Intl.DateTimeFormat(navigator.languaje, options).format(now));
// }, 1000);

/**
 * Set a countdown timer with format mm:ss given the seconds
 * @param {*} seconds
 */
// function timer(seconds) {
//   let time = seconds;
//   const timer = setInterval(() => {
//     // Divide the seconds by 60 to get the minutes
//     // Trunc with math to get only an integer
//     // Add a padStart of 2 filling with 0s the empty space
//     const min = String(Math.trunc(time / 60)).padStart(2, 0);
//     // Get the remainder using %
//     // Add a padStart of 2 filling with 0s like the minutes
//     const sec = String(time % 60).padStart(2, 0);
//     // Format the string
//     console.log(`${min}:${sec}`);
//     // Decrease 1 second
//     time--;
//     // Stop countdown
//     if (time === 0) clearInterval(timer);
//     // Set interval to 1000ms
//   }, 1000);
// }

// // Define any timer you want by calling the timer function with the seconds
// // 5 minutes
// const timer5 = timer(300);
// // 1 minute
// const timer1 = timer(60);
// timer5;
// timer1;
//
