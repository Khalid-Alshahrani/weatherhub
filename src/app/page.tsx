"use client";

import { useState } from "react";

export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<any>(null);

  const handleSearch = async () => {
    if (!city.trim()) return;

    const response = await fetch(`/api/forecast?city=${city}`);
    const data = await response.json();

    const fiveDays = [
      data.list[0],
      data.list[8],
      data.list[16],
      data.list[24],
      data.list[32],
    ];

    setWeather({
      city: data.city,
      forecast: fiveDays,
    });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-100 to-slate-200 flex items-center justify-center p-6">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl p-8">

        <h1 className="text-5xl font-bold text-center text-slate-800 mb-8">
          WeatherHub
        </h1>

        <div className="flex gap-4 mb-8">
          <input
            type="text"
            placeholder="Enter city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="flex-1 border rounded-xl px-5 py-4 text-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={handleSearch}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 rounded-xl text-lg font-semibold transition"
          >
            Search
          </button>
        </div>

        {weather && (
          <>
            <h2 className="text-3xl font-bold text-slate-800 text-center mb-8">
              📍 {weather.city.name}
            </h2>

            <div className="grid grid-cols-5 gap-5">

              {weather.forecast.map((day: any, index: number) => (

                <div
                  key={index}
                  className="bg-white border rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition duration-300 cursor-pointer p-5 text-center"
                >

                  <h3 className="font-bold text-slate-700 mb-4">
                    {new Date(day.dt_txt).toLocaleDateString("en-US", {
                      weekday: "short",
                    })}
                  </h3>

                  <div className="text-5xl mb-4">
                    ☀️
                  </div>

                  <p className="text-3xl font-bold text-slate-800">
                    {Math.round(day.main.temp)}°
                  </p>

                  <p className="text-sm text-slate-500 mt-4">
                    💧 {day.main.humidity}%
                  </p>

                  <p className="text-sm text-slate-500">
                    🌬 {Math.round(day.wind.speed)} m/s
                  </p>

                </div>

              ))}

            </div>
          </>
        )}

      </div>
    </main>
  );
}