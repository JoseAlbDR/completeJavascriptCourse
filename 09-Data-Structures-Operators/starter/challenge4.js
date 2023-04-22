'use strict';

// Coding Challenge #4
// Write a program that receives a list of variable names written in underscore_case
// and convert them to camelCase.
// The input will come from a textarea inserted into the DOM (see code below to
// insert the elements), and conversion will happen when the button is pressed.
// Test data (pasted to textarea, including spaces):
// underscore_case
// first_name
// Some_Variable
//  calculate_AGE
// delayed_departure
// Should produce this output (5 separate console.log outputs):
// underscoreCase ✅
// firstName ✅✅
// someVariable ✅✅✅
// calculateAge ✅✅✅✅
// delayedDeparture ✅✅✅✅✅
// Hints:
// § Remember which character defines a new line in the textarea �
// § The solution only needs to work for a variable made out of 2 words, like a_b
// § Start without worrying about the ✅. Tackle that only after you have the variable
// name conversion working �
// § This challenge is difficult on purpose, so start watching the solution in case
// you're stuck. Then pause and continue!
// Afterwards, test with your own test data!
// GOOD LUCK �
//  document.body.append(document.creat

document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

const textArea = document.querySelector('textarea');
const button = document.querySelector('button');

button.addEventListener('click', function () {
  const words = textArea.value.split('\n');
  words.forEach(word => {
    let camelCase = '';
    const normaliced = word.toLowerCase().trim().split('_');
    camelCase += normaliced.shift();
    for (const n of normaliced) {
      camelCase += n[0].toUpperCase() + n.slice(1);
    }
    console.log(camelCase);
  });
});

// const textArea = document.querySelector('textarea');
// const button = document.querySelector('button');

// button.addEventListener('click', function () {
//   let check = '✅';
//   const words = textArea.value.toLowerCase().split('\n');
//   const normalicedText = [];
//   let nWord = [];
//   for (const word of words) {
//     nWord = word.split('');
//     while (nWord.indexOf('_') !== -1) {
//       let index = nWord.indexOf('_');
//       nWord.splice(index, 1);
//       if (index !== nWord.length) nWord[index] = nWord[index].toUpperCase();
//     }
//     normalicedText.push(nWord.join().replaceAll(',', '').trim());
//   }
//   normalicedText.forEach(function (word) {
//     console.log(word + check);
//     check += '✅';
//   });
// });

// console.log(normalicedText);

// const normalicedText = textArea.value.toLowerCase().split('\n');
// let check = '✅';
// for (let word of normalicedText) {
//   if (word.endsWith('_')) word = word.slice(0, -1);
//   const nWord = word.split('_');
//   let camelCase = nWord.shift();
//   for (const i in nWord) {
//     camelCase += nWord[i][0].toUpperCase() + nWord[i].slice(1);
//   }
//   console.log(`${camelCase.trim()} ${check}`);
//   check += '✅';
// }
// });
