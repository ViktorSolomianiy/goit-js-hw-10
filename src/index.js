import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';
import './css/styles.css';

import fetchCountries from './js/fetchCountries';

const inputEl = document.getElementById('search-box');
const listEl = document.querySelector('.country-list');
const infoBox = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;

inputEl.addEventListener('input', debounce(searchCountry, DEBOUNCE_DELAY));

function searchCountry(e) {
  const inputValue = e.target.value.trim();

  setTimeout(() => {
    if (inputValue.length === 1) {
      Notify.info('Too many matches found. Please enter a more specific name.');
    } else if (inputValue === '') {
      listEl.innerHTML = '';
    }
  }, 1000);

  fetchCountries(inputValue)
    .then(createCountryList)
    .catch(err => {
      Notify.failure('Oops, there is no country with that name');
    });
}

function createCountryList(countries) {
  const markupCountriesList = countries
    .map(
      ({ name, flags }) =>
        `<li class="country">
          <img src="${flags.svg}" alt="Flag of ${name.official}"/>
          <h1>${name.official}</h1>
        </li>`
    )
    .join('');
  listEl.innerHTML = markupCountriesList;

  if (countries.length === 1) {
    const bigImg = document.querySelector('.country');
    bigImg.classList.add('only-country');

    const markupCountriesInfo = countries
      .map(
        ({ capital, population, languages }) => `
    <p>Capital: ${capital}</p>
    <p>Population: ${population}</p>
    <p>Languages: ${Object.values(languages)}</p>
    `
      )
      .join('');

    infoBox.innerHTML = markupCountriesInfo;

    return;
  }
  infoBox.innerHTML = '';
}

// function createCountryInfo(countries) {
//   const markupCountriesInfo = countries.map(
//     ({ name, capital, population, flags, languages }) => {
//       `<ul><li>Capital: ${capital}</li></ul>`;
//     }
//   );

//   infoBox.insertAdjacentHTML('beforeend', markupCountriesInfo);
// }
