//API KEY
const apiKey = "5f1002c6c18243bc98814327210202";

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

const nextDay1 = document.querySelector('.next-day-1')
const nextDayDeg1 = document.querySelector('.next-deg-1')
const nextDay2 = document.querySelector('.next-day-2')
const nextDayDeg2 = document.querySelector('.next-deg-2')
const nextDay3 =document.querySelector('.next-day-3')
const nextDayDeg3 = document.querySelector('.next-deg-3')

const nextIcon1 = document.querySelector('.next-img-1')
const nextIcon2 = document.querySelector('.next-img-2')
const nextIcon3 =document.querySelector('.next-img-3')

const app = document.querySelector(".app");
//SEARCH LOCATION BTN
const geoLocalBtn = document.querySelector(".geolocal-icon");
const searchBtn = document.querySelector(".search-icon-2");
const searchInput = document.querySelector(".search-input");

//UI ELEMENTS
const cover = document.querySelector(".cover");
const loading = document.querySelector(".loading");


//ICONS BASE ON DAY OR NIGHT AND CONDITIONS
const weatherImgDay = function (el,text) {
  if (text.includes("rain" && "heavy" || 'Torrential' && 'rain')) {
    el.src = "./img/heavyrain.png";
  } else if (text.includes("snow" || 'blizard' || 'freezing' && 'drizzle' || 'ice' )) {
    el.src = "./img/snow.png";
  } else if (text.includes("light" && "rain")) {
    el.src = "./img/lightrain.png";
  } else if (text.includes( 'overcast' || 'Mist' || 'fog')) {
    el.src = "./img/clouds.png";
  }else if(text.includes('light' && 'rain' || 'moderate' && 'rain' || 'light' && 'sleet')){
    el.src = "./img/lightrain.png";
  }else if(text.includes('thundery' || 'thunder' )){
    el.src = "./img/thunderstorm2.png"
  }else if(text.includes('clear')){
    el.src='./img/sun.png'
  }else if(text.includes('Partly cloudy')){
    el.src = './img/sunclouds.png'
  }
};
const weatherImgNight = function (el,text) {
  if (text.includes("rain" && "heavy" || 'Torrential' && 'rain')) {
    el.src = "./img/moonrain.png";
  } else if (text.includes("snow" || 'blizard' || 'freezing' && 'drizzle' || 'ice' )) {
    el.src = "./img/snow.png";
  } else if (text.includes("cloudy" || 'overcast' || 'mist' || 'Fog')) {
    el.src = "./img/moonclouds.png";
  }else if(text.includes('light' ||'light' && 'rain' || 'moderate' && 'rain' || 'light' && 'sleet')){
    el.src = "./img/moonrain.png";
  }else if(text.includes('thundery' || 'thunder' )){
    el.src = "./img/moonthunderstorm.png"
  }else if(text.includes('clear')){
    el.src='./img/moon.png'
  }
};


//*FUNCTION CAPITALIZE WORD
const firstUpper = function (word) {
  return word[0].toUpperCase() + word.slice(1);
};
//*FUNCTION DAY-NIGHT
const isDayTime = function (dayTime ,el, text) {
  if (dayTime === 1) {
    app.classList.remove("bg-night");
    app.classList.add("bg-day");
    weatherImgDay(el,text)
  } else if(dayTime === 0) {
    weatherImgNight(el,text)
    app.classList.remove("bg-day");
    app.classList.add("bg-night");
  }
};
//*FUNCTIONS ADD OR REMOVE LOADING COVER
const addLoad = function () {
  loading.classList.remove("none");
  cover.classList.add("none");
};
const removeLoad = function () {
  loading.classList.add("none");
  cover.classList.remove("none");
};

 const dateNameTemperature= function(day , number ,temperature){
  const dates = new Date(day)
  console.log(dates);

  const dayName = dates.toString().substr(0,3)
  console.log(dayName);
  nextDay1.innerHTML = `${dayName}`
  // `nextDayDeg${number}`.innerHTML= `${temperature} °`

}

//*GET CORDS
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const getWeather = async function (city,subCity) {
  try {
    addLoad();
    //Current weather
    const dataToday = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3`
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

    //Add location name UI based on if the location was search by geoLocal or not
    if(!subCity){
      locationCity.innerHTML = `${name}`;
    }else{
      locationCity.innerHTML = `${subCity}`
    }

    //ADD HUMIDITY ,WIND,DAYTIME AND ICONS
    const {
      current: { humidity: humidity, wind_kph: wind, is_day: day },
    } = resToday;
    isDayTime(day, weatherIcon ,text);
    humidityEl.innerHTML = `${humidity} %`;
    windEl.innerHTML = `${wind} Km/h`;

    const {forecast : { forecastday : [day_1 ,day_2,day_3]}} =resToday
   
    const {day:{avgtemp_c : temper_1, condition: {text:text_1}} , date: date_1} = day_1
    const {day:{avgtemp_c : temper_2 , condition: {text:text_2}} , date: date_2} = day_2
    const {day:{avgtemp_c : temper_3, condition: {text:text_3}} , date: date_3} = day_3

    //todo REFACTORING NEED
    const day1 = new Date(date_1).toString().substr(0,3) 
    nextDay1.innerHTML = `${day1}`
    nextDayDeg1.innerHTML= `${temper_1} °`
    weatherImgDay(nextIcon1, text_1)

    const day2 = new Date(date_2).toString().substr(0,3) 
    nextDay2.innerHTML = `${day2}`
    nextDayDeg2.innerHTML= `${temper_2} °`
    weatherImgDay(nextIcon2, text_2)

    const day3 = new Date(date_3).toString().substr(0,3) 
    nextDay3.innerHTML = `${day3}`
    nextDayDeg3.innerHTML= `${temper_3} °`
    weatherImgDay(nextIcon3, text_3)

    //Astronomy - ADD Sunrise/Sunset
    const data = await fetch(`https://api.weatherapi.com/v1/astronomy.json?key=${apiKey}&q=${city}`);
    const res = await data.json();
    const {astronomy: { astro: { sunrise: sun, sunset: set },}} = res;

    sunRiseEl.innerHTML = `${sun.toLowerCase()}`;
    sunSetEl.innerHTML = `${set.toLowerCase()}`;

    //Remove loading once we get all the data 
    removeLoad();
  } catch (err) {
    console.error(`Something wrong : ${err.message}🌚`);
  }
};







//GET CITY FROM CORDS AND THEN THE WEATHER FROM GETWEATHER
const getCity = async function (lat, lng) {
  try {
    const geo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    if (!geo.ok) throw new Error("We are getting problem of geolocalization you😢");
    const dataGeo = await geo.json();

    const {
      poi: { addr_city: cityGeo, addr_suburb: subCity },
    } = dataGeo;
    console.log(dataGeo);
    getWeather(cityGeo ,subCity);
    locationCity.innerHTML = subCity;

    // removeLoad();
  } catch (err) {
    console.error(`Error ${err.message} 😢`);
  }
};

const geoLocal = function () {
  addLoad();

  getPosition().then((res) => {
    const { latitude: lat, longitude: lng } = res.coords;

    getCity(lat, lng);
  });
};

geoLocalBtn.addEventListener("click", geoLocal);

searchBtn.addEventListener("click", function (e) {
  e.preventDefault();
  
  console.log(searchInput.value);
  getWeather(searchInput.value);
});


