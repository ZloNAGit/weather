import React, { useState, useEffect } from "react"
import Search from './Search.js'
import CurrentCard from './CurrentCard.js'
const { OPEN_WEATHER_KEY } = require("./config.js");

export default function LandingPage() {
  const [weather, updateWeather] = useState({})
  const [forecast, updateForecast] = useState([])
  const [city, updateCity] = useState("Tampa")

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
      updateForecast(data.list)
    }
  }

  useEffect(() => {
    getData(city)
  }, [city])

  return (
    <>
      <Search updateCity={updateCity}/>
      <h1>Current Weather</h1>
      <CurrentCard weather={weather}/>
      <table>
        <thead>
          <tr>
            <th>Placeholder</th>
          </tr>
        </thead>
        <tbody>

        </tbody>
      </table>
    </>
  );
}