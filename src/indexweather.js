function formatDate(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
      hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
  
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`;
}
 
  

  function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
    return days[day];
  }
     function displayForecast(response) {
    let forecast = response.data.daily;
  
    let forecastElement = document.querySelector("#forecast");
  
    let forecastHTML = `<div class="row">`;
    forecast.forEach(function (forecastDay, index) {
      if (index < 6) {
        forecastHTML =
          forecastHTML +
        `<div class="col-2">
          <div>${formatDay(forecastDay.dt)}</div>
          <img
            src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png"
            alt="" id="icon-days"
            />
          <div class="forecast-temp"> ${Math.round(
            forecastDay.temp.max
          )}°  <span class="forecast-temp-min"> ${Math.round(
            forecastDay.temp.min
          )}° </span>
          </div>
        </div>
    `;
          }
    });

    forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
    let apiKey = "e0011d9afadcdf29795388bf3f4d5677";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function cityWeather(response) {
    let h1 = document.querySelector("h1");
    let temperatureElement = document.querySelector("#temperature");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let descriptionElement = document.querySelector("#description");
    let iconElement = document.querySelector ("#icon");
    let dateElement = document.querySelector ("#date");
  celsiusTemperature = response.data.main.temp;

  h1.innerHTML = response.data.name;
  temperatureElement.innerHTML = `${Math.round(celsiusTemperature)}`;
humidityElement.innerHTML = `Humadity: ${response.data.main.humidity}%`;
windElement.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} m/h`;
descriptionElement.innerHTML = response.data.weather[0].main;
iconElement.setAttribute ("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
dateElement.innerHTML = formatDate (response.data.dt * 1000);
getForecast(response.data.coord);
}
  
  function searchCity(city) {
    let apiKey = "e0011d9afadcdf29795388bf3f4d5677";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(cityWeather);
  }
  function buttonSubmit(event) {
    event.preventDefault();
    let city = document.querySelector("#input-city").value;
    searchCity(city);
  }
  function showFahrenheitTemp (event) {
        event.preventDefault ();
        celsiusLink.classList.remove ("active");
        fahrenheitLink.classList.add ("active");
        let fahrenheitTemp = (celsiusTemperature * 9)/5 + 32;
        let temperatureElement = document.querySelector ("#temperature");
        temperatureElement.innerHTML = Math.round(fahrenheitTemp);
    
    }
    function showCelsiusTemp (event) {
        event.preventDefault ();
        fahrenheitLink.classList.remove ("active");
        celsiusLink.classList.add ("active");
        let temperatureElement = document.querySelector ("#temperature");
        temperatureElement.innerHTML = Math.round (celsiusTemperature);
   }
        let searchForm = document.querySelector("#search");
  searchForm.addEventListener("click", buttonSubmit);
    
   let celsiusTemperature = null;
    let fahrenheitLink = document.querySelector ("#fahrenheit-link");
       fahrenheitLink.addEventListener ("click", showFahrenheitTemp);
       let celsiusLink = document.querySelector ("#celsius-link");
       celsiusLink.addEventListener ("click", showCelsiusTemp);
searchCity(city);

function searchLocation(position) {
    let apiKey = "e0011d9afadcdf29795388bf3f4d5677";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  
    axios.get(apiUrl).then(cityWeather);
  }
  navigator.geolocation.getCurrentPosition(searchLocation);
      
    
  
  
  

  
  