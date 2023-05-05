'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

// Old way
// const getCountryData = function (country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//     //   console.log(this.responseText);
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     const html = `
//   <article class="country">
//     <img class="country__img" src="${data.flags.svg}" />
//     <div class="country__data">
//         <h3 class="country__name">${data.name.common}</h3>
//         <h4 class="country__region">${data.region}</h4>
//         <p class="country__row"><span>👫</span>${(
//           +data.population / 1000000
//         ).toFixed(2)} million</p>
//         <p class="country__row"><span>🗣️</span>${data.languages.spa}</p>
//         <p class="country__row"><span>💰</span>${data.currencies.EUR.name}</p>
//     </div>
//   </article>
//   `;

//     countriesContainer.insertAdjacentHTML('beforeend', html);
//     countriesContainer.style.opacity = 1;
//   });
// };

// Qeue ajax

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  //   countriesContainer.style.opacity = 1;
};

// const requestCountry = function (code) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/alpha/${code}`);
//   request.send();
//   return request;
// };

// const getCountryAndNeighbour = function (country) {
//   // AJAX call country 1
//   const request = requestCountry(country);
//   request.addEventListener('load', function () {
//     //   console.log(this.responseText);
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     // Render country 1
//     renderCountry(data);

//     // Get nighbour country
//     const neighbours = [...data?.borders];

//     // Guard
//     if (!neighbours) return;

//     // Foreach neighbour render it
//     neighbours.forEach(neigh => {
//       const neighReq = requestCountry(neigh);
//       neighReq.addEventListener('load', function () {
//         const [neighData] = JSON.parse(this.responseText);
//         renderCountry(neighData, 'neighbour');
//       });
//     });
//   });
// };

// getCountryAndNeighbour('esp');

// const request = new XMLHttpRequest();
// request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
// request.send();

// MODERN WAY

// const getCountryData = function (country) {
//   // PROMISE and CONSUME PROMISE
//   const request = fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(function (response) {
//       console.log(response);
//       // Return another promise
//       return response.json();
//     })
//     // Handle second promise
//     .then(function (data) {
//       console.log(...data);
//       renderCountry(...data);
//     });
// };

// const getCountryData = function (country) {
//   // PROMISE and CONSUME PROMISE
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     // Promise from fetch
//     .then(response => response.json())
//     // Promise from json
//     .then(data => renderCountry(...data));
// };

// const getCountryData = function (country) {
//   // PROMISE and CONSUME PROMISE
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     // Promise from fetch
//     .then(response => response.json())
//     // Promise from json
//     .then(data => {
//       renderCountry(...data);
//       const [arrayData] = data;
//       const neighbours = arrayData?.borders;
//       if (!neighbours) return;
//       // Neighbours
//       return neighbours.forEach(neigh =>
//         fetch(`https://restcountries.com/v3.1/alpha/${neigh}`)
//           .then(response => response.json())
//           .then(data => {
//             // Render Neighbours
//             renderCountry(...data, 'neighbour');
//             const [moreArrayData] = data;
//             const moreNeighbours = moreArrayData?.borders;
//             if (!moreNeighbours) return;
//             // Neighbours of neighbours
//             return moreNeighbours.forEach(neigh =>
//               fetch(`https://restcountries.com/v3.1/alpha/${neigh}`)
//                 .then(response => response.json())
//                 // Render neighbours of neighbours
//                 .then(data => renderCountry(...data, 'neighbour'))
//             );
//           })
//       );
//     });
// };
// getCountryData('russia');

