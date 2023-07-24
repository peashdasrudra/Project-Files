// index.js
const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');

search.addEventListener('click', () => {
  const APIKey = 'e35a2dd1fca0e0c9832e24f5939ea1f6';
  const city = document.querySelector('.search-box input').value;

  if (city === '') return;

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
    .then(response => response.json())
    .then(json => {
      const latitude = json.coord.lat;
      const longitude = json.coord.lon;
      getWeatherByCoords(latitude, longitude);
    });
});
