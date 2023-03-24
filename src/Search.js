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
      <div className="input-group mb-3">
        <input onChange={handleChange} value={value} className="form-control" placeholder="Search By City" required type="text" name="weather" id="weather" />
        <button type="button" className="btn btn-outline-dark">Search Weather</button>
      </div>
    </form>
  )
}