// const getJSON = function (url, errorMsg = 'Something went wrong') {
//   return fetch(url).then(response => {
//     if (!response.ok) throw new Error(`${errorMsg} ${response.status}`);
//     return response.json();
//   });
// };

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(response => {
//       console.log(response);
//       // Throw rejected promise error
//       if (!response.ok) throw new Error(`Country not found ${response.status}`);

//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);
//       const neighbour = data[0]?.borders[0];
//       if (!neighbour) return;
//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
//     })
//     .then(response => response.json())
//     .then(data => renderCountry(data[0], 'neighbour'))
//     // HANDLE ERRRRROOOOORRRRRRS
//     .catch(err => {
//       console.error(err);
//       renderError(`Something went wrong "${err.message}". Try again!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// const getCountryData = function (country) {
//   getJSON(
//     `https://restcountries.com/v3.1/name/${country}`,
//     'Country not found.'
//   )
//     .then(data => {
//       renderCountry(data[0]);
//       const neighbour = data[0]?.borders;

//       if (!neighbour) throw new Error('No neighbour found.');

//       getJSON(
//         `https://restcountries.com/v3.1/alpha/${neighbour}`,
//         'Country not found.'
//       ).then(data => renderCountry(data[0], 'neighbour'));
//     })
//     .catch(err => {
//       console.error(err);
//       renderError(`Something went wrong "${err.message}". Try again!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// btn.addEventListener('click', function () {
//   getCountryData('spain');
// });

// getCountryData('japan');

// Coding Challenge #1
// In this challenge you will build a function 'whereAmI' which renders a country
// only based on GPS coordinates. For that, you will use a second API to geocode
// coordinates. So in this challenge, you’ll use an API on your own for the first time 😁
// Your tasks:
// PART 1
// 1. Create a function 'whereAmI' which takes as inputs a latitude value ('lat')
// and a longitude value ('lng') (these are GPS coordinates, examples are in test
// data below).
// 2. Do “reverse geocoding” of the provided coordinates. Reverse geocoding means
// to convert coordinates to a meaningful location, like a city and country name.
// Use this API to do reverse geocoding: https://geocode.xyz/api. The AJAX call
// will be done to a URL with this format:
// https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and
// promises to get the data. Do not use the 'getJSON' function we created, that
// is cheating 😉
// 3. Once you have the data, take a look at it in the console to see all the attributes
// that you received about the provided location. Then, using this data, log a
// message like this to the console: “You are in Berlin, Germany”
// 4. Chain a .catch method to the end of the promise chain and log errors to the
// console
// 5. This API allows you to make only 3 requests per second. If you reload fast, you
// will get this error with code 403. This is an error with the request. Remember,
// fetch() does not reject the promise in this case. So create an error to reject
// the promise yourself, with a meaningful error message
// PART 2
// 6. Now it's time to use the received data to render a country. So take the relevant
// attribute from the geocoding API result, and plug it into the countries API that
// we have been using.
// 7. Render the country and catch any errors, just like we have done in the last
// lecture (you can even copy this code, no need to type the same code)
// The Complete JavaScript Course 31
// Test data:
// § Coordinates 1: 52.508, 13.381 (Latitude, Longitude)
// § Coordinates 2: 19.037, 72.873
// § Coordinates 3: -33.933, 18.474
// GOOD LUCK 😀

// 35501351181391641713x7132

// btn.addEventListener('click', function () {
//   getGPSData([-33.933, 18.474]);
// });

// console.log('Test start'); // First call stack
// setTimeout(() => console.log('0 sec timer'), 0); // Fifth callback qeue
// Promise.resolve('Resolved promise 1').then(res => console.log(res)); // Third microtask qeue
// Promise.resolve('Resolved promise 2').then(res => {
//   // Fourth microtask qeue
//   for (let i = 0; i < 10000000; i++) {}
//   console.log(res);
// });
// console.log('Test end'); // Second call stack

// CREATE PROMISES

// const lotteryPromise = new Promise(function (resolve, reject) {
//   console.log('Lottery draw is happening.');

//   setTimeout(function () {
//     if (Math.random() >= 0.5) {
//       resolve('You WIN.'); // then
//     } else {
//       reject(new Error('You LOSE.')); // catch
//     }
//   }, 2000);
// });

// // Consume promise
// lotteryPromise
//   .then(resolve => console.log(resolve)) // Catch resolve
//   .catch(err => console.error(err)); // Catch reject

// // Promisifying setTimeout
// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// wait(1)
//   .then(() => {
//     console.log('I waited for 1 second.');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('I waited for 2 seconds.');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('I waited for 3 seconds');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('I waited for 4 seconds');
//     return wait(1);
//   });

// Promise.resolve('abc').then(x => console.log(x));
// Promise.reject('abc').catch(x => console.error(x));

// console.log('Getting position:');

// // Creating a promise
// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     // navigator.geolocation.getCurrentPosition(
//     //   position => resolve(position), // Resolve
//     //   err => reject(err) // Reject
//     // );
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };
// const fetchJSON = function (url, error = 'Something went wrong.') {
//   return fetch(url).then(response => {
//     console.log(response);

//     if (!response.ok) throw new Error(error, response.status);
//     return response.json();
//   });
// };

// const getGPSData = function () {
//   getPosition()
//     .then(pos => {
//       const { latitude, longitude } = pos.coords;
//       return fetchJSON(
//         `https://geocode.xyz/${latitude},${longitude}?geoit=json&auth=35501351181391641713x7132`,
//         'GPS coordinates error.'
//       );
//     })
//     .then(data => {
//       if (!data.city || !data.country)
//         throw new Error('City or country not found, try again.');
//       console.log(`You are in ${data.city}, ${data.country}`);
//       return fetchJSON(
//         `https://restcountries.com/v3.1/name/${data.country}`,
//         'Country not found.'
//       ).then(data => {
//         if (!data) throw new Error('Data error.');
//         renderCountry(...data);
//       });
//     })
//     .catch(err => console.error(err))
//     .finally(() => (countriesContainer.style.opacity = 1));
// };

// Consuming a promise
// btn.addEventListener('click', getGPSData);

// CHALLENGE 2
// Coding Challenge #2
// For this challenge you will actually have to watch the video! Then, build the image
// loading functionality that I just showed you on the screen.
// Your tasks:
// Tasks are not super-descriptive this time, so that you can figure out some stuff by
// yourself. Pretend you're working on your own 😉
// PART 1
// 1. Create a function 'createImage' which receives 'imgPath' as an input.
// This function returns a promise which creates a new image (use
// document.createElement('img')) and sets the .src attribute to the
// provided image path
// 2. When the image is done loading, append it to the DOM element with the
// 'images' class, and resolve the promise. The fulfilled value should be the
// image element itself. In case there is an error loading the image (listen for
// the'error' event), reject the promise
// 3. If this part is too tricky for you, just watch the first part of the solution
// PART 2
// 4. Consume the promise using .then and also add an error handler
// 5. After the image has loaded, pause execution for 2 seconds using the 'wait'
// function we created earlier
// 6. After the 2 seconds have passed, hide the current image (set display CSS
// property to 'none'), and load a second image (Hint: Use the image element
// returned by the 'createImage' promise to hide the current image. You will
// need a global variable for that 😉)
// 7. After the second image has loaded, pause execution for 2 seconds again
// 8. After the 2 seconds have passed, hide the current image
// Test data: Images in the img folder. Test the error handler by passing a wrong
// image path. Set the network speed to “Fast 3G” in the dev tools Network tab,
// otherwise images load too fast
// GOOD LUCK 😀

// Creating a promise
// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     // navigator.geolocation.getCurrentPosition(
//     //   position => resolve(position), // Resolve
//     //   err => reject(err) // Reject
//     // );
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// wait(1)
//   .then(() => {
//     console.log('I waited for 1 second.');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('I waited for 2 seconds.');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('I waited for 3 seconds');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('I waited for 4 seconds');
//     return wait(1);
//   });

// const createImage = function (imgPath) {
//   return new Promise(function (resolve, reject) {
//     const img = document.createElement('img');
//     img.src = imgPath;
//     img.addEventListener('load', function () {
//       document.querySelector('.images').appendChild(img);
//       resolve(img);
//     });
//     img.addEventListener('error', function () {
//       reject(new Error('Image not found.'));
//     });
//   });
// };

// SIEMPRE SIEMPRE SIEMPRE RETURN DE LOS PROMISES
// EN UN THEN SIEMPRE HAY UN RETURN
// let currentImg;
// createImage('./img/img-1.jpg')
//   .then(img => {
//     currentImg = img;
//     console.log('Image 1 loaded.');
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//     return createImage('./img/img-2.jpg');
//   })
//   .then(img => {
//     currentImg = img;
//     console.log('Image 2 loaded.');
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//     return createImage('./img/img-3.jpg');
//   })
//   .then(img => {
//     currentImg = img;
//     console.log('Image 3 loaded.');
//     return wait(2);
//   })
//   .then(() => (currentImg.style.display = 'none'))
//   .catch(err => console.error(err));

// SYNC AWAIT
const renderCountry = function (data, className = '') {
  const [language] = Object.values(data.languages);
  const [currencie] = Object.values(data.currencies);

  const html = `
    <article class="country ${className}">
      <img class="country__img" src="${data.flags.svg}" />
      <div class="country__data">
          <h3 class="country__name">${data.name.common}</h3>
          <h4 class="country__region">${data.region}</h4>
          <p class="country__row"><span>👫</span>${(
            +data.population / 1000000
          ).toFixed(2)} million</p>
          <p class="country__row"><span>🗣️</span>${language}</p>
          <p class="country__row"><span>💰</span>${currencie.name}</p>
      </div>
    </article>
    `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position), // Resolve
    //   err => reject(err) // Reject
    // );
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};
const whereAmI = async function () {
  try {
    // Get position from promise
    const pos = await getPosition();

    // Destructure latitude and longitude
    const { latitude, longitude } = pos.coords;

    // Get resolve from promise
    const geoRes = await fetch(
      `https://geocode.xyz/${latitude},${longitude}?geoit=json&auth=35501351181391641713x7132`
    );

    // Throw error
    if (!geoRes.ok) throw new Error('Problem getting location data.');

    // Get data from resolve
    const geoData = await geoRes.json();

    // fetch(`https://restcountries.com/v3.1/name/${country}`).then(res =>
    //   console.log(res)
    // );
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${geoData.country}`
    );
    // Throw error
    if (!res.ok) throw new Error('Problem getting country data.');

    const data = await res.json();
    renderCountry(data[0]);

    // RETURN DATA FROM ASYNC FUNCTION
    return `You are in ${geoData.city}, ${geoData.country}`;
  } catch (err) {
    console.error(`====>${err}<====`);
    renderError(`Something went wrong ====>${err.message}<====`);

    // Reject promise returned from async function
    throw err;
  }
};

console.log('1: Will get location');
// console.log(whereAmI());
// whereAmI()
//   .then(city => console.log(`2: ${city}`))
//   .catch(err => console.error(`2: ${err.message}`))
//   .finally(() => console.log('3: Finished getting location'));

// RECIEVE DATA FROM ASYNC FUNCTION
// (async function () {
//   try {
//     const city = await whereAmI();
//     console.log(`2: ${city}`);
//   } catch (err) {
//     console.error(`2: ${err.message}`);
//   }
//   console.log('3: Finished getting location');
// })();

// console.log('3: Finished getting location');

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} ${response.status}`);
    return response.json();
  });
};
// const get3Countries = async function (c1, c2, c3) {
//   try {
//     // const [country1] = await getJSON(
//     //   `https://restcountries.com/v3.1/name/${c1}`
//     // );
//     // const [country2] = await getJSON(
//     //   `https://restcountries.com/v3.1/name/${c2}`
//     // );
//     // const [country3] = await getJSON(
//     //   `https://restcountries.com/v3.1/name/${c3}`
//     // );

