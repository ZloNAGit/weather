import React, { useState, useEffect } from "react"
const { OPEN_WEATHER_KEY } = require("./config.js");

export default function LandingPage() {
  const [weather, updateWeather] = useState()
  const [city, updateCity] = useState("Tampa")
  const [state, updateState] = useState("Florida")

  async function getData(city, state) {
    const [lat, long] = await getLocation(city, state)
    getWeather(lat, long)
  }

  async function getLocation(city, state) {
    const query = `${city},${state},US`
    const limit = 1
    const key = OPEN_WEATHER_KEY

    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=${limit}&appid=${key}`
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
      console.log("weather data: ", data)
    }
  }

  useEffect(() => {
    getData(city, state)
  }, [city, state])

  return (
    <div> Placeholder </div>
  );
}