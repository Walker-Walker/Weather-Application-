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
var forcastHeaderTitle = document.querySelector("#five-day-forcast-title")

var currentDate = moment().format("l");

var cityButtonEl = document.querySelector("#city-button");

var buttonClickHandler = function () {
  var userCityChoice = document.getElementById("city-query").value;
  var citySearchHistory = localStorage.getItem("citySearchHistory");
  if (citySearchHistory == null) {
    citySearchHistory = [];
  } else {
    citySearchHistory = JSON.parse(citySearchHistory);
  }
  citySearchHistory.push(userCityChoice);
  localStorage.setItem("citySearchHistory", JSON.stringify(citySearchHistory));
 
  getWeather(userCityChoice);
};

function getSearchHistory() {
  document.querySelector(".list-group").innerHTML = "";
  var citySearchHistory = JSON.parse(localStorage.getItem("citySearchHistory"));

  for (i = 0; i < citySearchHistory.length; i++) {
  
    const card = `
  <div class="card" style="width: 20rem;">
  <img class="card-img-top">
  <div class="card-body" style="width:20rem;">
  <ul class="card-title">
   
   ${citySearchHistory[i]}
   
  </ul>

  </div>
  </div> `;
    //appending
    document.querySelector(".list-group").innerHTML += card;
  }
}

// use template literals
function getWeather(city) {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
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
      var windSpeed = data.wind.speed;
      var latt = data.coord.lat;
      var long = data.coord.lon;
     
      let iconURL =
      "https://openweathermap.org/img/w/" +
      data.weather[0].icon +
      ".png";
     
      uvIndex(latt, long, function (uV) {
        const card = `
          <div class="card" style="width: 100rem;">
          <h2 class="card-text">${cityName}</h2>
          <h2 class="card-title">${currentDate}</h5>
          <img class="" src="${iconURL}" alt="Card image cap" width=100>
          
          <div class="card-body"><div>
            
            <p class="card-text">Temperature: ${temperature} F</p>
            <p class="card-text">Humidity: ${humidity}%</p>
            <p class ="card-text">Wind Speed: ${windSpeed} MPH</p>
            <span class= "bg-danger rounded-sm text-white ">UV Index:${uV}</span>
            
            
          </div>
        </div> `;

        //appending
        document.querySelector("#current-weather").innerHTML = card;
      });

      getSearchHistory();
      fiveDayForcast(cityName);
    });
}


function fiveDayForcast(city) {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=24262cef714b3904324824a13e7d7b8d&units=imperial`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      document.querySelector("#five-day-forcast").innerHTML = "";

      for (var i = 0; i < data.list.length; i++) {
        if (data.list[i].dt_txt.indexOf("15:00:00") !== -1) {
        var temp = data.list[i].main.temp;
        var humidity = data.list[i].main.humidity;
        var localTime = new Date(data.list[i].dt_txt);
        let iconURL =
          "https://openweathermap.org/img/w/" +
          data.list[i].weather[0].icon +
          ".png";
    

        // String Literal
        const card = `
        <div class="ml-3 mt-1 card text-white bg-primary mb-3" style="max-width: 17rem ; ">
        <div class="card-body">
          <h2 class="card-title">${localTime.toLocaleDateString()}</h2>
          <img class="" src="${iconURL}" alt="Card image cap" width=100 </img>
          <p class="card-text">The temperature is: ${temp} F</p>
          <p class="card-text">Humidity: ${humidity}%</p>
        </div>
        </div>
        `;

        //appending
        document.querySelector("#five-day-forcast").innerHTML += card;
        forcastHeaderTitle.classList.remove("hide");
      }
    }
    });
}

function uvIndex(latt, long, callback) {
  fetch(
    `https://api.openweathermap.org/data/2.5/uvi?appid=24262cef714b3904324824a13e7d7b8d&lat=${latt}&lon=${long}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var uV = data.value;
      
      callback(uV);
    });
}

cityButtonEl.addEventListener("click", buttonClickHandler);

