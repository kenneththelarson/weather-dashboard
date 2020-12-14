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
            response.json().then(function (data) {
                loadWeather(data, city);
            })
        }
        else {
            alert("Error: " + response.statusText);
            return;
        }
    });

};

var loadWeather = function (weather, currentCity) {
    currentWeatherEl.textContent = "";
    cityTitleEl.textContent = currentCity;
    currentWeatherEl.classList.add("border", "p-2");

    var currentDate = document.createElement("span");
    currentDate.textContent = " (" + moment().format('M/DD/YYYY') + ")";
    cityTitleEl.appendChild(currentDate);

    var weatherIcon = document.createElement('img');
    weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);
    cityTitleEl.appendChild(weatherIcon);

    var tempEl = document.createElement("span");
    tempEl.textContent = "Temperature: " + weather.main.temp + " °F";
    tempEl.classList = "list-group-item";
    currentWeatherEl.appendChild(tempEl);

    var humidityEl = document.createElement("span");
    humidityEl.textContent = "Humidity: " + weather.main.humidity + "%";
    humidityEl.classList = "list-group-item";
    currentWeatherEl.appendChild(humidityEl);

    var windEl = document.createElement("span");
    windEl.textContent = "Wind Speed: " + weather.wind.speed + " MPH";
    windEl.classList = "list-group-item";
    currentWeatherEl.appendChild(windEl);

    var latitude = weather.coord.lat;
    var longitude = weather.coord.lon;

    getUvIndex(latitude, longitude);
};

var getUvIndex = function (latitude, longitude) {
    var apiUV = "http://api.openweathermap.org/data/2.5/uvi?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey;

    fetch(apiUV).then(function (response) {
        response.json().then(function (data) {
            displayUV(data);
            console.log(data);
        });
    });
};

var displayUV = function(data) {
    var uvEl = document.createElement("div");
    uvEl.textContent = "UV Index: ";
    uvEl.classList = "list-group-item";

    var uvCondition = document.createElement("span");
    uvCondition.textContent = data.value;

    if (data.value <= 2) {
        uvCondition.classList = "favorable";
    } 
    else if (data.value > 2 && data.value <= 8) {
        uvCondition.classList = "moderate";
    }
    else if (data.value > 8) {
        uvCondition.classList = "severe";
    };

    uvEl.appendChild(uvCondition);
    currentWeatherEl.appendChild(uvEl);
}

cityFormEl.addEventListener("submit", searchCityInput);