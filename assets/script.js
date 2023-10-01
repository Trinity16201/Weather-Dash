const searchButton = document.querySelector(".search-btn");
const cityInput = document.querySelector(".city-input")
const apiKey= "f361262cbefd4ede6a09b3c7c951f6a2";
const getCityCoordinates = () =>{
    const cityName = cityInput.value.trim();

    console.log(cityName)
    const apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}lat={lat}&lon={lon}&appid=${apiKey}}}`
    
    fetch(apiURL).then(res => res.json()).then(data => {
        console.log(data)
    }) .catch(() => {
        alert("An error has occurred. Please try again.")
    })
    
    if(!cityName) return;
}
searchButton.addEventListener("click", getCityCoordinates);
