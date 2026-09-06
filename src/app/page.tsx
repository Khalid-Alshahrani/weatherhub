"use client";

import { useState } from "react";
import { LocateFixed } from "lucide-react";

import SearchBar from "@/components/SearchBar";
import CurrentWeather from "@/components/CurrentWeather";
import ForecastGrid from "@/components/ForecastGrid";

export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<any>(null);
  const [currentWeather, setCurrentWeather] =
    useState<any>(null);

  const [loading, setLoading] = useState(false);
  const [locationLoading, setLocationLoading] =
    useState(false);

  const loadWeather = async (
    forecastUrl: string,
    currentUrl: string
  ) => {
    const [forecastResponse, currentResponse] =
      await Promise.all([
        fetch(forecastUrl),
        fetch(currentUrl),
      ]);

    const forecastData = await forecastResponse.json();
    const currentData = await currentResponse.json();

    if (!forecastResponse.ok || !forecastData.list) {
      throw new Error(
        forecastData.error || "Forecast API failed."
      );
    }

    if (!currentResponse.ok || !currentData.main) {
      throw new Error(
        currentData.error ||
        "Current weather API failed."
      );
    }

    const fiveDays = [
      forecastData.list[0],
      forecastData.list[8],
      forecastData.list[16],
      forecastData.list[24],
      forecastData.list[32],
    ].filter(Boolean);

    setCurrentWeather(currentData);

    setWeather({
      city: forecastData.city,
      forecast: fiveDays,
    });

    if (currentData.name) {
      setCity(currentData.name);
    }
  };

  const handleSearch = async () => {
    const trimmedCity = city.trim();

    if (!trimmedCity) return;

    setLoading(true);
    setWeather(null);
    setCurrentWeather(null);

    try {
      const encodedCity =
        encodeURIComponent(trimmedCity);

      await loadWeather(
        `/api/forecast?city=${encodedCity}`,
        `/api/weather?city=${encodedCity}`
      );
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert(
        "Geolocation is not supported by your browser."
      );

      return;
    }

    setLocationLoading(true);
    setWeather(null);
    setCurrentWeather(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const lat =
            position.coords.latitude.toString();

          const lon =
            position.coords.longitude.toString();

          await loadWeather(
            `/api/forecast?lat=${encodeURIComponent(
              lat
            )}&lon=${encodeURIComponent(lon)}`,
            `/api/weather?lat=${encodeURIComponent(
              lat
            )}&lon=${encodeURIComponent(lon)}`
          );
        } catch (error) {
          console.error(error);

          alert(
            error instanceof Error
              ? error.message
              : "Unable to load weather for your location."
          );
        } finally {
          setLocationLoading(false);
        }
      },

      (error) => {
        console.error(
          "Geolocation error:",
          error
        );

        setLocationLoading(false);

        if (error.code === error.PERMISSION_DENIED) {
          alert(
            "Location permission was denied. Please allow location access and try again."
          );

          return;
        }

        if (error.code === error.POSITION_UNAVAILABLE) {
          alert(
            "Your current location is unavailable."
          );

          return;
        }

        if (error.code === error.TIMEOUT) {
          alert(
            "Getting your location took too long. Please try again."
          );

          return;
        }

        alert(
          "Unable to access your current location."
        );
      },

      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 300000,
      }
    );
  };

  const isLoading =
    loading || locationLoading;

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-100 to-slate-200 flex items-center justify-center p-6">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl p-8">

        <h1 className="text-5xl font-bold text-center text-slate-800 mb-8">
          WeatherHub
        </h1>

        <div className="flex items-start gap-3">
          <div className="min-w-0 flex-1">
            <SearchBar
              city={city}
              setCity={setCity}
              handleSearch={handleSearch}
              loading={isLoading}
            />
          </div>

          <button
            type="button"
            onClick={handleCurrentLocation}
            disabled={isLoading}
            aria-label="Use current location"
            title="Use current location"
            className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-xl border border-slate-300 bg-white text-blue-600 shadow-sm transition hover:border-blue-400 hover:bg-blue-50 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
          >
            <LocateFixed
              size={24}
              className={
                locationLoading
                  ? "animate-pulse"
                  : ""
              }
            />
          </button>
        </div>

        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20 animate-pulse">
            <div className="h-14 w-14 rounded-full border-4 border-blue-500 border-t-transparent animate-spin" />

            <p className="mt-6 text-xl font-semibold text-slate-600">
              {locationLoading
                ? "Getting your location..."
                : "Searching weather..."}
            </p>
          </div>
        )}

        {!isLoading &&
          currentWeather &&
          weather && (
            <>
              <CurrentWeather
                weather={currentWeather}
              />

              <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-800">
                  5-Day Forecast
                </h2>

                <p className="mt-1 text-slate-500">
                  Weather forecast for{" "}
                  {weather.city.name}
                </p>
              </div>

              <ForecastGrid
                forecast={weather.forecast}
              />
            </>
          )}

      </div>
    </main>
  );
}