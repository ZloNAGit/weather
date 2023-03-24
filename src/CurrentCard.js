import React from "react"

export default function CurrentCard({weather}) {
  if (!weather) {
    return null
  }
  return (
    <div className="text-center">
      <div className="card">
        <h2 className="text-center">Weather Today in {weather.name}</h2>
        <div>
          <div>{Math.round(weather.main.temp)}° - {weather.weather[0].main}</div>
        </div>
        <div>
          <div>Humidity - {weather.main.humidity}%</div>
          <div>Pressure - {weather.main.pressure} hPa</div>
          <div>High / Low - {Math.round(weather.main.temp_max)}° / {Math.round(weather.main.temp_min)}°</div>
          <div>Wind Speed - {Math.round(weather.wind.speed)} mph</div>
        </div>
      </div>
    </div>
  )
}