// * HTML Elements
var weatherCard = document.getElementById("weatherCard");
var searchBtn = document.getElementById("search");
var countryName = document.getElementById("countryName");
var forcastIcon = document.getElementById("forcastIcon");
var currentIcon = document.getElementById("currentIcon");
// ? app variables
// & function

async function USGetweather(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async function showPosition(position) {
          var latitude = position.coords.latitude;
          var longitude = position.coords.longitude;
          var coords = {lat : latitude,
              lon : longitude,
          };
          var response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=9c2416cdc6d44c5ea7a95013250105&q=${coords.lat},${coords.lon}&days=3`);
          var data = await response.json();
          console.log(data)
          console.log(data.forecast.forecastday[1].day.maxtemp_c)
          console.log(data.forecast.forecastday.length);
          displayData(data)
          console.log(coords)
          return coords
        });
      }  
}



function displayData(data){
    var weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    d = new Date();
    for(i=0; i<data.forecast.forecastday.length; i++){
        if(i ==0){
            var day = weekday[d.getDay()+i];
            weatherCard.innerHTML += `<div class="col-md-4 col-sm-12 g-2">
                                <div class="inner">
                                    <div class="card bg-black text-white p-3">
                                        <div class="date d-flex justify-content-between">
                                            <p>${day}</p><p>${data.forecast.forecastday[i].date}</p>
                                        </div>
                                        <div class="content">
                                            <div class="d-flex justify-content-between"><p>${data.location.country}</p> <p>${data.location.name}</p></div>
                                            <p class="h3">${data.forecast.forecastday[i].day.maxtemp_c}&deg;C</p>
                                            <div id="currentIcon"><img src="https:${data.current.condition.icon}" alt="" width="90"></div>
                                            <p>${data.current.condition.text}</p>
                                            <div class="weatherDetails d-flex justify-content-around">
                                                <p><i class="fa-solid fa-cloud-rain"></i> ${data.forecast.forecastday[i].day.daily_chance_of_rain} mm</p>
                                                <p><i class="fa-solid fa-wind"></i> ${data.current.vis_km} km/hr</p>
                                                <p><i class="fa-solid fa-compass"></i> ${data.current.wind_dir}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>`
            
        }else{
            var day = weekday[d.getDay()+i];
            weatherCard.innerHTML += `<div class="col-md-4 col-sm-12 g-2">
                                <div class="inner">
                                    <div class="card bg-black text-white p-3">
                                        <div class="date d-flex justify-content-between">
                                            <p>${day}</p><p>${data.forecast.forecastday[i].date}</p>
                                        </div>
                                        <div class="content">
                                            <div class="d-flex justify-content-between"><p>${data.location.country}</p> <p>${data.location.name}</p></div>
                                            <p class="h3">${data.forecast.forecastday[i].day.maxtemp_c}&deg;C</p>
                                            <div id="forcastIcon"><img src="https:${data.forecast.forecastday[i].day.condition.icon}" alt="" width="90"></div>
                                            <p>${data.current.condition.text}</p>
                                            <div class="weatherDetails d-flex justify-content-around">
                                                <p><i class="fa-solid fa-cloud-rain"></i> ${data.forecast.forecastday[i].day.daily_chance_of_rain} mm</p>
                                                <p><i class="fa-solid fa-wind"></i> ${data.current.vis_km} km/hr</p>
                                                <p><i class="fa-solid fa-compass"></i> ${data.current.wind_dir}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>`
            
        };
    };
};
   

// oninput search function one way
  async function searchCoun(){
    if (countryName.value.length==4){
        var country = countryName.value.substring(0, 4);
        console.log(country);
        var response = await fetch(`https://api.weatherapi.com/v1/search.json?key=9c2416cdc6d44c5ea7a95013250105&q=${country}`);
        var countryData = await response.json();
        var response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=9c2416cdc6d44c5ea7a95013250105&q=${countryData[0].lat},${countryData[0].lon}&days=3`);
        var data = await response.json();
        console.log(data)
        weatherCard.innerHTML="";
        displayData(data);
  };
};
  
// addevent function for search another way
 async function searchCountry(){
    var country = countryName.value.substring(0, 4);
    console.log(country);
    var response = await fetch(`https://api.weatherapi.com/v1/search.json?key=9c2416cdc6d44c5ea7a95013250105&q=${country}`);
    var countryData = await response.json();
    console.log(countryData); 
    console.log(countryData[0].lat); 
    console.log(countryData[0].lon); 
    var response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=9c2416cdc6d44c5ea7a95013250105&q=${countryData[0].lat},${countryData[0].lon}&days=3`);
    var data = await response.json();
    console.log(data)
    weatherCard.innerHTML="";
    displayData(data); 
 };

// * events

searchBtn.addEventListener("click", searchCountry);

USGetweather();




// function getLocation() {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(async function showPosition(position) {
//         var latitude = await position.coords.latitude;
//         var longitude = await position.coords.longitude;
//         var coords = {lat : latitude,
//             lon : longitude,
//         };
//         console.log(coords)
//         return coords
//       });
//     } else {
//       x.innerHTML = "Geolocation is not supported by this browser.";
//     }
//   }
 