//DONE-Connect to weather API
//DONE-get city coordinates
//DONE-gget data from weather API
//add data to display on current weather card
//add icon to display
//get data for five day weather
//put city info search into local storage
//pull city info into search history displayed on the page
//add functionality to create a new search request based on buttons in search history

const searchButton = document.querySelector(".search-btn");
const apiKey = "96f143ae7a73207f215000acd1e7e113";


var weatherInfo = document.getElementById("weather-info");
var currentDayIcon = document.getElementById("daily-icon");
function currentWeather(data) {
    console.log("current weather")
    var currentCity = data.city.name;
    var currentDate = data.list[0].dt_txt.split("")[0];
    var currentTemp = data.list[0].main.temp;
    var currentWind = data.list[0].wind.speed;
    var currentHumidity = data.list[0].main.humidity;
    var firstDayDetails = data.list[0].weather[0].description;
    var firstDayIcon = `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`;

    
    var currentDayWeatherCard = document.createElement("p");
    currentDayWeatherCard.innerHTML = `City:  ${currentCity} <br>` + `Date: ${currentDate}` + `Temp: ${Math.round(currentTemp)}` + `Wind: ${currentWind}` + `Humidity: ${currentHumidity}`;
    weatherInfo.append(currentDayWeatherCard);

    currentDayIcon.setAttribute("src", "https://openweathermap.org/img/wn/10d@4x.png")
    currentDayIcon.innerHTML = `${firstDayDetails} + ${firstDayIcon}`
}

const getWeatherInfo = (name, lat, lon) => {
    var apiURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
    fetch(apiURL)
        .then((response) => response.json())
        .then((data) => {
            console.log("get weather info", data)
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






