'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
// const account5 = {
//   owner: 'Jose Alberto Delgado Robles',
//   movements: [2000, -450, -400, 2000, -450, -400, 200, 15000],
//   interestRate: 1.2, // %
//   pin: 2005,
//   transferTo: {},
//   transferFrom: {},
// };

// const account6 = {
//   owner: 'Matilde Antelo Lopez',
//   movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
//   interestRate: 1.5,
//   pin: 2222,
//   transferTo: {},
//   transferFrom: {},
// };

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

const accounts = [account1, account2, account3, account4, account5, account6];

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

/**
 * Display the last movements of the current user
 * @param {*} movements
 */
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
          <div class="movements__value">${movement}€</div>
         
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
  labelBalance.textContent = `${account.balance} EUR`;
};

// calcDisplayBalance(account1.movements);

const calcDisplaySummary = account => {
  const incomes = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, inc) => acc + inc, 0);
  labelSumIn.textContent = `${incomes}€`;

  const outcomes = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, inc) => acc + inc, 0);
  labelSumOut.textContent = `${Math.abs(outcomes)}€`;

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
  const pin = Number(inputLoginPin.value);

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
  const amount = Number(inputTransferAmount.value);
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
  const inputLoan = Number(inputLoanAmount.value);
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
  const closePin = Number(inputClosePin.value);

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

// // Move the movements to one array
// const accountMovements = accounts.map(acc => acc.movements);
// // Merge all the movements
// const allMovements = accountMovements.flat();
// const overallBalance = allMovements.reduce((acc, mov) => acc + mov, 0);

// // Flat
// const overalBalance = accounts
//   .map(acc => acc.movements)
//   .flat()
//   .reduce((acc, mov) => acc + mov, 0);

// console.log(overalBalance);

// // FlatMap flat plus map in one go
// const overalBalance2 = accounts
//   .flatMap(acc => acc.movements)
//   .reduce((acc, mov) => acc + mov, 0);
// console.log(overalBalance2);

// labelBalance.addEventListener('click', () => {
//   const movementsUI = Array.from(
//     document.querySelectorAll('.movements__value'),
//     value => Number(value.textContent.replace('€', ''))
//   );
//   console.log(movementsUI);
// });

// ¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡ IMPORTANT !!!!!!!!!!!!!!!!
// IMAGE IN DIRECTORY
