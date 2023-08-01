const container = document.querySelector('.container');
const searchInput = document.querySelector('.search-box input');
const searchButton = document.querySelector('.search-box button');

function searchWeather() {
  const APIKey = 'e35a2dd1fca0e0c9832e24f5939ea1f6';
  const city = searchInput.value;

  if (city === '') return;

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
    .then(response => response.json())
    .then(json => {
      if (json.cod === "404") {
        const weatherBox = document.querySelector('.weather-box');
        const weatherDetails = document.querySelector('.weather-details');
        const error404 = document.querySelector('.not-found');

        container.style.height = '400px';
        weatherBox.style.display = 'none';
        weatherDetails.style.display = 'none';
        error404.style.display = 'block';
        error404.classList.add('fadeIn');

        // Clear the input field
        searchInput.value = '';

        return;
      }

      const error404 = document.querySelector('.not-found');
      error404.style.display = 'none';
      error404.classList.remove('fadeIn');

      const latitude = json.coord.lat;
      const longitude = json.coord.lon;
      getWeatherByCoords(latitude, longitude);
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
    });
}

searchButton.addEventListener('click', searchWeather);

searchInput.addEventListener('keypress', event => {
  if (event.key === 'Enter') {
    searchWeather();
  }
});
