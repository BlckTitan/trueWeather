import './App.css';
import { WEATHER_API_KEY, WEATHER_API_URL } from './api/Api';
import Search from './components/search/Search';
import CurrentWeather from './components/currentWeather/CurrentWeather';
import WeatherForecast from './components/WeatherForecast/WeatherForecast';
import { useEffect, useState } from 'react';
function App() {

  const [currentWeatherReport, setCurrentWeatherReport] = useState(null)
  const [weatherForecastReport, setWeatherForecastReport] = useState(null)
  const [defaultWeatherReport, setDefaultWeatherReport] = useState(null)
  const [defaultForecastReport, setDefaultForecastReport] = useState(null)

  useEffect(()=>{
    defaultWeather()
  }, [])


  //user weather fetch
  const handleOnSearchChange = (searchData) => {
    //lon 55.4797
    //lat 25.3994

    const [lat, lon] = searchData.value.split(" ")
    const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
    const WeatherForecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)
    
    Promise.all([currentWeatherFetch, WeatherForecastFetch])
    .then(async (response) => {
      const currentWeatherResponse  = await response[0].json();
      const weatherForecastResponse  = await response[1].json();

      setCurrentWeatherReport({city: searchData.label, ...currentWeatherResponse});
      setWeatherForecastReport({city: searchData.label, ...weatherForecastResponse});

    })
  }

  //default  weather fetch
  const defaultWeather = () => {
    //lon 55.4797
    //lat 25.3994
    
    const defaultLat = 25.3994;
    const defaultLon = 55.4797
  
    const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${defaultLat}&lon=${defaultLon}&appid=${WEATHER_API_KEY}&units=metric`);
    const WeatherForecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${defaultLat}&lon=${defaultLon}&appid=${WEATHER_API_KEY}&units=metric`)
    
    Promise.all([currentWeatherFetch, WeatherForecastFetch])
    .then(async (response) => {
      const defaultWeatherResponse  = await response[0].json();
      const defaultForecastResponse  = await response[1].json();

      setDefaultWeatherReport({city: 'Ajman, AE', ...defaultWeatherResponse});
      setDefaultForecastReport({city: 'Ajman, AE', ...defaultForecastResponse});

    })
  }

  //for the rendering, if there is a city that's searched for, give us the result of that city else check the value of the default city and return the value of the default city
  
  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange}/>
      {(currentWeatherReport !== null) ? <CurrentWeather data={currentWeatherReport}/> : defaultWeatherReport && <CurrentWeather data={defaultWeatherReport}/>}
      {(weatherForecastReport !== null) ? <WeatherForecast data={weatherForecastReport}/> : defaultForecastReport && <WeatherForecast data={defaultForecastReport}/>}
    </div>
  );
}

export default App;
/*
  {defaultWeatherReport && <CurrentWeather data={defaultWeatherReport}/>}
  {defaultForecastReport && <WeatherForecast data={defaultForecastReport}/>}
  {currentWeatherReport ? <CurrentWeather data={currentWeatherReport}/> : <CurrentWeather data={defaultWeatherReport}/>}
  {weatherForecastReport ? <WeatherForecast data={weatherForecastReport}/> : <WeatherForecast data={defaultForecastReport}/>}
  {(currentWeatherReport !== null) ? <CurrentWeather data={currentWeatherReport}/> : <CurrentWeather data={defaultWeatherReport}/>}
  {(weatherForecastReport !== null) ? <WeatherForecast data={weatherForecastReport}/> : <WeatherForecast data={defaultForecastReport}/>}
 */