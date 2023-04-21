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
