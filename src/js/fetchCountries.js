const API_KEY = 'https://restcountries.com';

export default function fetchCountries(name) {
  return fetch(
    `${API_KEY}/v3.1/name/${name}?fields=name.official,capital,population,flags.svg,languages`
  )
    .then(response => {
      return response.json();
    })
    .then(country => {
      console.log(country);
    })
    .catch(err => {
      console.log(err);
    });
}
