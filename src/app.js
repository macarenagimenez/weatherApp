function displayTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  showTemperature(temperature);
}

function showTemperature(temperature) {
  document.querySelector("#valueTemp").innerHTML = `${temperature}°`;
}

let apiKey = "d9fa039441ee765f866a01bc611a5d61";
let city = "London";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
