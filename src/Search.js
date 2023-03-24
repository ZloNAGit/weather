import React, { useState } from "react"

export default function Search({updateCity}) {
  const [value, updateValue] = useState("")

  function handleSubmit(event) {
    event.preventDefault()
    updateCity(value)
    updateValue("")
  }

  async function handleChange(event) {
    updateValue(event.target.value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input onChange={handleChange} value={value} placeholder="Search By City" required type="text" name="weather" id="weather" />
        <button>Search Weather</button>
      </div>
    </form>
  )
}