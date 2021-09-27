<<<<<<< HEAD
=======
// TODO: Document Code

const forecastContainer = document.querySelector('.container');
const clearButton = document.querySelector('.clear');
>>>>>>> 83f3df0 (Added geolocation finding)
const input = document.querySelector('input');
const submit = document.querySelector('.search');
const title = document.querySelector('.title');
const weatherIcon = document.querySelector('.weather-img');
const weatherCondition = document.querySelector('.weather-condition');
const temperature = document.querySelector('.temperature');
const windSpeed = document.querySelector('.wind-speed');
const humidityDisplay = document.querySelector('.humidity');
const visibilityDisplay = document.querySelector('.visibility');
const precipitation = document.querySelector('.precipitation');

var APIdata = {
    key: "815173988628159d2cf27189bb8b38b0",
    units: "metric"
}

submit.addEventListener("click", fetchWeather);
input.addEventListener("keyup", (e) => {
    if (e.key == 'Enter') {
        fetchWeather();
    }
})
window.addEventListener("load", function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            getLocationWeather(position.coords.latitude, position.coords.longitude)
        });
    } else {
        console.error("Unable to find location");
    }
});

async function getLocationWeather(lat, lon) {
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIdata.key}&units=${APIdata.units}`);
    let data = await response.json();

    let { name, visibility, rain } = data;
    let { country } = data.sys;
    let { icon, description } = data.weather[0];
    let { temp, humidity } = data.main;
    let { speed } = data.wind;

    description = formatString(description);
    temp = Math.round(temp);
    visibility = Math.round(visibility / 1000);


    title.innerText = `The weather in ${name}, ${country} today is`;
    weatherIcon.src = `https://openweathermap.org/img/wn/${icon}@4x.png`;
    weatherCondition.innerText = `${description}`;
    temperature.innerText = `${temp}°C`;
    windSpeed.innerText = `${speed} km/h`;
    humidityDisplay.innerText = `${humidity}%`;
    visibilityDisplay.innerText = `${visibility} km`;
    precipitation.innerText = `${rain ? rain["1h"] : 0.0} mm`
}

async function fetchWeather() {
    var city = input.value;
    let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIdata.key}&units=${APIdata.units}`);
    let data = await res.json();

    let { name, visibility, rain } = data;
    let { country } = data.sys;
    let { icon, description } = data.weather[0];
    let { temp, humidity } = data.main;
    let { speed } = data.wind;

    description = formatString(description);
    temp = Math.round(temp);
    visibility = Math.round(visibility / 1000);

    input.value = '';

    title.innerText = `The weather in ${name}, ${country} today is`;
    weatherIcon.src = `https://openweathermap.org/img/wn/${icon}@4x.png`;
    weatherCondition.innerText = `${description}`;
    temperature.innerText = `${temp}°C`;
    windSpeed.innerText = `${speed} km/h`;
    humidityDisplay.innerText = `${humidity}%`;
    visibilityDisplay.innerText = `${visibility} km`;
    precipitation.innerText = `${rain ? rain["1h"] : 0.0} mm`
}

function formatString(string) {
    if (typeof string == "string") return string[0].toUpperCase() + string.slice(1);
    else return;
}