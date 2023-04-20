'use strict';

function calcAge(birthYear) {
  // Local scope
  const age = 2023 - birthYear;
  // console.log(firstName);

  function printAge() {
    // Chain scope
    let output = `${firstName}, You are ${age}, born in ${birthYear}`;
    console.log(output);

    if (birthYear >= 1981 && birthYear <= 1996) {
      // Var is not block scoped
      var millenial = true;
      // Black scope, scope chain is not neccesary
      // Creating NEW variable with same name as outer scopes variable
      const firstName = 'Steven';
      // Block scope
      var str = `Oh, and you are a millenial, ${firstName}`;
      console.log(str);

      function add(a, b) {
        return a + b;
      }
      // Redefined variable that we have access to
      output = 'NEW OUTPUT';
      // New variable with the same name
      // const output = 'NEW OUTPUT';
    }
    // Error str is block scope
    // console.log(str);
    // You can reasign becaouse millenial is a var declaration
    // millenial = false;
    console.log(millenial);
    // Not defined, inside if block scope
    // add(2, 3);
    console.log(output);
  }
  printAge();
  return age;
}

// Global scope
const firstName = 'Alberto';

calcAge(1984);
// console.log(age);
// printAge();
