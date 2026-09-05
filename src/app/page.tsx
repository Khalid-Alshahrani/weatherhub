"use client";

import { useState } from "react";

import SearchBar from "@/components/SearchBar";
import ForecastGrid from "@/components/ForecastGrid";

export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!city.trim()) return;

    setLoading(true);

    try {
      const response = await fetch(`/api/forecast?city=${city}`);
      const data = await response.json();

      console.log("Forecast Response:", data);

      if (!response.ok || !data.list) {
        alert("Forecast API failed.");
        return;
      }

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
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-100 to-slate-200 flex items-center justify-center p-6">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl p-8">
        <h1 className="text-5xl font-bold text-center text-slate-800 mb-8">
          WeatherHub
        </h1>

        <SearchBar
          city={city}
          setCity={setCity}
          handleSearch={handleSearch}
          loading={loading}
        />

        {weather && (
          <>
            <h2 className="text-3xl font-bold text-slate-800 text-center mb-8">
              📍 {weather.city.name}
            </h2>

            <ForecastGrid forecast={weather.forecast} />
          </>
        )}
      </div>
    </main>
  );
}