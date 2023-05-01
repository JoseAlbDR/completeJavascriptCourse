'use strict';
// Coding Challenge #2
// Your tasks:
// 1. Re-create Challenge #1, but this time using an ES6 class (call it 'CarCl')
// 2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide
// by 1.6)
// 3. Add a setter called 'speedUS' which sets the current speed in mi/h (but
// converts it to km/h before storing the value, by multiplying the input by 1.6)
// 4. Create a new car and experiment with the 'accelerate' and 'brake'
// methods, and with the getter and setter.
// Test data:
// § Data car 1: 'Ford' going at 120 km/h
// GOOD LUCK 😀

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    console.log(`From ${this.speed}km/h to ${this.speed + 10}km/h.`);
    this.speed += 10;
  }

  brake() {
    console.log(`From ${this.speed}km/h to ${this.speed - 10}km/h`);
    this.speed += 10;
  }

  get speedUs() {
    return this.speed / 1.6;
  }

  set speedUs(speed) {
    this.speed = speed * 1.6;
  }
}

const mondeo = new CarCl('Ford', 180);
mondeo.accelerate();

console.log(mondeo);
console.log(mondeo.speedUs);
mondeo.speedUs = 50;
console.log(mondeo.speed);
console.log(mondeo.speedUs);
