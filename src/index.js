import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import './css/styles.css';

import fetchCountries from './js/fetchCountries';

const inputEl = document.getElementById('search-box');
const listEl = document.querySelector('.country-list');
const infoBox = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;

inputEl.addEventListener('input', debounce(searchCountry, DEBOUNCE_DELAY));

function searchCountry(e) {
  const inputValue = e.target.value.trim();

  if (inputValue === '') {
    return;
  }

  fetchCountries(inputValue).then(createCountryList);
}

function createCountryList(countries) {
  const markupCountriesList = countries
    .map(
      ({ name, flags }) =>
        `<li class="country"><img src="${flags.svg}"
      alt="Flag of ${name.official}" />
      <h1>${name.official}</h1></li>`
    )
    .join('');

  console.log(markupCountriesList);
}
