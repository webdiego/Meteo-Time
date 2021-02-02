//API KEY
const apiKey = "5Tn027egUBEXjIoaepwAxAUSXxTA5Nnz";
const apiKey2 = "5f1002c6c18243bc98814327210202";

//LOCATION UI
const locationCity = document.querySelector(".location-city-text");
const locationTemperature = document.querySelector(
  ".location-temperature-text"
);
const sunRiseEl = document.querySelector(".details-sunrise");
const sunSetEl = document.querySelector(".details-sunset");
const humidityEl = document.querySelector(".details-humidity");
const windEl = document.querySelector(".details-wind");
const weatherIcon = document.querySelector(".weather-icon");

const app = document.querySelector(".app");
//SEARCH LOCATION BTN
const geolocalBtn = document.querySelector(".geolocal-icon");
const searchBtn = document.querySelector(".search-icon-2");
const searchInput = document.querySelector(".search-input");

//UI ELEMENTS
const cover = document.querySelector(".cover");
const loading = document.querySelector(".loading");



const weatherImgDay = function (text) {
  if (text.includes("rain" && "heavy" || 'Torrential' && 'rain')) {
    weatherIcon.src = "./img/heavyrain.png";
  } else if (text.includes("snow" || 'blizard' || 'freezing' && 'drizzle' || 'ice' )) {
    weatherIcon.src = "./img/snow.png";
  } else if (text.includes("light" && "rain")) {
    weatherIcon.src = "./img/lightrain.png";
  } else if (text.includes( 'overcast' || 'mist' || 'fog')) {
    weatherIcon.src = "./img/lightrain.png";
  }else if(text.includes('light' && 'rain' || 'moderate' && 'rain' || 'light' && 'sleet')){
    weatherIcon.src = "./img/lightrain.png";
  }else if(text.includes('thundery' || 'thunder' )){
    weatherIcon.src = "./img/thunderstorm2.png"
  }else if(text.includes('clear')){
    weatherIcon.src='./img/sun.png'
  }else if(text.includes('Partly cloudy')){
    weatherIcon.src = './img/sunclouds.png'
  }
};
const weatherImgNight = function (text) {
  if (text.includes("rain" && "heavy" || 'Torrential' && 'rain')) {
    weatherIcon.src = "./img/moonrain.png";
  } else if (text.includes("snow" || 'blizard' || 'freezing' && 'drizzle' || 'ice' )) {
    weatherIcon.src = "./img/snow.png";
  } else if (text.includes("light" && "rain")) {
    weatherIcon.src = "./img/lightrain.png";
  } else if (text.includes("cloudy" || 'overcast' || 'mist' || 'Fog')) {
    weatherIcon.src = "./img/moonclouds.png";
  }else if(text.includes('light' && 'rain' || 'moderate' && 'rain' || 'light' && 'sleet')){
    weatherIcon.src = "./img/moonrain.png";
  }else if(text.includes('thundery' || 'thunder' )){
    weatherIcon.src = "./img/moonthunderstorm.png"
  }else if(text.includes('clear')){
    weatherIcon.src='./img/moon.png'
  }
};


//*FUNCTION CAPITALIZE WORD
const firstUpper = function (word) {
  return word[0].toUpperCase() + word.slice(1);
};
//*FUNCTION DAY-NIGHT
const isDayTime = function (dayTime ,text) {
  if (dayTime === 1) {
    app.classList.remove("bg-night");
    app.classList.add("bg-day");
    weatherImgDay(text)
  } else if(dayTime == 0) {
    app.classList.remove("bg-day");
    app.classList.add("bg-night");
    weatherImgNight(text)
  }
};
const addLoad = function () {
  loading.classList.remove("none");
  cover.classList.add("none");
};
const removeLoad = function () {
  loading.classList.add("none");
  cover.classList.remove("none");
};

//*GET CORDS
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const getCityApi = async function (city) {
  try {
    addLoad();
    //Current weather
    const dataToday = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey2}&q=${city}`
    );
    const resToday = await dataToday.json();
    console.log(resToday);
    const {
      current: {
        condition: { text: text },
      },
    } = resToday;
 
    const {
      current: { temp_c: temperature },
    } = resToday;
    locationTemperature.innerHTML = `${temperature}`;
    //ADD Location name in UI
    const {
      location: { name: name },
    } = resToday;
    console.log(resToday);

    locationCity.innerHTML = `${name}`;
    //ADD HUMIDITY ,WIND,DAYTIME AND ICONS
    const {
      current: { humidity: humidity, wind_kph: wind, is_day: day },
    } = resToday;
    isDayTime(day,text);
    humidityEl.innerHTML = `${humidity} %`;
    windEl.innerHTML = `${wind} Km/h`;

    //Astronomy - ADD Sunrise/Sunset
    const data = await fetch(
      `https://api.weatherapi.com/v1/astronomy.json?key=${apiKey2}&q=${city}`
    );
    const res = await data.json();
    const {
      astronomy: {
        astro: { sunrise: sun, sunset: set },
      },
    } = res;
    sunRiseEl.innerHTML = `${sun.toLowerCase()}`;
    sunSetEl.innerHTML = `${set.toLowerCase()}`;

    //Remove loading once we get all the data
    removeLoad();
  } catch (err) {
    console.error(`Something wrong : ${err.message}🌚`);
  }
};

//GET CITY FROM CORDS AND CHANGING UI
const getCity = async function (lat, lng) {
  try {
    const geo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    if (!geo.ok) throw new Error("Getting problem get location");
    const dataGeo = await geo.json();

    const {
      poi: { addr_city: cityGeo, addr_suburb: subCity },
    } = dataGeo;
    getCityApi(cityGeo);
    locationCity.innerHTML = subCity;

    removeLoad();
  } catch (err) {
    console.log(err);
  }
};

const geolocal = function () {
  addLoad();

  getPosition().then((res) => {
    const { latitude: lat, longitude: lng } = res.coords;

    getCity(lat, lng);
  });
};

geolocalBtn.addEventListener("click", geolocal);

searchBtn.addEventListener("click", function (e) {
  e.preventDefault();

  console.log(searchInput.value);
  getCityApi(searchInput.value);
});

