
// const apiKey = "n9YazxwN70lUO9Te7hZZYBOTYe9EXxJs";

// const getCity = async function(city){
//   try {
//     const res = await fetch(`https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${city}`);

//     const data = await res.json();
    
//     console.log(data[0]);
//     getWeatherToday(data[0].Key)
//   }catch(err){
//     console.log(err)
//   }

// }

// getCity('rome')

// const getWeatherToday = async function(Key){
//   try{
//    const res = await fetch(`http://dataservice.accuweather.com/currentconditions/v1/${Key}?apikey=${apiKey}`);
//    const data = await res.json();
//    console.log(data);
//   }catch(err){
//     console.log(err);
//   }
//  }
 

// const getWeather5Days = async function(Key){
//  try{
//   const res = await fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${Key}?apikey=${apiKey}`);
//   const data = await res.json();
//   console.log(data);
//  }catch(err){
//    console.log(err);
//  }
// }

// getWeatherToday('214046')
// getWeather5Days('214046')

