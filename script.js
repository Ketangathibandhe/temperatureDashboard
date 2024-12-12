
//this is for date time and day 

let dateElement = document.querySelector('.date');
let timeElement = document.querySelector('.time');
let dayElement = document.querySelector('.day');

setInterval(function(){
    let currentDate = new Date();
    // Array of days 
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let currentDay = currentDate.getDay();

    timeElement.innerHTML = `${currentDate.toLocaleTimeString()}`;
    dateElement.innerHTML = `${currentDate.toLocaleDateString()}`;
    dayElement.innerHTML = `${daysOfWeek[currentDay]}`;
}, 1000);



document.addEventListener("DOMContentLoaded", () => {
  // Check for Geolocation API support
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showLocation, checkError);
  } else {
      alert("The browser does not support geolocation");
  }
});

// Error handling for geolocation
const checkError = (error) => {
  switch (error.code) {
      case error.PERMISSION_DENIED:
          alert("Please allow access to location");
          break;
      case error.POSITION_UNAVAILABLE:
          alert("Location information unavailable");
          break;
      case error.TIMEOUT:
          alert("The request to get user location timed out");
          break;
      default:
          alert("An unknown error occurred");
  }
};

// Function to fetch location and weather data
const showLocation = async (position) => {
  try {
      // Fetch location data using Nominatim API
      let response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`
      );
      if (!response.ok) throw new Error("Failed to fetch location data");
      let data = await response.json();

      // Handle various location types
      let city = data.address.city || data.address.town || data.address.village || data.address.hamlet || "Unknown Location";

      // Fetch weather data using WeatherAPI
      let weatherData = await getData(city);

      // Update location element
      document.querySelector('.city1').innerText = `${city} - ${data.address.country}`
      document.querySelector('.temp').innerText = `${weatherData.current.temp_c}℃`
      document.querySelector('.ri-windy-line').innerText = ` ${weatherData.current.wind_kph}kph`
      document.querySelector('.ri-water-percent-fill').innerText = ` ${weatherData.current.humidity}%`
  } catch (error) {
      console.error(error);
      alert("Failed to fetch data. Please check the console for details.");
  }
};

// Function to fetch weather data
async function getData(cityName) {
  try {
      let response = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=62e0ca52f2c6407b8ed103139241212&q=${cityName}&aqi=yes`
      );
      if (!response.ok) throw new Error("Failed to fetch weather data");
      return await response.json();
  } catch (error) {
      console.error(error);
      throw error;
  }
}
