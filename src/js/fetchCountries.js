const API_KEY = 'https://restcountries.com';

export default function fetchCountries(name) {
  return fetch(
    `${API_KEY}/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  ).then(response => {
    return response.json();
  });
}
