var long=0;
var lat=0;
var city="";
var countr="";
var temperatureC=0;
var temperatureF=0;
var conditions="";
var humidity=0;
var id=0;
var weatherIcon="";
var iconUrl="";

var imageWeather = {
  "thunder": {
    "url":"https://source.unsplash.com/trnTvywx2Rg/1600x900",
    "credit":"Marc Wieland",
    "uSplash":"https://unsplash.com/@marcwieland95"},
  "rainy": {
    "url":"https://source.unsplash.com/mYOea-xnu-k/1600x900",
    "credit":"Freddie Marriage",
    "uSplash":"https://unsplash.com/@fredmarriage"},
  "cloudy": {
    "url":"https://source.unsplash.com/GnSUxDu5YB4/1600x900",
    "credit":"Benjamin Child",
    "uSplash":"https://unsplash.com/@bchild311"},
  "snow": {
    "url":"https://source.unsplash.com/QLi7bGPxwtM/1600x900",
    "credit":"Filip Gielda",
    "uSplash":"https://unsplash.com/@filipovsky"},
  "sunny": {
    "url":"https://source.unsplash.com/f3s9JUjahhs/1600x900",
    "credit":"Fritz Bielmeier",
    "uSplash":"https://unsplash.com/@fritzbielmeier"},
  "haze": {
    "url":"https://source.unsplash.com/jYChcwbXqnI/1600x900",
    "credit":"Thomas Morter Laing",
    "uSplash":"https://unsplash.com/@t_g_m_l"},
  "nasa": {
    "url":"https://source.unsplash.com/yZygONrUBe8/1600x900",
    "credit":"NASA",
    "uSplash":"https://unsplash.com/@nasa"}
}

function selectImage(id) {
  if (id >= 200 && id <= 232) {
    image = imageWeather.thunder.url;
    imageCred = imageWeather.thunder.credit;
    imageUn = imageWeather.thunder.uSplash;
  } else if (id >= 300 && id <= 531) {
    image = imageWeather.rainy.url;
    imageCred = imageWeather.rainy.credit;
    imageUn = imageWeather.rainy.uSplash;
  } else if (id >= 600 && id <= 622) {
    image = imageWeather.snow.url;
    imageCred = imageWeather.snow.credit;
    imageUn = imageWeather.snow.uSplash;
  } else if (id == 721) {
    image = imageWeather.haze.url;
    imageCred = imageWeather.haze.credit;
    imageUn = imageWeather.haze.uSplash;
  } else if (id >= 801 && id <= 804) {
    image = imageWeather.cloudy.url;
    imageCred = imageWeather.cloudy.credit;
    imageUn = imageWeather.cloudy.uSplash;
  } else if (id === 800) {
    image = imageWeather.sunny.url;
    imageCred = imageWeather.sunny.credit;
    imageUn = imageWeather.sunny.uSplash;
  } else {
    image = imageWeather.nasa.url;
    imageCred = imageWeather.nasa.credit;
    imageUn = imageWeather.nasa.uSplash;
  }
  
  // jQuery to change background
  $("body").css("background-image","url(" + image + ")")
}


$( document ).ready(function() {

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      
      lat=position.coords.latitude;
      long=position.coords.longitude;
      console.log(lat,long);
      newfn();
     
    });
  }
  

  function newfn(){
  $.get("https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" +long +"&units=metric"+ "&appid=152ee5c94fde368ff8fd1c012f591551" , function(json){
    console.log(json.main.temp);
    temperatureC=Math.round(json.main.temp);
    temperatureF=Math.round(temperatureC*9/5+32);
    conditions=json.weather[0]["main"];
    humidity=json.main.humidity;
    id=json.weather[0]["id"]
    city=json.name;
    countr=json.sys.country;
    console.log(city,countr);
    
    weatherIcon = json.weather[0]["icon"];
    iconUrl = "http://openweathermap.org/img/w/" + weatherIcon + ".png";

    $("#city").html(city);
    $("#country").html(countr);

    $("#temperatureC").html(temperatureC+"&degC");
    $("#temperatureF").html(temperatureF+"&degF");
    $("#conditions").html(conditions);
    $("#humidity").html(humidity);
    //$("#icon").html("<img src=http://openweathermap/img/w/"  +  weatherIcon  +  ".png>")
    $("#icon").attr("src", iconUrl);
    selectImage(id);
    //$("#icon").html(json.weather[0]["icon"]);
  }); 
  } 
  //

  $("#temperature").on("click",function(){
    $("#temperatureC").toggleClass("hideTemp");
    $("#temperatureF").toggleClass("hideTemp");

  });

 ///////////////////////////////Document.ready wala
});

