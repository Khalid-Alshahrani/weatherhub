"use client";

import { useState } from "react";

export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<any>(null);

  const handleSearch = async () => {
    const response = await fetch(`/api/weather?city=${city}`);

    const data = await response.json();

    setWeather(data);
  };

  return (
    <main>
      <h1>WeatherHub</h1>

      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <button onClick={handleSearch}>
        Search
      </button>

      {weather && (
        <div>
          <h2>{weather.name}</h2>

          <p>Temperature: {weather.main.temp}°C</p>

          <p>Humidity: {weather.main.humidity}%</p>

          <p>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}
    </main>
  );
}