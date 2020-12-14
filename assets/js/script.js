var apiKey = "91e715b2f0f8a386b9670f18abfb2040";
var cityFormEl = document.querySelector("#city-search");
var cityInputEl = document.querySelector("#city-name");

var searchCityInput = function (event) {
    event.preventDefault();
    var currentCity = cityInputEl.value.trim();

    if (currentCity) {
        getCityWeather(currentCity)
        cityInputEl.value = "";
        console.log(currentCity);
    }
    else {
        alert("Please enter a city name in the search bar!");
    }
};

var getCityWeather = function (city) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;

    fetch(apiUrl).then(function (response) {
        console.log(response, city);
    });
};

cityFormEl.addEventListener("submit", searchCityInput);