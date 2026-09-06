"use client";

import {
  Droplets,
  Eye,
  Gauge,
  Thermometer,
  Wind,
  X,
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
} from "lucide-react";

type WeatherDetailsProps = {
  day: any;
  onClose: () => void;
};

function WeatherIcon({ condition }: { condition: string }) {
  switch (condition) {
    case "Clear":
      return <Sun size={64} className="text-yellow-500" />;

    case "Clouds":
      return <Cloud size={64} className="text-gray-500" />;

    case "Rain":
      return <CloudRain size={64} className="text-blue-500" />;

    case "Snow":
      return <CloudSnow size={64} className="text-cyan-400" />;

    case "Thunderstorm":
      return <CloudLightning size={64} className="text-yellow-400" />;

    default:
      return <Sun size={64} className="text-yellow-500" />;
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close weather details"
          className="absolute right-5 top-5 rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
        >
          <X size={22} />
        </button>

        <div className="mb-8 pr-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-500">
            Weather Details
          </p>

          <h2 className="mt-2 text-3xl font-bold text-slate-800">
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

        <div className="mb-8 flex items-center justify-between rounded-2xl bg-sky-50 p-5">
          <div>
            <p className="text-5xl font-bold text-slate-800">
              {Math.round(day.main.temp)}°
            </p>

            <p className="mt-2 capitalize text-slate-600">
              {day.weather[0].description}
            </p>
          </div>

          <WeatherIcon condition={day.weather[0].main} />
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <DetailItem
            icon={<Thermometer size={20} />}
            label="Feels Like"
            value={`${Math.round(day.main.feels_like)}°`}
          />

          <DetailItem
            icon={<Droplets size={20} />}
            label="Humidity"
            value={`${day.main.humidity}%`}
          />

          <DetailItem
            icon={<Wind size={20} />}
            label="Wind"
            value={`${day.wind.speed} m/s`}
          />

          <DetailItem
            icon={<Gauge size={20} />}
            label="Pressure"
            value={`${day.main.pressure} hPa`}
          />

          <DetailItem
            icon={<Eye size={20} />}
            label="Visibility"
            value={visibility}
          />

          <DetailItem
            icon={<Thermometer size={20} />}
            label="Min / Max"
            value={`${Math.round(day.main.temp_min)}° / ${Math.round(
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
    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
      <div className="mb-2 flex items-center gap-2 text-blue-500">
        {icon}

        <span className="text-sm font-medium text-slate-500">
          {label}
        </span>
      </div>

      <p className="font-bold text-slate-800">
        {value}
      </p>
    </div>
  );
}