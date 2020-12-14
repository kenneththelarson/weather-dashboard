var apiKey = "91e715b2f0f8a386b9670f18abfb2040";
var cityFormEl = document.querySelector("#city-search");
var cityInputEl = document.querySelector("#city-name");
var currentWeatherEl = document.querySelector("#current-weather-container");
var currentCityTitleEL = document.querySelector("#current-city");
var cityTitleEl = document.querySelector("#city-title");

var searchCityInput = function (event) {
    event.preventDefault();
    var currentCity = cityInputEl.value.trim();

    if (currentCity) {
        getCityWeather(currentCity)
        cityInputEl.value = "";
    }
    else {
        alert("Please enter a city name in the search bar!");
    }
};

var getCityWeather = function (city) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;

    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function(data) {
                loadWeather(data, city);
            })
        }
        else {
            alert("Error: " + response.statusText);
            return;
        }
    });

};

var loadWeather = function(weather, currentCity) {
    currentWeatherEl.textContent = "";
    cityTitleEl.textContent = currentCity;
    currentWeatherEl.classList.add("border");

    var currentDate = document.createElement("span");
    currentDate.textContent = " (" + moment().format('M/DD/YYYY') + ")";
    cityTitleEl.appendChild(currentDate);
}

cityFormEl.addEventListener("submit", searchCityInput);