const searchButton = document.querySelector(".search-btn");
const apiKey = "96f143ae7a73207f215000acd1e7e113";
var input = document.querySelector("input")
var prevCity = [];

// document.addEventListener("HistoryLoaded", () => {
//     let localStorageList = localStorage.getItem("history");
//     localStorageList = JSON.parse(localStorageList);

//     if(localStorageList) {
//         for (let i=0; i<localStorageList.length; i++) {
//             var eachListItem = localStorageList[i];

//             let
//         }
//     }
// })

function displayHistory() {
    document.getElementById("city-history").innerHTML = "";
    // if (prevCity.length >=0){
    console.log(prevCity)
    // document.getElementById("city-history").innerHTML = "";
        for(var i = prevCity.length-1; i >= 0; i--) {
            var cityHistoryBtn = document.createElement('button')
            console.log(prevCity[i])
            cityHistoryBtn.textContent = prevCity[i-1];
            document.getElementById("city-history").append(cityHistoryBtn);
        }
    }



function getSearchHistory() {
    var storedHistory = localStorage.getItem("history");
    if (storedHistory) {
        prevCity = JSON.parse(storedHistory);
    }
    displayHistory();
}




var fiveDayCard = document.getElementById("weather-cards");
// var fiveIconImg = document.getElementById("five-icon");
function fiveDayWeather(data) {
    for (var i = 4; i < data.list.length; i += 6) {
        var fiveDayWeather = data.list[i];
        var fiveDate = data.list[i].dt_txt.split(" ")[0];
        var fiveTemp = data.list[i].main.temp;
        var fiveWind = data.list[i].wind.speed;
        var fiveHumidity = data.list[i].main.humidity;
        var fiveDayDetails = data.list[0].weather[0].description;
        // var imgIcon = `https://openweathermap.org/img/wn/${currentDayWeather.weather[0].icon}@2x.png`;
        // var iconSrc = "<img src=" + imgIcon + ">";

        var dateFiveEl = document.createElement("h3");
        dateFiveEl.textContent = fiveDate;
        fiveDayCard.append(dateFiveEl);

        var fiveTempEl = document.createElement("h4");
        fiveTempEl.textContent = Math.round(fiveTemp) + " °F";
        fiveDayCard.append(fiveTempEl);

        var fiveWindEl = document.createElement("h4");
        fiveWindEl.textContent = "Wind: " + fiveWind;
        fiveDayCard.append(fiveWindEl);

        var fiveHumidityEl = document.createElement("h4");
        fiveHumidityEl.textContent = "Humidity: " + fiveHumidity;
        fiveDayCard.append(fiveWindEl);

        var fiveDayEl = document.createElement("h4");
        fiveDayEl.textContent = fiveDayDetails;
        fiveDayCard.append(fiveDayEl);

        var fiveDayIcon = `https://openweathermap.org/img/wn/${fiveDayWeather.weather[0].icon}@2x.png`;
        console.log(fiveDayIcon);
        var iconImgElement = document.createElement("img");
        iconImgElement.setAttribute("src", fiveDayIcon);
        fiveDayCard.append(iconImgElement);

        // var fiveDayIcon = `https://openweathermap.org/img/wn/${fiveDayWeather.weather[0].icon}@2x.png`;
        // var fiveIconEl = document.createElement("img");
        // fiveIconEl.setAttribute("src", fiveDayIcon);
        // fiveDayCard.append(fiveIconEl);
        // var fiveDayIcon = `https://openweathermap.org/img/wn/${fiveDayWeather.weather[0].icon}@2x.png`;
        
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

function handleSearch() {
    getCoordinates();
    prevCity.push(input.value)

    localStorage.setItem("history", JSON.stringify(prevCity));
    displayHistory();

}

searchButton.addEventListener("click", handleSearch);
getSearchHistory();





