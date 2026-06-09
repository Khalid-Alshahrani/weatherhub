"use client";

import { useState } from "react";

export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<any>(null);

  const handleSearch = async () => {
    if (!city.trim()) return;

    const response = await fetch(`/api/weather?city=${city}`);
    const data = await response.json();

    setWeather(data);
  };

  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6">
        <h1 className="text-4xl font-bold text-center text-slate-800 mb-6">
          WeatherHub
        </h1>

        <div className="flex gap-3 mb-6">
          <input
            type="text"
            placeholder="Enter city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="flex-1 border border-slate-300 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-5 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Search
          </button>
        </div>

        {weather && (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">
              📍 {weather.name}
            </h2>

            <div className="space-y-3 text-slate-700">
              <p className="text-lg">
                🌡️ Temperature:{" "}
                <span className="font-semibold">
                  {weather.main.temp}°C
                </span>
              </p>

              <p className="text-lg">
                💧 Humidity:{" "}
                <span className="font-semibold">
                  {weather.main.humidity}%
                </span>
              </p>

              <p className="text-lg">
                🌬️ Wind Speed:{" "}
                <span className="font-semibold">
                  {weather.wind.speed} m/s
                </span>
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}