const apiKey = "n9YazxwN70lUO9Te7hZZYBOTYe9EXxJs";
const locationCity = document.querySelector(".location-city-text");
const locationTemperature = document.querySelector(
  ".location-temperature-text"
);
const geolocalBtn = document.querySelector(".geolocal-icon");
const cover = document.querySelector(".cover");
const loading = document.querySelector(".loading");

//FUNCTION CAPITALIZE WORD
const firstUpper = function (word) {
  return word[0].toUpperCase() + word.slice(1);
};

//GET CORDS
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

//GET CITY FROM CORDS AND CHANGING UI
const getCity = async function (lat, lng) {
  try {
    const geo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    if (!geo.ok) throw new Error("Getting problem get location");
    const dataGeo = await geo.json();
    const city = dataGeo.city.toLowerCase();

    locationCity.innerHTML = firstUpper(city);
    locationTemperature.textContent = 23;

    loading.classList.add("none");
    cover.classList.remove("none");

    console.log(city);
  } catch (err) {
    console.log(err);
  }
};


const getCityApi = async function(city){
  try{
    const data = await fetch(`https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${city}`)
    const res = await data.json()

    console.log(res);
  }catch(err){
    console.log(err);
  }

}

getCityApi('milan')

// const getWeatherToday =async function () {
//   try{
//     const data = await fetch(`https://dataservice.accuweather.com/currentconditions/v1/${id}?apikey=${apiKey}`)

//   }catch(err){
//     console.log(err);
//   }
// };
// const getWeatherNext5Days = [];






const geolocal = function () {
  loading.classList.remove("none");
  cover.classList.add("none");

  getPosition().then((res) => {
    const { latitude: lat, longitude: lng } = res.coords;

    getCity(lat, lng);
  });
};

geolocalBtn.addEventListener("click", geolocal);
