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
  let minutes = now.getMinutes();

  let currentTime = document.querySelector("#date");

  currentTime.innerHTML = `${day}, ${hours}:${minutes}hr.`;
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
}

function displayWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let description = response.data.weather[0].main;
  let humidity = response.data.main.humidity;
  let wind = response.data.wind.speed;
  let icon = response.data.weather[0].icon;

  celsiusTemperature = response.data.main.temp;

  console.log(response);

  document.querySelector("#valueTemp").innerHTML = `${temperature}`;
  document.querySelector("#description").innerHTML = `${description}`;
  document.querySelector("#humidity").innerHTML = `${humidity}%`;
  document.querySelector("#wind").innerHTML = `${wind}`;
  document
    .querySelector("#icon")
    .setAttribute("src", `http://openweathermap.org/img/wn/${icon}@2x.png`);
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

let celsiusTemperature = null;

let form = document.querySelector("#inputCity");
form.addEventListener("submit", searchCity);

let fahrenheitlink = document.querySelector("#fahrenheit-link");
fahrenheitlink.addEventListener("click", displayFahrenheitTemperature);

let celsiuslink = document.querySelector("#celsius-link");
celsiuslink.addEventListener("click", displayCelsiusTemperature);
