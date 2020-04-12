// DEPENDENCIES
var cities = [];
var APIKey = "a836acbd536c6ec3b05d3d1fcc35d97f";

// WHEN I search for a city
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

// WHEN I view current weather conditions for that city
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
    // THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
    $("#temperature").text(`Temperature: ${response.current.temp} \xB0F`);
    $("#humidity").text(`Humidity: ${response.current.humidity}%`);
    $("#wind-speed").text(`Wind Speed: ${response.current.wind_speed} MPH`);
    $("#uv-index").text(`UV Index: `);

    // WHEN I view the UV index
    var uviSpan = $("<span>");
    uviSpan.text(`${response.current.uvi}`);
    // THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
    var uvi = response.current.uvi;
    if (uvi <= 2) {
      uviSpan.addClass("badge badge-success");
    } else if (uvi <= 5) {
      uviSpan.addClass("badge badge-warning");
    } else if (uvi <= 7) {
      uviSpan.addClass("badge");
      uviSpan.css("background-color", "orange");
    } else if (uvi <= 9) {
      uviSpan.addClass("badge badge-danger");
    } else {
      uviSpan.addClass("badge");
      uviSpan.css("background-color", "purple");
      uviSpan.css("color", "white");
    }
    $("#uv-index").append(uviSpan);
  });
}
