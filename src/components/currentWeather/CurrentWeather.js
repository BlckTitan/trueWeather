import React from "react";
//style
import "./style/CurrentWeather.scss";
//img

export default function CurrentWeather({...props}) {
  return (
    <div className="weather">
      <div className="top">
        <div>
          <p className="city">{props.data.city}</p>
          <p className="weather_description">{props.data.weather[0].description}</p>
        </div>
        <img alt="weather" className="weather_icon" src={require(`../../icons/${props.data.weather[0].icon}.png`)} />
      </div>
      <div className="bottom">
        <p className="temprature">{Math.round(props.data.main.temp)}°C</p>
        <div className="details">
          <div className="parameter_row">
            <span className="parameter_label title">DETAILS</span>
          </div>
          <div className="parameter_row">
            <span className="parameter_label">Feels like</span>
            <span className="parameter_value">{Math.round(props.data.main.feels_like)} °C</span>
          </div>
          <div className="parameter_row">
            <span className="parameter_label">Wind</span>
            <span className="parameter_value">{props.data.wind.speed} m/s</span>
          </div>
          <div className="parameter_row">
            <span className="parameter_label">Humidity</span>
            <span className="parameter_value">{props.data.main.humidity} %</span>
          </div>
          <div className="parameter_row">
            <span className="parameter_label">Pressure</span>
            <span className="parameter_value">{props.data.main.pressure} hPa</span>
          </div>
        </div>
      </div>
    </div>
  );
}
