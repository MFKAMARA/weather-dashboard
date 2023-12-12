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

function fetchWeather(cityName) {
    const queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${weatherApiKey}`;

    fetch(queryURL)
        .then((response) => response.json())
        .then((data) => {
            displayCurrentWeather(data);
            fetchForecast(data.coord.lat, data.coord.lon, cityName);
            addToSearchHistory(cityName);
        })
        .catch((error) => {
            console.error("Error fetching current weather data:", error);
        });
}

function addToSearchHistory(cityName) {
    let searchHistory =
        JSON.parse(localStorage.getItem("weatherSearchHistory")) || [];

    searchHistory.push(cityName);

    const maxHistoryLength = 5;
    if (searchHistory.length > maxHistoryLength) {
        searchHistory = searchHistory.slice(
            searchHistory.length - maxHistoryLength
        );
    }

    localStorage.setItem("weatherSearchHistory", JSON.stringify(searchHistory));
    displaySearchHistory();
}
