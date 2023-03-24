import React from "react"

export default function ForecastCard({weather}) {
  if (!weather || weather.day === undefined) {
    return null
  }
  return (
    <div>
      <h2>{weather.day} - {weather.weather}</h2>
      <div>
        <div>High - {Math.round(weather.high)}°</div>
        <div>Low - {Math.round(weather.low)}°</div>
      </div>
    </div>
  )
}