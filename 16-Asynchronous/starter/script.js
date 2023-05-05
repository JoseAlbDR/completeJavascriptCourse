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

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} ${response.status}`);
    return response.json();
  });
};

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
  //   countriesContainer.style.opacity = 1;
};

const getCountryData = function (country) {
  getJSON(
    `https://restcountries.com/v3.1/name/${country}`,
    'Country not found.'
  )
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0]?.borders;

      if (!neighbour) throw new Error('No neighbour found.');

      getJSON(
        `https://restcountries.com/v3.1/alpha/${neighbour}`,
        'Country not found.'
      ).then(data => renderCountry(data[0], 'neighbour'));
    })
    .catch(err => {
      console.error(err);
      renderError(`Something went wrong "${err.message}". Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

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

const fetchJSON = function (url, error = 'Something went wrong.') {
  return fetch(url).then(response => {
    console.log(response);

    if (!response.ok) throw new Error(error, response.status);
    return response.json();
  });
};
// 35501351181391641713x7132
const getGPSData = function (gps) {
  return fetchJSON(
    `https://geocode.xyz/${gps}?geoit=json&auth=35501351181391641713x7132`,
    'GPS coordinates error.'
  )
    .then(data => {
      if (!data.city || !data.country)
        throw new Error('City or country not found, try again.');
      console.log(`You are in ${data.city}, ${data.country}`);
      return fetchJSON(
        `https://restcountries.com/v3.1/name/${data.country}`,
        'Country not found.'
      ).then(data => {
        if (!data) throw new Error('Data error.');
        renderCountry(...data);
      });
    })
    .catch(err => console.error(err));
  // .finally(() => (countriesContainer.style.opacity = 1));
};

btn.addEventListener('click', function () {
  getGPSData([-33.933, 18.474]);
});
