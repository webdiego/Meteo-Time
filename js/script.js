
const apiKey = "n9YazxwN70lUO9Te7hZZYBOTYe9EXxJs";

const getCity = async function(city){
  try {
    const res = await fetch(`https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${city}`);

    const data = await res.json();
    
    console.log(data[0]);
    return data[0]

  }catch(err){
    console.log(err)
  }

}

getCity('rome')
// const getWeather = async function(Key){
//  try{
//   const res = await fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/1day/${Key}?apikey=${apiKey}`);
//   const data = await res.json();
//   console.log(data);
//  }catch(err){
//    console.log(err);
//  }
// }


// getWeather('214046')

