const apiKey = '464d0ceafa6e8cfd1a924f19d6cbffd9';
function getWeatherByLocation() {
  const location = document.getElementById('locationInput').value;
  if (location) {
    fetchWeatherData(location);
  } else {
    alert('Please enter a location');
  }
}

function fetchWeatherData(location) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(data => displayWeatherData(data))
    .catch(error => console.error('Error fetching the weather data:', error));
}

function displayWeatherData(data) {
  const weatherDataDiv = document.getElementById('weatherData');
  if (data.cod === 200) {
    const weatherDescription = data.weather[0].description;
    const temperature = data.main.temp;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;

    weatherDataDiv.innerHTML = `
      <p><strong>Location:</strong> ${data.name}</p>
      <p><strong>Weather:</strong> ${weatherDescription}</p>
      <p><strong>Temperature:</strong> ${temperature}°C</p>
      <p><strong>Humidity:</strong> ${humidity}%</p>
      <p><strong>Wind Speed:</strong> ${windSpeed} m/s</p>
    `;
  } else {
    weatherDataDiv.innerHTML = `<p>Weather data not available for the entered location.</p>`;
  }
}

function getWeatherByUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => displayWeatherData(data))
        .catch(error => console.error('Error fetching the weather data:', error));
    });
  } else {
    alert('Geolocation is not supported by this browser.');
  }
}

