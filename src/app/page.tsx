"use client";

import { useState } from "react";

import SearchBar from "@/components/SearchBar";
import CurrentWeather from "@/components/CurrentWeather";
import ForecastGrid from "@/components/ForecastGrid";

export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<any>(null);
  const [currentWeather, setCurrentWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!city.trim()) return;

    setLoading(true);
    setWeather(null);
    setCurrentWeather(null);

    try {
      const [forecastResponse, currentResponse] = await Promise.all([
        fetch(`/api/forecast?city=${encodeURIComponent(city)}`),
        fetch(`/api/weather?city=${encodeURIComponent(city)}`),
      ]);

      const forecastData = await forecastResponse.json();
      const currentData = await currentResponse.json();

      if (!forecastResponse.ok || !forecastData.list) {
        alert("Forecast API failed.");
        return;
      }

      if (!currentResponse.ok || !currentData.main) {
        alert("Current weather API failed.");
        return;
      }

      const fiveDays = [
        forecastData.list[0],
        forecastData.list[8],
        forecastData.list[16],
        forecastData.list[24],
        forecastData.list[32],
      ];

      setCurrentWeather(currentData);

      setWeather({
        city: forecastData.city,
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

        {loading && (
          <div className="flex flex-col items-center justify-center py-20 animate-pulse">

            <div className="h-14 w-14 rounded-full border-4 border-blue-500 border-t-transparent animate-spin" />

            <p className="mt-6 text-xl font-semibold text-slate-600">
              Searching weather...
            </p>

          </div>
        )}

        {!loading && currentWeather && weather && (
          <>
            <CurrentWeather weather={currentWeather} />

            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-800">
                5-Day Forecast
              </h2>

              <p className="mt-1 text-slate-500">
                Weather forecast for {weather.city.name}
              </p>
            </div>

            <ForecastGrid forecast={weather.forecast} />
          </>
        )}

      </div>
    </main>
  );
}