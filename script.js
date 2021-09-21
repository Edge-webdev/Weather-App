const input = document.querySelector('input');
const submit = document.querySelector('button');
const forecastContainer = document.querySelector('.container');

submit.addEventListener("click", fetchWeather)

async function fetchWeather() {
    var city = input.value
    let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=815173988628159d2cf27189bb8b38b0&units=metric`);
    let data = await res.json();

    let { name } = data;
    let { icon, description } = data.weather[0];
    let { temp, humidity } = data.main;
    let { speed } = data.wind;
    let { visibility } = data;
    let { rain } = data;

    temp = Math.round(temp);
    visibility = Math.round(visibility / 1000);

    forecastContainer.innerHTML = `
    <div class="input-container">
        <input type="text" placeholder="Enter your city here" />
        <button>Search</button>
    </div>
    <section class="weather-forecast">
        <h1 class="title">The weather forecast in ${name} today is</h1>
        <img
        src="https://openweathermap.org/img/wn/${icon}@4x.png"
        alt="Weather Image"
        class="weather-img"
        />
        <h3 class="weather-condition">${description}</h3>
        <h2 class="temperature">${temp}&deg;C</h2>
    </section>
    <section class="extra-info">
        <ul class="list">
        <li class="list-item">
            <div class="icon"><i class="fas fa-wind fa-3x"></i></div>
            <h1 class="list-item-title">Wind Speed</h1>
            <h3 class="wind-speed">${speed} km/h</h3>
        </li>
        <li class="list-item">
            <div class="icon"><i class="fas fa-tint fa-3x"></i></div>
            <h1 class="list-item-title">Humidity</h1>
            <h3 class="wind-speed">${humidity}%</h3>
        </li>
        <li class="list-item">
            <div class="icon"><i class="far fa-eye fa-3x"></i></div>
            <h1 class="list-item-title">Visibility</h1>
            <h3 class="wind-speed">${visibility} km</h3>
        </li>
        <li class="list-item">
            <div class="icon"><i class="fas fa-cloud-rain fa-3x"></i></div>
            <h1 class="list-item-title">Precipitation</h1>
            <h3 class="wind-speed">${rain ? rain["1h"] : 0.0} mm</h3>
        </li>
        </ul>
  </section>
    `
}