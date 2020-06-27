// grab api information from Open Weather APi - Using fetch
// convert response to Json-Javascript Object Notation-
//  make input box for user City Selection
// store city selection and display in a history column/row (bootstrap)
// input city selection (queryselector) to grab requested information on city weather from weather api... (.... / + "var" /)
// requested information being current day forecast and 5 day forecast
// take responses from Server APi and display in a div card (bootstrap) for selected city current day weather forcast
// take response and display in 5 div cards for 5 day forecast

var cityButtonEl = document.querySelector("#city-button");

var buttonClickHandler = function () {
  var userCityChoice = document.getElementById("city-query").value;
  console.log(userCityChoice);
  getWeather(userCityChoice);
};

// $(cityButton).click(function() {
//     var userInput = $("#city-query").val();
//     console.log(userInput);
//     getWeather(userInput);
// })
// how to associate id of city to city name? so everytime user types NewYork-->ID is matched and then set to variable inside get weather function
function getWeather(city) {
  fetch(
    "http://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "+&appid=886705b4c1182eb1c69f28eb8c520e20"
  ).then(function (response) {
    response.json().then(function (data) {
      console.log(data);
    });
  });
}
function FiveDayForcast(city) {}

function uvIndex(long, latt) {}

cityButtonEl.addEventListener("click", buttonClickHandler);







http://api.openweathermap.org/data/2.5/forecast?q=new%20york&appid=886705b4c1182eb1c69f28eb8c520e20&units=imperial


// var object = {
//   coord: {
//     lon: -74.01,
//     lat: 40.71,
//   },
//   weather: [
//     {
//       id: 800,
//       main: "Clear",
//       description: "clear sky",
//       icon: "01n",
//     },
//   ],
//   base: "stations",
//   main: {
//     temp: 298.73,
//     feels_like: 298.33,
//     temp_min: 297.04,
//     temp_max: 300.37,
//     pressure: 1013,
//     humidity: 47,
//   },
//   visibility: 16093,
//   wind: {
//     speed: 2.1,
//     deg: 270,
//   },
//   clouds: {
//     all: 1,
//   },
//   dt: 1593225882,
//   sys: {
//     type: 1,
//     id: 4610,
//     country: "US",
//     sunrise: 1593163595,
//     sunset: 1593217874,
//   },
//   timezone: -14400,
//   id: 5128581,
//   name: "New York",
//   cod: 200,
// };
