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
    // push city input to cities array
    cities.push(city);
    //store cities in localStorage
    localStorage.setItem("cities", JSON.stringify(cities));
    console.log(cities);

    var cityNameElement = $(".card-title");
    //get current date
    var currentDate = moment().format("L");
    $(".card-title").text(
      `${response.name} ${currentDate} ${response.weather[0].description}`
    );

    lat = response.coord.lat;
    lon = response.coord.lon;

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
    // var lat = response.coord.lat;
    // var lon = response.coord.lon;
    console.log(lat);
    console.log(lon);
    console.log(response);
    // $(".card-body").append(cityNameElement);
    $("#temperature").text(`Temperature: ${response.current.temp} \xB0F`);
    $("#humidity").text(`Humidity: ${response.current.humidity}%`);
    $("#wind-speed").text(`Wind Speed ${response.current.wind_speed} MPH`);
  });
}
