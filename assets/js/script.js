// grab api information from Open Weather APi - Using fetch 
// convert response to Json-Javascript Object Notation- 
//  make input box for user City Selection
// store city selection and display in a history column/row (bootstrap)
// input city selection (queryselector) to grab requested information on city weather from weather api... (.... / + "var" /)
        // requested information being current day forecast and 5 day forecast 
// take responses from Server APi and display in a div card (bootstrap) for selected city current day weather forcast
// take response and display in 5 div cards for 5 day forecast 

var cityButton = document.querySelector("#city-button");

$(cityButton).click(function() {
    var userInput = $("#city-query").val();
    console.log(userInput);
    getWeather(userInput);
    
}) 

function getWeather(city) {
console.log(city)

}

function FiveDayForcast(city) {

}

function uvIndex(long, latt) {

}

