"use client";

import {
  Cloud,
  CloudLightning,
  CloudRain,
  CloudSnow,
  Droplets,
  Eye,
  Gauge,
  Sun,
  Thermometer,
  Wind,
  X,
} from "lucide-react";

type WeatherDetailsProps = {
  day: any;
  onClose: () => void;
};

function WeatherIcon({
  condition,
}: {
  condition: string;
}) {
  switch (condition) {
    case "Clear":
      return (
        <Sun
          size={64}
          className="text-amber-500"
        />
      );

    case "Clouds":
      return (
        <Cloud
          size={64}
          className="text-slate-400"
        />
      );

    case "Rain":
      return (
        <CloudRain
          size={64}
          className="text-blue-500"
        />
      );

    case "Snow":
      return (
        <CloudSnow
          size={64}
          className="text-cyan-500"
        />
      );

    case "Thunderstorm":
      return (
        <CloudLightning
          size={64}
          className="text-amber-500"
        />
      );

    default:
      return (
        <Sun
          size={64}
          className="text-amber-500"
        />
      );
  }
}

export default function WeatherDetails({
  day,
  onClose,
}: WeatherDetailsProps) {
  const date = new Date(day.dt_txt);

  const visibility =
    typeof day.visibility === "number"
      ? `${(day.visibility / 1000).toFixed(1)} km`
      : "N/A";

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/55 p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Weather details"
        className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
        onClick={(event) =>
          event.stopPropagation()
        }
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close weather details"
          className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <X size={20} />
        </button>

        <div className="pr-12">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-600">
            Weather Details
          </p>

          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
            {date.toLocaleDateString("en-US", {
              weekday: "long",
            })}
          </h2>

          <p className="mt-1 text-slate-500">
            {date.toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>

        <div className="mt-7 flex items-center justify-between rounded-2xl bg-gradient-to-br from-sky-50 to-blue-50 p-5 sm:p-6">
          <div>
            <p className="text-5xl font-bold tracking-tight text-slate-900">
              {Math.round(day.main.temp)}°
            </p>

            <p className="mt-2 capitalize text-slate-600">
              {day.weather[0].description}
            </p>
          </div>

          <WeatherIcon
            condition={day.weather[0].main}
          />
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
          <DetailItem
            icon={<Thermometer size={19} />}
            label="Feels Like"
            value={`${Math.round(
              day.main.feels_like
            )}°`}
          />

          <DetailItem
            icon={<Droplets size={19} />}
            label="Humidity"
            value={`${day.main.humidity}%`}
          />

          <DetailItem
            icon={<Wind size={19} />}
            label="Wind"
            value={`${day.wind.speed} m/s`}
          />

          <DetailItem
            icon={<Gauge size={19} />}
            label="Pressure"
            value={`${day.main.pressure} hPa`}
          />

          <DetailItem
            icon={<Eye size={19} />}
            label="Visibility"
            value={visibility}
          />

          <DetailItem
            icon={<Thermometer size={19} />}
            label="Min / Max"
            value={`${Math.round(
              day.main.temp_min
            )}° / ${Math.round(
              day.main.temp_max
            )}°`}
          />
        </div>
      </div>
    </div>
  );
}

type DetailItemProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
};

function DetailItem({
  icon,
  label,
  value,
}: DetailItemProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="mb-2 flex items-center gap-2 text-blue-600">
        {icon}

        <span className="text-xs font-medium text-slate-500 sm:text-sm">
          {label}
        </span>
      </div>

      <p className="font-bold text-slate-800">
        {value}
      </p>
    </div>
  );
}