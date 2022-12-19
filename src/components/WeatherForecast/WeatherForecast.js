import React from "react";
import {
  Accordion,
  AccordionItemHeading,
  AccordionItem,
  AccordionItemPanel,
  AccordionItemButton,
} from "react-accessible-accordion";
//style
import "./style/style.scss";

const WEEK_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function WeatherForecast({ ...props }) {
  //get the current day of the week
  const currentDay = new Date().getDay();
  /*
  determine the day in the week (1-7), 
  cut out the days passed and attach them be to be cycled through again
  */
 const forecastDays = WEEK_DAYS.slice(currentDay, WEEK_DAYS.length)
 .concat(WEEK_DAYS.slice(0, currentDay));

  return (
    <>
      <label className="title">Daily</label>
      <Accordion allowZeroExpanded>
        {props.data.list.splice(0, 7).map((items, index) => (
          <AccordionItem key={index}>
            <AccordionItemHeading>
              <AccordionItemButton>
                <div className="daily_item">
                  <img
                    alt="weather"
                    className="icon small"
                    src={require(`../../icons/${items.weather[0].icon}.png`)}
                  />
                  <label className="day">{forecastDays[index]}</label>
                  <label className="description">{items.weather[0].description}</label>
                  <label className="min_max">
                    {Math.round(items.main.temp_min)} °C / {Math.round(items.main.temp_max)} °C 
                  </label>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <div className="daily_details_grid">
                <div className="daily_details_grid_item">
                  <label>Pressure</label>
                  <label>{items.main.pressure}</label>
                </div>
                <div className="daily_details_grid_item">
                  <label>Humidity</label>
                  <label>{items.main.humidity}</label>
                </div>
                <div className="daily_details_grid_item">
                  <label>Clouds</label>
                  <label>{items.clouds.all} %</label>
                </div>
                <div className="daily_details_grid_item">
                  <label>Wind Speed</label>
                  <label>{items.wind.speed} m/s</label>
                </div>
                <div className="daily_details_grid_item">
                  <label>Sea level</label>
                  <label>{items.main.sea_level} m</label>
                </div>
                <div className="daily_details_grid_item">
                  <label>Feels like</label>
                  <label>{Math.round(items.main.feels_like)} °C</label>
                </div>
              </div>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
}