//     const [[country1], [country2], [country3]] = await Promise.all([
//       getJSON(`https://restcountries.com/v3.1/name/${c1}`),
//       getJSON(`https://restcountries.com/v3.1/name/${c2}`),
//       getJSON(`https://restcountries.com/v3.1/name/${c3}`),
//     ]);
//     console.log(...country1.capital);
//     console.log(...country2.capital);
//     console.log(...country3.capital);
//     // console.log(allCountries);

//     // if (!allCountries) throw new Error('Error getting countries.');
//   } catch (err) {
//     console.log(err);
//   }
// };

// get3Countries('spain', 'germany', 'portugal');

// // Promise.race
// // Only the first promise, even the rejected
// (async function () {
//   const res = await Promise.race([
//     getJSON(`https://restcountries.com/v3.1/name/spain`),
//     getJSON(`https://restcountries.com/v3.1/name/germany`),
//     getJSON(`https://restcountries.com/v3.1/name/portugal`),
//   ]);
//   // console.log(res[0]);
// })();

// const timeout = function (sec) {
//   return new Promise(function (_, reject) {
//     setTimeout(function () {
//       reject(new Error('Request took too long!'));
//     }, sec * 1000);
//   });
// };

// // If the request is not fast enough the timeout wins the race
// // Promise.race([
// //   getJSON(`https://restcountries.com/v3.1/name/tanzania`),
// //   timeout(1),
// // ])
// //   .then(res => console.log(res[0]))
// //   .catch(err => console.error(err));

