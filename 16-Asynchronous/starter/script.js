'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

// Old way
const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    //   console.log(this.responseText);
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    const html = `
  <article class="country">
    <img class="country__img" src="${data.flags.svg}" />
    <div class="country__data">
        <h3 class="country__name">${data.name.common}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +data.population / 1000000
        ).toFixed(2)} million</p>
        <p class="country__row"><span>🗣️</span>${data.languages.spa}</p>
        <p class="country__row"><span>💰</span>${data.currencies.EUR.name}</p>
    </div>
  </article>
  `;

    countriesContainer.insertAdjacentHTML('afterbegin', html);
    countriesContainer.style.opacity = 1;
  });
};

getCountryData('spain');
getCountryData('portugal');
getCountryData('andorra');
