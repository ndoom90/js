const weather = document.querySelector(".js-weather");

const COORDS = "coords";
const API_KEY = "e5adabd2c431b50ed839d93fef3093d8"

function getWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`).then(function(response) {
        return response.json()
    }).then(function(json){
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature} @ ${place}`
        console.log(json)
    });
}
function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));    
}

function handleGeoSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log(latitude, longitude);
    const coordsObj = {
        latitude,
        longitude
    };  
    saveCoords(coordsObj);
    getWeather(latitude, longitude);  
}

function handleGeoError() {
    console.log("Cant acceess geo location");
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}
function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null) {
        askForCoords();
    } else {
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init() {
    loadCoords();
}

init();