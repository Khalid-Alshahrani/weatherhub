"use client";

import { useState } from "react";
import {
  CloudSun,
  LocateFixed,
  MapPin,
} from "lucide-react";

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

  const [error, setError] = useState("");

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
        forecastData.error || "Unable to load forecast."
      );
    }

    if (!currentResponse.ok || !currentData.main) {
      throw new Error(
        currentData.error ||
        "Unable to load current weather."
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

    if (!trimmedCity) {
      setError("Enter a city to search.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const encodedCity =
        encodeURIComponent(trimmedCity);

      await loadWeather(
        `/api/forecast?city=${encodedCity}`,
        `/api/weather?city=${encodedCity}`
      );
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCurrentLocation = () => {
    setError("");

    if (!navigator.geolocation) {
      setError(
        "Geolocation is not supported by your browser."
      );
      return;
    }

    setLocationLoading(true);

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

          setError(
            error instanceof Error
              ? error.message
              : "Unable to load weather for your location."
          );
        } finally {
          setLocationLoading(false);
        }
      },

      (error) => {
        console.error("Geolocation error:", error);

        setLocationLoading(false);

        if (error.code === error.PERMISSION_DENIED) {
          setError(
            "Location permission was denied. Allow location access and try again."
          );
          return;
        }

        if (error.code === error.POSITION_UNAVAILABLE) {
          setError(
            "Your current location is unavailable."
          );
          return;
        }

        if (error.code === error.TIMEOUT) {
          setError(
            "Getting your location took too long. Please try again."
          );
          return;
        }

        setError(
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
    <main className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-100 px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto w-full max-w-6xl">

        <header className="mb-10 text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
              <CloudSun size={30} />
            </div>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            WeatherHub
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-base text-slate-500 sm:text-lg">
            Current conditions and a five-day forecast
            for cities around the world.
          </p>
        </header>

        <section className="rounded-3xl border border-white/80 bg-white/90 p-4 shadow-xl shadow-slate-200/60 backdrop-blur sm:p-6 lg:p-8">

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
              className="flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-blue-600 shadow-sm transition hover:border-blue-300 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400 sm:h-[60px] sm:w-[60px]"
            >
              <LocateFixed
                size={23}
                className={
                  locationLoading
                    ? "animate-pulse"
                    : ""
                }
              />
            </button>
          </div>

          {error && (
            <div
              role="alert"
              className="mb-8 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-red-500" />

              <p>{error}</p>
            </div>
          )}

          {isLoading && (
            <div className="flex min-h-[360px] flex-col items-center justify-center">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" />

              <p className="mt-5 font-semibold text-slate-700">
                {locationLoading
                  ? "Getting your location..."
                  : "Loading weather..."}
              </p>

              <p className="mt-1 text-sm text-slate-400">
                This should only take a moment.
              </p>
            </div>
          )}

          {!isLoading &&
            !currentWeather &&
            !weather && (
              <div className="flex min-h-[360px] flex-col items-center justify-center px-4 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-sky-50 text-blue-500">
                  <MapPin size={34} />
                </div>

                <h2 className="mt-6 text-xl font-bold text-slate-800">
                  Search for a city
                </h2>

                <p className="mt-2 max-w-sm text-slate-500">
                  Enter a city above or use your current
                  location to see the latest weather.
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

                <div className="mb-5 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                      Upcoming
                    </p>

                    <h2 className="mt-1 text-2xl font-bold text-slate-900">
                      5-Day Forecast
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      Forecast for {weather.city.name}
                    </p>
                  </div>

                  <p className="hidden text-sm text-slate-400 sm:block">
                    Select a day for details
                  </p>
                </div>

                <ForecastGrid
                  forecast={weather.forecast}
                />
              </>
            )}
        </section>

        <footer className="mt-6 text-center text-sm text-slate-400">
          Weather data provided by OpenWeather
        </footer>

      </div>
    </main>
  );
}