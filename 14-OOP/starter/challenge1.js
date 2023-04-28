'use strict';
// Coding Challenge #1
// Your tasks:
// 1. Use a constructor function to implement a 'Car'. A car has a 'make' and a
// 'speed' property. The 'speed' property is the current speed of the car in
// km/h
// 2. Implement an 'accelerate' method that will increase the car's speed by 10,
// and log the new speed to the console
// 3. Implement a 'brake' method that will decrease the car's speed by 5, and log
// the new speed to the console
// 4. Create 2 'Car' objects and experiment with calling 'accelerate' and
// 'brake' multiple times on each of them
// Test data:
// § Data car 1: 'BMW' going at 120 km/h
// § Data car 2: 'Mercedes' going at 95 km/h
// GOOD LUCK 😀

class Car {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  toKmh(speed) {
    return Intl.NumberFormat(navigator.languaje, {
      style: 'unit',
      unit: 'kilometer-per-hour',
    }).format(speed);
  }

  accelerate() {
    this.speed += 10;
  }

  break() {
    this.speed -= 10;
  }
}

Car.prototype.getSpeed = function () {
  return this.toKmh(this.speed);
};

const bmw = new Car('BMW', 120);
const merce = new Car('Mercedes', 95);

bmw.accelerate();
console.log(bmw.getSpeed());

merce.break();
console.log(merce.getSpeed());
