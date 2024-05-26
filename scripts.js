const apiKey = "25f0d9eec060656272ca718df8c88318";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(location) {
    const response = await fetch(apiURL + location + `&appid=${apiKey}`);
    if (response.status == 404) {
        document.querySelector(".error").classList.add("show");
        document.querySelector(".weather").classList.remove("show");
    } else {
        const data = await response.json();
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
        const weatherIconMap = {
            "Clouds": "clouds.png",
            "Clear": "clear.png",
            "Rain": "rain.png",
            "Snow": "snow.png",
            "Drizzle": "drizzle.png",
            "Mist": "mist.png"
        };
        weatherIcon.src = "images/" + weatherIconMap[data.weather[0].main] || "images/default.png";
        document.querySelector(".weather").classList.add("show");
        document.querySelector(".error").classList.remove("show");
    }
}

searchBox.addEventListener('keypress', (e) => {
    if (e.key === "Enter") {
        checkWeather(searchBox.value);
    }
});

searchBtn.addEventListener('click', () => {
    checkWeather(searchBox.value);
});
