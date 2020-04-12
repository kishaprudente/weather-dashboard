// DEPENDENCIES
var cities = [];
var APIKey = "a836acbd536c6ec3b05d3d1fcc35d97f";

// search for a city and store in local storage
$("#search-city").on("click", function () {
  // get value of city input
  var city = $("#city-input").val();

  var queryURL1 =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    APIKey;

  // AJAX request
  $.ajax({
    url: queryURL1,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    lat = response.coord.lat;
    lon = response.coord.lon;

    var cityNameElement = $(".card-title");
    //get current date
    var currentDate = moment().format("L");
    // render city name, current date and weather icon
    $(".card-title").text(`${response.name} (${currentDate})`);
    var weatherIcon = $("<img>");
    var iconCode = response.weather[0].icon;
    var iconUrl = "http://openweathermap.org/img/wn/" + iconCode + ".png";
    weatherIcon.attr("src", iconUrl);
    $(".card-title").append(weatherIcon);

    // push city input to cities array
    cities.push(city);
    //store cities in localStorage
    localStorage.setItem("cities", JSON.stringify(cities));

    var cityItem = $("<li>");
    cityItem.addClass("list-group-item");
    cityItem.text(response.name);
    $("#city-list").append(cityItem);
    console.log(cities);

    //render city info after clicking search button
    renderCityInfo(city, lat, lon);
  });
});

function renderCityInfo(city, lat, lon) {
  var queryURL2 =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    lat +
    "&lon=" +
    lon +
    "&units=imperial&appid=" +
    APIKey;

  $.ajax({
    url: queryURL2,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    // $(".card-body").append(cityNameElement);
    $("#temperature").text(`Temperature: ${response.current.temp} \xB0F`);
    $("#humidity").text(`Humidity: ${response.current.humidity}%`);
    $("#wind-speed").text(`Wind Speed: ${response.current.wind_speed} MPH`);
  });
}
