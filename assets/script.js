//DONE-Connect to weather API
//DONE-get city coordinates
//get data from weather API
//add data to display on current weather card
//get data for five day weather
//put city info search into local storage
//pull city info into search history displayed on the page
//add functionality to create a new search request based on buttons in search history

const searchButton = document.querySelector(".search-btn");
const apiKey = "96f143ae7a73207f215000acd1e7e113";

function currentWeather(data) {
    var currentCity = data.city.name;
    var currentDate = data.list[0].dt_txt.split("")[0];
    var currentTemp = data.list[0].main.temp;
    var currentWind = data.list[0].wind.speed;
}

const getWeatherInfo = (name, lat, lon )=>{
    var apiURL=`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}}&units=imperial`;
    fetch(apiURL)
    .then((response) => response.json())
        .then((data) => {
            if (!data.length)
                return alert("Error-could not find the location you are looking for.")
            console.log(data[0])
        }).catch(function (error) {
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
            console.log(data)
        }).catch(function (error) {
            console.log(error)
        });
}

searchButton.addEventListener("click", getCoordinates);






