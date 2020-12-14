var apiKey = "91e715b2f0f8a386b9670f18abfb2040";
var cityFormInputEl = document.querySelector("#city-search");

var searchCityInput = function (event) {
    event.preventDefault();
    var currentCity = cityFormInputEl.value;
    console.log(event, "button push");

    // if (currentCity) {

    // }
};

var getCityWeather = function (city) {
    console.log("function was called");
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;

    fetch(apiUrl).then(function (response) {
        console.log(response, city);
    });
};

cityFormInputEl.addEventListener("submit", searchCityInput);
getCityWeather("atlanta");