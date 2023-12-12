const weatherApiKey = "4df4cf41ecdb60fbcac3c0bcdc7b5588";
const searchFormElement = document.getElementById("search-form");
const cityInputElement = document.getElementById("city-input");
const currentWeatherSectionElement = document.getElementById("current-weather");
const forecastSectionElement = document.getElementById("forecast");
const searchHistorySectionElement = document.getElementById("search-history");

searchFormElement.addEventListener("submit", function (event) {
    event.preventDefault();
    const cityName = cityInputElement.value.trim();
    if (cityName !== "") {
        fetchWeather(cityName);
    }
});
