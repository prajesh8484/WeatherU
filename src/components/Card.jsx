import React from "react";
import { useEffect, useState } from "react";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import OpacityIcon from "@mui/icons-material/Opacity";
import CloudIcon from "@mui/icons-material/Cloud";
import CompressIcon from "@mui/icons-material/Compress";
import AirIcon from "@mui/icons-material/Air";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import "./Card.css";
import Loader from "./Loader.jsx";

function Card({ weather }) {

  const [loading, setLoading] = useState(true);

  function getWeatherImage(temp, humidity, weatherCondition) {
    if (
      temp <= 5 &&
      (weatherCondition === "Snow" || weatherCondition === "light snow")
    ) {
      return "Images/winter-scenery.jpg";
    } else if (
      weatherCondition.includes("rain") ||
      weatherCondition.includes("clouds")
    ) {
      return "Images/weather-raining-on-city-building.jpg";
    } else if (temp > 32 && humidity < 20) {
      return "Images/desert-panoramawith-palm-trees.jpg";
    } else if (temp > 20 && humidity < 50) {
      return "Images/clear-blue-sky.jpg";
    } else if (temp > 10 && temp <= 20 && humidity > 30) {
      return "Images/natural-landscape-fall-season.jpg";
    } else if (
      humidity > 70 ||
      weatherCondition.includes("rain") ||
      weatherCondition.includes("clouds")
    ) {
      return "Images/weather-raining-on-city-building.jpg";
    } else if (temp <= 10) {
      return "Images/winter-scenery.jpg";
    } else {
      return "Images/clear-blue-sky.jpg";
    }
  }

  const imageToRender = getWeatherImage(
    weather.main.temp,
    weather.main.humidity,
    weather.weather[0].description
  );

  function getFavicon(temp, weatherCondition) {
    if (weatherCondition.includes("clouds")) {
      return "clouds-32.png";
    } else if (
      imageToRender === "Images/weather-raining-on-city-building.jpg"
    ) {
      return "rain-32.png";
    } else if (
      temp <= 5 &&
      (weatherCondition === "snow" || weatherCondition === "light snow")
    ) {
      return "winter-32.png";
    } else if (weatherCondition.includes("haze")) {
      return "haze-32.png";
    } else {
      return "sun-32.png";
    }
  }

  useEffect(() => {
    const favicon = getFavicon(
      weather.main.temp,
      weather.weather[0].description
    );
    const link =
      document.querySelector("link[rel*='icon']") ||
      document.createElement("link");
    link.type = "image/x-icon";
    link.rel = "icon";
    link.href = `Icons/${favicon}`;
    document.getElementsByTagName("head")[0].appendChild(link);
  }, [weather]);

  useEffect(() => {
    const img = new Image();
    img.src = imageToRender;
    img.onload = () => {
      setLoading(false); 
    };
  }, [imageToRender]);

  if (loading) {
    return (
      <>
        <br /><br /><br /><br /><br />
        <Loader />
        <h5>Fetching weather data...</h5>
      </>
    );
  }

  return (
    <div className="card">
      <div className="card-image">
        <img src={imageToRender} alt="Weather condition" />
      </div>
      <div className="horizontal-break"></div>
      <div className="categoryDiv">
        <div className="category">{weather.name}</div>
        <div className="category">
          ({weather.coord.lat}° N, {weather.coord.lon}° E)
        </div>
      </div>
      <div className="infogrid">
        <div className="info1">
          <div className="heading">
            {" "}
            <DeviceThermostatIcon fontSize="small" /> Temperature:{" "}
            {weather.main.temp}°C
          </div>
          <div className="heading">
            <OpacityIcon fontSize="small" /> Humidity: {weather.main.humidity}%
          </div>
          <div className="heading">
            <CloudIcon fontSize="small" />
            &nbsp;Condition: {weather.weather[0].main}
          </div>
        </div>
        <div className="vr"></div>
        <div className="info1">
          <div className="heading">
            {" "}
            <CompressIcon fontSize="small" /> Pressure: {weather.main.pressure}
            hPa
          </div>
          <div className="heading">
            <AirIcon fontSize="small" /> Wind Speed: {weather.wind.speed}m/s
          </div>
          <div className="heading">
            <RemoveRedEyeIcon fontSize="small" />
            &nbsp;Visibility : {weather.visibility}m
          </div>
        </div>
      </div>

      <div className="footerInfo">
        <div className="author">
          <span className="name">Description: </span>
          {weather.weather[0].description}
        </div>

        <div className="author">
          <span className="name">Country: </span>
          {weather.sys.country}
        </div>
      </div>
    </div>
  );
}

export default Card;