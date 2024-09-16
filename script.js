let temp = document.querySelector(".temp");
let cityElement = document.querySelector(".city");
let wind = document.querySelector(".wind");
let humidity = document.querySelector(".humidity");
let userInput = document.querySelector(".search input");
let searchBox = document.querySelector(".search button");
let icon = document.querySelector(".icon i");

let KEY = "927986a68c5945fdb80131140241509";
let URL = "http://api.weatherapi.com/v1/current.json";

let getWeatherData = async () => {
  let city = userInput.value.trim();

  if (city === "") {
    alert("Pleace enter a city name!");
    return;
  }

  try {
    let response = await fetch(`${URL}?key=${KEY}&q=${city}&units=metric`);
    let result = await response.json();
    console.log(response);

    cityElement.textContent = `${result.location.name}`;
    temp.textContent = `${result.current.temp_c}°C`;
    wind.textContent = `${result.current.wind_kph} kph`;
    humidity.textContent = `${result.current.humidity} %`;

    let condition = result.current.condition.text.toLowerCase();
    updateWeatheIcon(condition);

    userInput.value = "";
  } catch (error) {
    console.error("Error fetching weather data:", error);
    alert("Unable to fetch data for the entered city. Please check the city name and try again.");
  }
};

let updateWeatheIcon = (condition) => {
  if (condition.includes("cloud")) {
    icon.className = "fa-solid fa-cloud";
  } else if (condition.includes("rain")) {
    icon.className = "fa-solid fa-cloud-showers-heavy";
  } else if (condition.includes("clear") || condition.includes("sun")) {
    icon.className = "fa-regular fa-sun";
  } else if (condition.includes("snow")) {
    icon.className = "fa-regular fa-snowflake";
  } else if (condition.includes("thunder")) {
    icon.className = "fa-solid fa-cloud-bolt";
  } else {
    icon.className = "fa-solid fa-cloud";
  }
};

searchBox.addEventListener("click", getWeatherData);

userInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    getWeatherData();
  }
});
