const airline = 'TAP Air Portugal';
const plane = 'A320';

// Index of a char or word or words or anything inside string
console.log(airline.indexOf('r'));
console.log(airline.lastIndexOf('r'));
console.log(airline.indexOf('Portugal'));

// slice(begin, end)
console.log(airline.slice(4, 7));
console.log(airline.split(' '));
console.log(airline.slice(0, airline.indexOf(' ')));
console.log(airline.slice(airline.lastIndexOf(' ')));
console.log(airline.slice(-1));
console.log(airline.slice(1, -1));

const checkMiddleSeat = function (seat) {
  // B and E are middle seats
  console.log(
    `${
      seat.includes('B') || seat.includes('E')
        ? 'You got the middle seat.'
        : 'You got lucky.'
    }`
  );
};

checkMiddleSeat('11B');
checkMiddleSeat('23C');
checkMiddleSeat('3E');

// toLowerCase, toUpperCase
console.log(airline.toLowerCase());
console.log(airline.toUpperCase());

// Fix capitalization in name
const passenger = 'jOnAS';

const capitalize = function (string) {
  const stringLower = string.toLowerCase();
  const stringCorrect = stringLower[0].toUpperCase() + stringLower.slice(1);
  return stringCorrect;
};
console.log(capitalize(passenger));

// Comparing emails TRIM quita espacios en blanco, saltos de linea, tabulaciones
const email = 'hello@jonas.io';
const loginEmail = '  Hello@Jonas.Io \n';
const correctEmail = loginEmail.trim().toLowerCase();
console.log(correctEmail);

// Replacing
const priceGB = '288,97€';
const priceUS = priceGB.replace('€', '$').replace(',', '.');
console.log(priceUS);

const annuncement =
  'All passengers come to boarding door 23. Boarding door 23!';
console.log(annuncement.replaceAll('door', 'gate'));

const checkBaggage = function (items) {
  const forbidden = ['gun', 'knife'];
  //   return items.includes(item);
  for (const item of forbidden) {
    return console.log(items.includes(item) ? true : false);
  }
};

checkBaggage('I have a laptop, some food and a pocket knife');
checkBaggage('Socks and camera');
checkBaggage('Got some snacks and a gun for protection');
