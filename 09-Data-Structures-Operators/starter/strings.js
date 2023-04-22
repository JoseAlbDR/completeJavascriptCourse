'use strict';
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

const hideNumbers = function (number) {
  const str = number + '';
  const last = str.slice(-4);
  console.log(last.padStart(str.length, '*'));
};

hideNumbers(4872548789603215);

const message2 = 'Bad weather... All Departures Delayed...';
console.log(message2.repeat(2));

// Challenge 4
document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

const textArea = document.querySelector('textarea');
const button = document.querySelector('button');
const check = '✅';
button.addEventListener('click', () => {
  // Save the text area content
  // Split with \n
  const words = textArea.value.toLowerCase().split('\n');
  // For each word, split with "_"
  let i = 0;
  words.forEach(word => {
    i++;
    // save first word in a variable
    if (word.endsWith('_')) word = word.slice(0, -1);
    if (word.indexOf('_') !== -1) {
      const camelCase = word.split('_');
      let camel = camelCase.shift().toLowerCase().trim();
      for (const n of camelCase) {
        camel += n.trim().replace(n[0], n[0].toUpperCase());
        console.log(`${camel.padEnd(20)}${check.repeat(i)}`);
      }
    } else {
      console.log('Cant convert word.');
    }
  });
});

const flights1 =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

const splitFlights = flights1.replaceAll('_', ' ').trim().split('+');

for (const f of splitFlights) {
  const [departure, origin, destiny, hour] = [...f.split(';')];
  console.log(
    `${departure} from ${origin.toUpperCase().slice(0, 3)} to ${destiny
      .toUpperCase()
      .slice(0, 3)} (${hour.replace(':', 'h')})`.padStart(41)
  );
}
