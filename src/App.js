import './App.css';
import { WEATHER_API_KEY, WEATHER_API_URL } from './api/Api';
import Search from './components/search/Search';
import CurrentWeather from './components/currentWeather/CurrentWeather';
import WeatherForecast from './components/WeatherForecast/WeatherForecast';
import { useState } from 'react';
function App() {

  const [currentWeatherReport, setCurrentWeatherReport] = useState(null)
  const [weatherForecastReport, setWeatherForecastReport] = useState(null)
  const defaultLat = 25.3994;
  const defaultLon = 55.47

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
  console.log(currentWeatherReport)
  console.log(weatherForecastReport)

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange}/>
      {currentWeatherReport && <CurrentWeather data={currentWeatherReport}/>}
      {weatherForecastReport && <WeatherForecast data={weatherForecastReport}/>}
    </div>
  );
}

export default App;
