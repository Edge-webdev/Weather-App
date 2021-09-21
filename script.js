const input = document.querySelector('input');
const submit = document.querySelector('button');
const forecastContainer = document.querySelector('.container');

async function fetchWeather() {
    let city = input.value[0].toUpperCase() + input.value.slice(1);
    fetch(`http://api.weatherapi.com/v1/current.json?key=efde65d01e6643e8903112241211809&q=${city.toLowerCase()}&aqi=no`)
        .then(response => response.json())
        .then(data => forecastContainer.innerHTML = `
    <div class="input-container">
        <input type="text" placeholder="Enter your city here" />
        <button onclick="fetchWeather()">Search</button>
    </div>
    <section class="weather-forecast">
        <h1 class="title">The weather forecast in ${city} today is</h1>
        <img
        src="https:${data.current.condition.icon}"
        alt="Weather Image"
        class="weather-img"
        />
        <h3 class="weather-condition">${data.current.condition.text}</h3>
        <h2 class="temperature">${data.current.temp_c}&deg;C</h2>
    </section>
    <section class="extra-info">
        <ul class="list">
        <li class="list-item">
            <div class="icon"><i class="fas fa-wind fa-3x"></i></div>
            <h1 class="list-item-title">Wind Speed</h1>
            <h3 class="wind-speed">${data.current.wind_kph} km/h</h3>
        </li>
        <li class="list-item">
            <div class="icon"><i class="fas fa-tint fa-3x"></i></div>
            <h1 class="list-item-title">Humidity</h1>
            <h3 class="wind-speed">${data.current.humidity}%</h3>
        </li>
        <li class="list-item">
            <div class="icon"><i class="far fa-eye fa-3x"></i></div>
            <h1 class="list-item-title">Visibility</h1>
            <h3 class="wind-speed">${data.current.vis_km} km</h3>
        </li>
        <li class="list-item">
            <div class="icon"><i class="fas fa-cloud-rain fa-3x"></i></div>
            <h1 class="list-item-title">Precipitation</h1>
            <h3 class="wind-speed">${data.current.precip_mm} mm</h3>
        </li>
        </ul>
    </section>`
        )
}