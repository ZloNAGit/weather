import React, { useState, useEffect } from "react"
import Search from './Search.js'
import CurrentCard from './CurrentCard.js'
import ForecastCard from './ForecastCard.js'
const { OPEN_WEATHER_KEY } = require("./config.js");

export default function LandingPage() {
  const [weather, updateWeather] = useState()
  const [forecast, updateForecast] = useState([])
  const [city, updateCity] = useState()

  async function getData(city) {
    const [lat, long] = await getLocation(city)
    getWeather(lat, long)
    getForecast(lat, long)
  }

  async function getLocation(city) {
    const limit = 1
    const key = OPEN_WEATHER_KEY
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=${limit}&appid=${key}`

    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()
      const lat = data[0]['lat']
      const long = data[0]['lon']

      return [lat, long]
    }
  }

  async function getWeather(lat, long) {
    const key = OPEN_WEATHER_KEY

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}&units=imperial`
    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()
      updateWeather(data)
    }
  }

  async function getForecast(lat, long) {
    const key = OPEN_WEATHER_KEY

    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${key}&units=imperial`
    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()

      const forecastList = []
      const today = new Date().getDay()

      const days = new Array(7)
      for (let i = 0; i < days.length; i++) {
        days[i] = []
      }

      // Sort data by day
      for (let i = 0; i < data.list.length; i++) {
        const currentForecastDay = new Date(data.list[i].dt_txt).getDay()
        if (currentForecastDay === today) continue

        days[currentForecastDay].push(data.list[i])
      }

      // Build individual daily forecast
      const daysAsIndex = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
      for (let i = 0; i < days.length; i++) {
        if (days[i].length === 0) {
          forecastList.push({})
          continue
        }

        const individualForecast = {
          day: daysAsIndex[i],
          weather: days[i][0].weather[0].main,
          high: -Infinity,
          low: Infinity,
        }

        for (let j = 0; j < days[i].length; j++) {
          if (individualForecast["high"] < days[i][j].main.temp_max) individualForecast["high"] = days[i][j].main.temp_max
          if (individualForecast["low"] > days[i][j].main.temp_min) individualForecast["low"] = days[i][j].main.temp_min
        }

        forecastList.push(individualForecast)
      }

      // Sort forecast into appropriate daily order
      const sortedForecast = forecastList.slice(today).concat(forecastList.slice(0,today))

      updateForecast(sortedForecast)
    }
  }

  useEffect(() => {
    getData(city)
  }, [city])

  return (
    <div>
      <Search updateCity={updateCity}/>
      <h1 className="text-center">Weather App</h1>
      {!city ?
        <div className="text-center">To Begin, Please Enter a City Above</div>
      :
        <div className="position-relative">
          <CurrentCard weather={weather}/>
          <h3 className="text-center">Forecast</h3>
          <div className="row align-items-start">
            {forecast.length === 0 ? null : forecast.map(day => {
              return (
                <ForecastCard weather={day}/>
              )
            })}
          </div>
        </div>
      }
    </div>
  );
}