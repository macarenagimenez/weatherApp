function date() {
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let currentTime = document.querySelector("#date");

  currentTime.innerHTML = `${day}, ${hours}:${minutes}hr.`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 4) {
      forecastHTML =
        forecastHTML +
        `
           <div class="week-days col-2">
              <p class="weather-forecaste-date">${formatDay(forecastDay.dt)}</p>
            
              <img
                class="icon"
                id="icon"
                src="https://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png"
              />
              <div class="weather-forecast-temperature">
                <span class="weather-forecast-temperature-max">${Math.round(
                  forecastDay.temp.max
                )}</span> <span>-<span>
                <span class="weather-forecast-temperature-min">${Math.round(
                  forecastDay.temp.min
                )}</span>
              </div>
            </div>
          `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

function searchCityWeather(city) {
  let apiKey = "d9fa039441ee765f866a01bc611a5d61";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#valueCity").value;
  searchCityWeather(city);
  document.querySelector("#valueCity").value = "";
}

function getForecast(coordinates) {
  let apiKey = "d9fa039441ee765f866a01bc611a5d61";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function displayWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let description = response.data.weather[0].main;
  let humidity = response.data.main.humidity;
  let wind = response.data.wind.speed;
  let icon = response.data.weather[0].icon;
  let name = response.data.name;
  console.log(response);

  celsiusTemperature = response.data.main.temp;

  document.querySelector("#valueTemp").innerHTML = `${temperature}`;
  document.querySelector("#name").innerHTML = `${name}`;
  document.querySelector("#description").innerHTML = `${description}`;
  document.querySelector("#humidity").innerHTML = `${humidity}%`;
  document.querySelector("#wind").innerHTML = `${wind}`;
  document
    .querySelector("#icon")
    .setAttribute("src", `https://openweathermap.org/img/wn/${icon}@2x.png`);

  getForecast(response.data.coord);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = Math.round((celsiusTemperature * 9) / 5 + 32);
  let temperatureElement = document.querySelector("#valueTemp");
  temperatureElement.innerHTML = `${fahrenheitTemperature}`;
  celsiuslink.classList.remove("active");
  fahrenheitlink.classList.add("active");
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#valueTemp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  celsiuslink.classList.add("active");
  fahrenheitlink.classList.remove("active");
}

date();
searchCityWeather("London");
// displayForecast();

let celsiusTemperature = null;

let form = document.querySelector("#inputCity");
form.addEventListener("submit", searchCity);

let fahrenheitlink = document.querySelector("#fahrenheit-link");
fahrenheitlink.addEventListener("click", displayFahrenheitTemperature);

let celsiuslink = document.querySelector("#celsius-link");
celsiuslink.addEventListener("click", displayCelsiusTemperature);
