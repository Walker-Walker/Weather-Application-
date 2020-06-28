// grab api information from Open Weather APi - Using fetch
// convert response to Json-Javascript Object Notation-
//  make input box for user City Selection
// store city selection and display in a history column/row (bootstrap)
// input city selection (queryselector) to grab requested information on city weather from weather api... (.... / + "var" /)
// scope into object in json OpenWeather, and create a var for each weather data...
// requested information being current day forecast and 5 day forecast
// take responses from Server APi and display in a div card (bootstrap) for selected city current day weather forcast
// take response and display in 5 div cards for 5 day forecast
// use for loop to add 5 day forcast cards to dom
//insert cityname into array (push)
// array set to --> json.stringify--> local storage
// grab from local storage--->json.parse
// for loop to display each item...loop through city search history.length

var citySearchHistory = [];


var currentDate = moment().format("l");


var cityButtonEl = document.querySelector("#city-button");


var buttonClickHandler = function () {
  var userCityChoice = document.getElementById("city-query").value;
  citySearchHistory.push(userCityChoice);
  localStorage.setItem("citySearchHistory", JSON.stringify(citySearchHistory));
  console.log("city search history from array: " + citySearchHistory);
  console.log("user city choice is: " + userCityChoice);
  getWeather(userCityChoice);
};

// getSearchHistory();

function getSearchHistory() {
  for (i = 0; i < citySearchHistory.length; i++) {
    var cityNames = JSON.parse(
      localStorage.getItem("citySearchHistory")
    ); 
    console.log("City Names from Local Storage: " + cityNames[i]);
  
  }
  
}


// use template literals
function getWeather(city) {
  fetch(
    "http://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "+&appid=24262cef714b3904324824a13e7d7b8d"
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var cityName = data.name;
      var temperature = data.main.temp;
      var humidity = data.main.humidity;
      var windSpeed = data.wind;
      var latt = data.coord.lat;
      var long = data.coord.lon;

      const card = `
     <div class="card" style="width: 18rem;">
    <img class="card-img-top" src="" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">${currentDate}</h5>
      <p class="card-text">The temperature is: ${temperature}</p>
      <p id = "uv"> This is uv index </p>
    
    </div>
  </div> `;

      //appending
      document.querySelector("#current-weather").innerHTML = card;

      getSearchHistory();
      fiveDayForcast(cityName);
      uvIndex(latt, long);
    });
}

// insert this into html to show weather icon src =  "http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png
// use moment + 1 to get dates for forcast cards..
function fiveDayForcast(city) {
  fetch(
    `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=24262cef714b3904324824a13e7d7b8d&units=imperial`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // data.list[i]
      for (var i = 0; i < 5; i++) {
        
        var temp = data.list[i].main.temp;
        var humidity = data.list[i].main.humidity;
        console.log("temp and humidity " + temp + " " + humidity);
        console.log("icon name png " + data.list[i].weather[0].icon);
      }
    });
}

function uvIndex(latt, long) {
  fetch(
    `http://api.openweathermap.org/data/2.5/uvi?appid=24262cef714b3904324824a13e7d7b8d&lat=${latt}&lon=${long}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var uV = data.value;
    });
}

cityButtonEl.addEventListener("click", buttonClickHandler);

// http://api.openweathermap.org/data/2.5/forecast?q=new%20york&appid=886705b4c1182eb1c69f28eb8c520e20&units=imperial

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
