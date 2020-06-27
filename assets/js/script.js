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
    "https://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=3857b5185d73c622f08369e986a70b10"
  ).then(function (response) {
    response.json().then(function (data) {
      console.log(data);
    });
  });
}
function FiveDayForcast(city) {}

function uvIndex(long, latt) {}

cityButtonEl.addEventListener("click", buttonClickHandler);
