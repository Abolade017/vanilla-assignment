let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
let celciusTemp = null;
function formatDate(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`;
}
function getWeather(response) {
    console.log(response.data);
    let temp = document.querySelector("#temp")
    let humidity = document.querySelector("#humidity");
    let wind = document.querySelector("#wind");
    let speed = Math.round(`${response.data.wind.speed}`);
    let weather = document.querySelector("#weather");
    let temperature = Math.round(response.data.main.temp);
    let city = document.querySelector("h1");
    let coordinate = document.querySelector("#coords");
    let weatherIcon = document.querySelector("#icon");
    let date = document.querySelector("#date");

    weatherIcon.setAttribute(
        "src",
        `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    weatherIcon.setAttribute(
        "alt",
        `https://openweathermap.org/img/wn/${response.data.weather[0].description}@2x.png`
    );
    temp.innerHTML = `${temperature}`;
    city.innerHTML = response.data.name;
    coordinate.innerHTML =
        "Latitude:" +
        Math.round(`${response.data.coord.lat}`) +
        "," +
        "Longitude:" +
        " " +
        Math.round(`${response.data.coord.lon}`);
    humidity.innerHTML = `Humidity:${response.data.main.humidity}`;
    wind.innerHTML = `wind:${speed}km/h`;
    weather.innerHTML = `${response.data.weather[0].description}`;
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
}
function showPosition(position) {
    console.log(position);
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    // let coordinate = document.querySelector("#coords");
    // coordinate.innerHTML = `Latitude:${lat}, Longitude:${lon}`;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    axios.get(`${apiUrl}`).then(getWeather);
    console.log(lon)
}
navigator.geolocation.getCurrentPosition(showPosition);

let currentCity = document.querySelector("button");
currentCity.addEventListener("click", showPosition);
function searchCity(city) {
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(getWeather);
    console.log(city);
}

function toCelciusUnit(event) {
    event.preventDefault();
    let temp = document.querySelector("#temp");
    temp.innerHTML = Math.round(celciusTemp);
    console.log(celcius)

}
let temp = document.querySelector('#to-celcius');
temp.addEventListener('click', toCelciusUnit)
function toFahenreit() {
    let fahenreit = celcius * (9 / 5) + 32;
    document.querySelector("#temp").innerHTML = fahenreit;

}
let fahenreit = document.querySelector('#to-fahenreit');
fahenreit.addEventListener('click', toFahenreit); function handleSubmit(event) {
    event.preventDefault();
    let city = document.querySelector("#search-input").value;
    searchCity(city);
}
let searchedInput = document.querySelector("#form");
searchedInput.addEventListener("submit", handleSubmit);
