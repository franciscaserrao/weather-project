let now = new Date();
let hour = now.getHours();
if (hour < 10) {
  hour = "0" + hour;
} else {
  hour = `${hour}`;
}

let minute = now.getMinutes();
if (minute < 10) {
  minute = "0" + minute;
} else {
  minute = `${minute}`;
}

let week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let weeks = week[now.getDay()];
let date = now.getDate();
let month = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Agu",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let months = month[now.getMonth()];

let info = document.querySelector(".day-info");
info.innerHTML = `${hour}:${minute}, ${weeks} ${date} ${months}`;

function displayWeather(response) {
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#city-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
  document.querySelector("#wind").innerHTML = `Wind speed: ${Math.round(
    response.data.wind.speed
  )}`;

  document.querySelector(".day-description").innerHTML =
    response.data.weather[0].main;
}

function searchCity(city) {
  let apiKey = `be81f193e065bf5feb2d944c7336968b`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city").value;
  searchCity(city);
}

let lookCity = document.querySelector("#look-city");
lookCity.addEventListener("submit", search);

navigator.geolocation.getCurrentPosition(searchLocation);

function searchLocation(position) {
  let apiKeyLoc = "be81f193e065bf5feb2d944c7336968b";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrlLoc = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKeyLoc}&units=metric`;
  axios.get(apiUrlLoc).then(displayWeather);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let locationButton = document.querySelector("#current-location");
locationButton.addEventListener("click", currentLocation);
