import React from "react"

export default function ForecastCard({weather}) {
  if (!weather || weather.day === undefined) {
    return null
  }
  return (
    <div className="card text-center col">
      <h4>{weather.day} - {weather.weather}</h4>
      <div>
        <div>High - {Math.round(weather.high)}°</div>
        <div>Low - {Math.round(weather.low)}°</div>
      </div>
    </div>
  )
}