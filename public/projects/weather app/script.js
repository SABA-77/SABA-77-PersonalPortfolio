const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const condition = document.getElementById("condition");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const feelsLike = document.getElementById("feelsLike");
const weatherIcon = document.getElementById("weatherIcon");
const message = document.getElementById("message");


// Search button
searchBtn.addEventListener("click", () => {

    const city = cityInput.value.trim();

    if (city === "") {
        message.textContent = "Please enter a city name.";
        return;
    }

    getWeather(city);
});


// Press Enter to search
cityInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {
        searchBtn.click();
    }

});


// Main weather function
async function getWeather(city) {

    try {

        message.textContent = "Loading...";

        // Step 1: Find city coordinates
        const locationResponse = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
        );

        const locationData = await locationResponse.json();

        if (!locationData.results) {

            message.textContent = "City not found.";

            return;
        }


        const location = locationData.results[0];

        const latitude = location.latitude;
        const longitude = location.longitude;

        const actualCity = location.name;


        // Step 2: Get weather
        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m`
        );

        const weatherData = await weatherResponse.json();


        const current = weatherData.current;


        // Step 3: Display data
        cityName.textContent = actualCity;

        temperature.textContent =
            `${Math.round(current.temperature_2m)}°C`;

        humidity.textContent =
            `${current.relative_humidity_2m}%`;

        wind.textContent =
            `${current.wind_speed_10m} km/h`;

        feelsLike.textContent =
            `${Math.round(current.apparent_temperature)}°C`;


        // Weather condition
        const weatherInfo =
            getWeatherCondition(current.weather_code);

        condition.textContent =
            weatherInfo.text;

        weatherIcon.textContent =
            weatherInfo.icon;


        message.textContent = "";

    }

    catch (error) {

        console.error(error);

        message.textContent =
            "Something went wrong. Please try again.";

    }

}


// Convert weather code into text + emoji
function getWeatherCondition(code) {

    if (code === 0) {

        return {
            text: "Clear Sky",
            icon: "☀️"
        };

    }

    if (code === 1 || code === 2) {

        return {
            text: "Partly Cloudy",
            icon: "🌤️"
        };

    }

    if (code === 3) {

        return {
            text: "Cloudy",
            icon: "☁️"
        };

    }

    if (
        code === 45 ||
        code === 48
    ) {

        return {
            text: "Foggy",
            icon: "🌫️"
        };

    }

    if (
        code >= 51 &&
        code <= 67
    ) {

        return {
            text: "Rain",
            icon: "🌧️"
        };

    }

    if (
        code >= 71 &&
        code <= 77
    ) {

        return {
            text: "Snow",
            icon: "❄️"
        };

    }

    if (
        code >= 80 &&
        code <= 82
    ) {

        return {
            text: "Rain Showers",
            icon: "🌦️"
        };

    }

    if (
        code >= 95 &&
        code <= 99
    ) {

        return {
            text: "Thunderstorm",
            icon: "⛈️"
        };

    }


    return {
        text: "Unknown",
        icon: "🌤️"
    };

}