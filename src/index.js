import Notiflix from 'notiflix';
import './css/styles.css';

import fetchCountries from './js/fetchCountries';

const inputEl = document.getElementById('search-box');
const listEl = document.querySelector('.country-list');
const infoBox = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;

inputEl.addEventListener('input', searchCountry);

function searchCountry(e) {
  const res = e.target.value;

  fetchCountries(res);
}
