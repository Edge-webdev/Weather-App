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

submit.addEventListener("click", fetchWeather);

async function fetchWeather() {
    var city = input.value;
    let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=815173988628159d2cf27189bb8b38b0&units=metric`);
    let data = await res.json();

    let { name, visibility, rain } = data;
    let { icon, description } = data.weather[0];
    let { temp, humidity } = data.main;
    let { speed } = data.wind;

    temp = Math.round(temp);
    visibility = Math.round(visibility / 1000);

    input.value = '';

    title.innerText = `The weather in ${name} today is`;
    weatherIcon.src = `https://openweathermap.org/img/wn/${icon}@4x.png`;
    weatherCondition.innerText = `${description}`;
    temperature.innerText = `${temp}°C`;
    windSpeed.innerText = `${speed} km/h`;
    humidityDisplay.innerText = `${humidity}%`;
    visibilityDisplay.innerText = `${visibility} km`;
    precipitation.innerText = `${rain ? rain["1h"] : 0.0} mm`
}