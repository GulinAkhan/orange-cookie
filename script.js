let now = new Date();
let currentDate = document.querySelector("p");
let minutes = "";
let date = "";
let day = "";
let hours = "";
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
minutes = now.getMinutes();
date = now.getDate();
day = days[now.getDay()];
hours = now.getHours();

if (minutes < 10) {
  currentDate.innerHTML = `${day} ${date}  ${hours}: 0${minutes}`;
} else {
  currentDate.innerHTML = `${day} ${date}  ${hours}:${minutes}`;
}

//

function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#exampleInputEmail1");
  let city = document.querySelector("#city-name");
  city.innerHTML = `${searchInput.value}`;

  let apiKey = "d2054d63525d3a030c67f0c81b9bff6c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

//

let form = document.querySelector("#search-city");
form.addEventListener("submit", searchCity);

//

function showTemperature(response) {
  let searchedTemp = document.querySelector("#temp-num");
  let formatTemp = Math.round(response.data.main.temp);
  searchedTemp.innerHTML = `${formatTemp}°C`;

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

//

let searchCurrent = document.querySelector("#btnSubmit");
searchCurrent.addEventListener("click", showCurrentTemp);

function showCurrentTemp() {
  navigator.geolocation.getCurrentPosition(getPosition);
}

function getPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "d2054d63525d3a030c67f0c81b9bff6c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showMyTemperature);
}

function showMyTemperature(response) {
  let temperature = Math.round(response.data.main.temp);

  let city = document.querySelector("#city-name");
  city.innerHTML = `Current Location: ${response.data.name}`;

  let currentWeather = document.querySelector("#temp-num");
  currentWeather.innerHTML = `${temperature}°C`;
}

//
