//DONE-Connect to weather API
//get city coordinates
//get data from weather API
//add data to display on current weather card
//get data for five day weather
//put city info search into local storage
//pull city info into search history displayed on the page
//add functionality to create a new search request based on buttons in search history

const searchButton = document.querySelector(".search-btn");
const apiKey = "f361262cbefd4ede6a09b3c7c951f6a2";
const dailyApiKey = "35ca9dff30b5e843fe7e5722b54d4012"


function currentWeather(data) {
    var currentCity = data.city.name;
    var currentDate = data.list[0].dt_txt.split("")[0];
    var currentTemp = data.list[0].main.temp;
    var currentWind = data.list[0].wind.speed;
}

const getWeatherInfo = (name, lat, lon )=>{
    var apiURL=`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}}&units=imperial`;
    //https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
    fetch(apiURL)
    .then((response) => response.json())
        .then((data) => {
            console.log(data)
            console.log(data.message)
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
        }).catch(function (error) {
            console.log(error)
        });
}

searchButton.addEventListener("click", getCoordinates);






