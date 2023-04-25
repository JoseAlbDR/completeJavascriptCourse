'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  transferFrom: {},
  transferTo: {},

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  transferFrom: {},
  transferTo: {},

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

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

const displayMovements = function (movements, sorted = false) {
  // console.log(movements);

  containerMovements.innerHTML = '';

  const movs = sorted ? movements.slice().sort((a, b) => a - b) : movements;
  movs.forEach(function (movement, i) {
    const movementType = movement > 0 ? 'deposit' : 'withdrawal';
    const html = `
    
    <a href="#" class="movements__row">
    
          <div class="movements__type movements__type--${movementType}">${
      i + 1
    } ${movementType.toUpperCase()}</div>
          <div class="movements__value">${movement.toFixed(2)}€</div>
         
        </a>
      
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
// displayMovements(account1.movements);

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
// accounts.forEach(acc => console.log(acc.username));

/**
 * Canculate the current balance of the user given his movements
 * @param {*} movements
 * @returns the sum of all his movements
 */
const calcDisplayBalance = account => {
  account.balance = account.movements.reduce((acc, salary) => acc + salary, 0);
  labelBalance.textContent = `${account.balance.toFixed(2)} EUR`;
};

// calcDisplayBalance(account1.movements);

const calcDisplaySummary = account => {
  const incomes = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, inc) => acc + inc, 0);
  labelSumIn.textContent = `${incomes.toFixed(2)}€`;

  const outcomes = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, inc) => acc + inc, 0);
  labelSumOut.textContent = `${Math.abs(outcomes.toFixed(2))}€`;

  const interest = account.movements
    .filter(mov => mov > 0)
    .reduce(
      (acc, dep) =>
        (dep * 1.2) / 100 > 1
          ? acc + (dep * account.interestRate) / 100
          : acc + 0,
      0
    );

  labelSumInterest.textContent = `${interest.toFixed(2)}€`;
};

// calcDisplaySummary(account1.movements);
let currentAccount;
const updateUI = acc => {
  displayMovements(acc.movements);
  calcDisplayBalance(acc);
  calcDisplaySummary(acc);
};

/**
 * Behaviour of login button
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
    // Display UI and welcome message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }.`;
    containerApp.style.opacity = 100;

    // Display all the data from the currentAccount
    updateUI(currentAccount);
    // If not correct show an alert
  } else {
    alert('Incorrect User or Password.');
  }
});

/**
 * Transfer money from one account to another
 */
btnTransfer.addEventListener('click', event => {
  // Prevent the reload behaviour in a form button
  event.preventDefault();

  // Save data from form
  const transferTo = inputTransferTo.value;
  const amount = +inputTransferAmount.value;
  console.log(transferTo);

  // Find the account to transfer to
  const transferToAccount = accounts.find(
    account => account.username === transferTo
  );

  // Process the tranfer if the transferToAccount exist, the amount is greater than 0 and the amount is lesser than the balance
  if (
    transferToAccount?.username &&
    amount > 0 &&
    amount < currentAccount.balance &&
    transferToAccount.username !== currentAccount
  ) {
    currentAccount.movements.push(-amount);
    transferToAccount.movements.push(amount);
    currentAccount.transferTo[transferToAccount.username] = amount;
    transferToAccount.transferFrom[currentAccount.username] = amount;
  } else {
    alert('The account does not exist or the quantity is incorrect.');
    inputTransferTo.value = inputTransferAmount.value = '';
  }

  // Display changes in currentAccount and reset values
  updateUI(currentAccount);
  inputTransferTo.value = inputTransferAmount.value = '';
});

/**
 * Request loan funcionallity
 */
btnLoan.addEventListener('click', event => {
  event.preventDefault();
  const inputLoan = +inputLoanAmount.value;
  if (
    inputLoan > 0 &&
    currentAccount.movements.some(amount => amount >= inputLoan * 0.1)
  ) {
    currentAccount.movements.push(inputLoan);
    updateUI(currentAccount);
  } else {
    alert('Invalid amount.');
    currentAccount.movements.push(inputLoan);
  }
  inputLoanAmount.value = '';
});

/**
 * Detele one account
 */
btnClose.addEventListener('click', event => {
  event.preventDefault();

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

/**
 * Button listener to sort or unsort movements
 */
let sort = false;
btnSort.addEventListener('click', event => {
  event.preventDefault();
  displayMovements(currentAccount.movements, !sort);
  sort = !sort;
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

// Math and rounding
