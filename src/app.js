function init() {
  let city = "London";

  searchCityWeather(city, apiKey);
  let form = document.querySelector("#inputCity");
  form.addEventListener("submit", searchCity);
}

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

function displayWeather(response) {
  console.log(response);
  let temperature = Math.round(response.data.main.temp);
  document.querySelector("#valueTemp").innerHTML = `${temperature}°`;
  let description = response.data.weather[0].main;
  document.querySelector("#description").innerHTML = `${description}`;
  let humidity = response.data.main.humidity;
  document.querySelector("#humidity").innerHTML = `${humidity}%`;
  let wind = response.data.wind.speed;
  document.querySelector("#wind").innerHTML = `${wind}`;
  let icon = response.data.weather[0].icon;
  document
    .querySelector("#icon")
    .setAttribute("src", `http://openweathermap.org/img/wn/${icon}@2x.png`);
}

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#valueCity").value;
  searchCityWeather(city);
}
function searchCityWeather(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

let apiKey = "d9fa039441ee765f866a01bc611a5d61";

date();
init();
