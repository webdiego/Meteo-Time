// const apiKey = "n9YazxwN70lUO9Te7hZZYBOTYe9EXxJs";
const locationCity = document.querySelector(".location-city-text");
const locationTemperature = document.querySelector(
  ".location-temperature-text"
);
const geolocalBtn = document.querySelector(".geolocal-icon");
const cover = document.querySelector('.cover')
console.log(geolocalBtn);
// getWeather('milan')

const firstUpper = function (word) {
  return word[0].toUpperCase() + word.slice(1);
};

//GET POSITION GEOLOCALIZATION
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

//GET CITY FROM LOCATIZATION
const getCity = async function (lat, lng) {
  // cover.classList.add('none')
  try {
    const geo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    if (!geo.ok) throw new Error("Getting problem get location");
    const dataGeo = await geo.json();
    const city = dataGeo.city.toLowerCase();
    locationCity.innerHTML = firstUpper(city);
    locationTemperature.textContent = 23;

    //Removing cover from
    cover.classList.remove('none')
  } catch (err) {
    console.log(err);
  }
};

const geolocal = function () {
  getPosition().then((res) => {
    const { latitude: lat, longitude: lng } = res.coords;

    getCity(lat, lng);
  });
};

geolocalBtn.addEventListener("click", geolocal);
