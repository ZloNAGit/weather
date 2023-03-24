import React from "react"

export default function CurrentCard({weather}) {
  return (
    <div>
      <h2>Weather Today in {weather.name}</h2>
      <div>
        <div>{weather.main.temp}°</div>
      </div>
      <div>
        <div>Humidity - {weather.main.humidity}</div>
        <div>Pressure - {weather.main.pressure}</div>
        <div>High/Low - {Math.round(weather.main.temp_max)}°/{Math.round(weather.main.temp_min)}°</div>
        <div>Wind Speed - {Math.round(weather.wind.speed)} mph</div>
      </div>
    </div>
  )
}