// // Promise.allSettled
// (async function () {
//   const res = await Promise.allSettled([
//     getJSON(`https://restcountries.com/v3.1/name/spain`),
//     getJSON(`https://restcountries.com/v3.1/name/germany`),
//     getJSON(`https://restcountries.com/v3.1/name/portugal`),
//   ]);
//   console.log(res);
// })();

// // Promise.any
// // First fulfill promise
// (async function () {
//   const res = await Promise.any([
//     getJSON(`https://restcountries.com/v3.1/name/spain`),
//     getJSON(`https://restcountries.com/v3.1/name/germany`),
//     getJSON(`https://restcountries.com/v3.1/name/portugal`),
//   ]);
//   console.log(res);
// })();

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;
    img.addEventListener('load', function () {
      document.querySelector('.images').appendChild(img);
      resolve(img);
    });
    img.addEventListener('error', function () {
      reject(new Error(`${imgPath} not found.`));
    });
  });
};

const loadNPause = async function () {
  try {
    let image = await createImage('./img/img-1.jpg');
    console.log(image);
    await wait(2);
    image.style.display = 'none';
    image = await createImage('./img/img-2.jpg');
    console.log(image);
    await wait(2);
    image.style.display = 'none';
    image = await createImage('./img/img-3.jpg');
    console.log(image);
    await wait(2);
    image.style.display = 'none';
  } catch (err) {
    console.error(err);
  }
};

// loadNPause();

const loadAll = async function (imgArr) {
  try {
    const imgs = imgArr.map(createImage); // map(img => createImage(img))
    console.log(imgs);
    const imgsData = await Promise.all(imgs);
    imgsData.forEach(img => img.classList.add('parallel'));
  } catch (err) {
    console.error(err);
  }
};

loadAll(['./img/img-1.jpg', './img/img-2.jpg', './img/img-3.jpg']);
