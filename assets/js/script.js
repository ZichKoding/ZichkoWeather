// variables
let myAPIWeatherKey = "&units=imperial&APPID=a15f02adbde7a78309af009d972b4360";
let userSearch = "";

// fetching data from Open Weather Map based off city or zipcode
function makingWeatherCall(weather) {
    fetch(weather)
    .then(response => response.json())
    .then(function(data) {
        console.log(data);

        // Adding icon to represent current weather
        let curIcon = usingIcon(data.weather[0].icon);
        $("#curIcon").attr("src", curIcon);
        
        // Pull the lattitude and longitude and use that to make a onecall
        // to openweathermap to get current and future forecasts.
        let oneCallAPI = fetchOneCall(data.coord.lat, data.coord.lon);
        fetch(oneCallAPI)
        .then(response => response.json())
        .then(function(data) {
            console.log(data);

            // Display current temp
            let currentTemp = Math.round(data.current.temp);
            $("#curDayTemp").text(currentTemp + "*F");

            // Display current wind speed
            let curWind = Math.round(data.current.wind_gust);
            $("#curDayWind").text(curWind + " MPH");

            // Display current humidity
            let curHumid = Math.round(data.current.humidity);
            $("#curDayHumid").text(curHumid + "%");

            // Display current UV index
            let curUV = Math.round(data.current.uvi);
            $("#curDayUV").text(curUV);
        });
    });
};
function usingIcon(icon) {
    let iconPath = "https://openweathermap.org/img/w/" + icon + ".png";
    return iconPath;
};

function fetchOneCall(lat, lon) {
    let ppfWeatherData = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly" + myAPIWeatherKey;
    return ppfWeatherData;
};


$(".searchBtn").click(function() {
    userSearch = $("#search").val();
    let curWeatherAPI = "https://api.openweathermap.org/data/2.5/weather?q=" + userSearch + myAPIWeatherKey;
    makingWeatherCall(curWeatherAPI);
});