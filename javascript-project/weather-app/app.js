
const storage = new Storage;

const weatherLocation = storage.getLocationData();

const weather = new Weather(weatherLocation.city, weatherLocation.state);
const ui = new UI;


document.addEventListener("DOMContentLoaded",getWeather());

//change location event
document.getElementById("w-change-btn").addEventListener("click", e => {
    const city = document.getElementById("city").value;
    const state = document.getElementById("state").value;

    weather.changeLocation(city, state);

    storage.setLocationData(city, state);

    getWeather();

    $("#locModal").modal('hide');
})
 
function getWeather() {
    weather.getWeather()
    .then(function(results) {
        ui.paint(results);
    })
    .catch(err => console.log(err));
}


