
//get data for five day weather
//put city info search into local storage
//pull city info into search history displayed on the page
//add functionality to create a new search request based on buttons in search history

const searchButton = document.querySelector(".search-btn");
const apiKey = "96f143ae7a73207f215000acd1e7e113";

var fiveDayCard = document.getElementById("weather-cards");
// var fiveIconImg = document.getElementById("five-daily-icon");
function fiveDayWeather(data) {
    for (var i = 4; i < data.length; i += 6) {
        var fiveDate = data[i].dt_txt.split(" ")[0];
        var fiveTemp = data[i].main.temp;
        var fiveWind = data[i].wind.speed;
        var fiveHumidity = data[i].main.humidity;
        var fiveDayDetails = data.list[0].weather[0].description;

        var dateFiveEl = document.createElement("h2");
        console.log("hello for real?")//not working
        dateFiveEl.textContent = fiveDate;
        fiveDayCard.append(dateFiveEl);

        var fiveTempEl = document.createElement("h3");
        fiveTempEl.textContent = Math.round(fiveTemp) + " °F";
        fiveDayCard.append(fiveTempEl);

        var fiveWindEl = document.createElement("h3");
        fiveWindEl.textContent = "Wind: " + fiveWind;
        fiveDayCard.append(fiveWindEl);

        var fiveHumidityEl = document.createElement("h3");
        fiveHumidityEl.textContent = "Humidity: " + fiveHumidity;
        fiveDayCard.append(fiveWindEl);

        var fiveDayEl = document.createElement("h3");
        fiveDayEl.textContent = fiveDayDetails;
        fiveDayCard.append(fiveDayEl);

        // var fiveDayIcon = `https://openweathermap.org/img/wn/${data[i].weather[i].icon}@2x.png`;
        // fiveIconImg.setAttribute("src", fiveDayIcon);
    };
}


//CURRENT DAY//
var weatherInfo = document.getElementById("weather-info");
var iconImg = document.getElementById("daily-icon");
function currentWeather(data) {
    var currentCity = data.city.name;
    var currentDate = data.list[0].dt_txt.split(" ")[0];
    var currentTemp = data.list[0].main.temp;
    var currentWind = data.list[0].wind.speed;
    var currentHumidity = data.list[0].main.humidity;
    var firstDayDetails = data.list[0].weather[0].description;

    var cityEl = document.createElement("h2");
    cityEl.textContent = currentCity;
    weatherInfo.append(cityEl);

    var dateEl = document.createElement("h3");
    dateEl.textContent = currentDate;
    weatherInfo.append(dateEl);

    var tempEl = document.createElement("h3");
    tempEl.textContent = Math.round(currentTemp) + " °F";
    weatherInfo.append(tempEl);

    var windEl = document.createElement("h3");
    windEl.textContent = "Wind: " + currentWind;
    weatherInfo.append(windEl);

    var humidityEl = document.createElement("h3");
    humidityEl.textContent = "Humidity: " + currentHumidity;
    weatherInfo.append(humidityEl);

    var detailsEl = document.createElement("h3");
    detailsEl.textContent = firstDayDetails;
    weatherInfo.append(detailsEl);

    var currentDayIcon = `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`;
    iconImg.setAttribute("src", currentDayIcon);

    fiveDayWeather(data);
}

const getWeatherInfo = (name, lat, lon) => {
    var apiURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
    fetch(apiURL)
        .then((response) => response.json())
        .then((data) => {
            if (!data || !data.list)
                return alert("Error-could not find the location you are looking for.")
            currentWeather(data);
        }).catch(function (error) {
            console.log(error)
        });
}
var cityInput = document.querySelector(".city-input")
function getCoordinates() {
    var cityName = cityInput.value.trim();
    var apiURL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`;

    fetch(apiURL)
        .then((response) => response.json())
        .then((data) => {
            if (!data.length)
                return alert("Error-try again")
            var { name, lat, lon } = data[0];
            getWeatherInfo(name, lat, lon)

        }).catch(function (error) {
            console.log(error)
        });
}

searchButton.addEventListener("click", getCoordinates);






