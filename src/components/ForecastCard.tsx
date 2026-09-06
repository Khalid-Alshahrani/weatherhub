import {
  Cloud,
  CloudLightning,
  CloudRain,
  CloudSnow,
  Sun,
} from "lucide-react";

type ForecastCardProps = {
  day: any;
  index: number;
  onSelect: (day: any) => void;
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
          size={44}
          className="text-amber-500"
        />
      );

    case "Clouds":
      return (
        <Cloud
          size={44}
          className="text-slate-400"
        />
      );

    case "Rain":
      return (
        <CloudRain
          size={44}
          className="text-blue-500"
        />
      );

    case "Snow":
      return (
        <CloudSnow
          size={44}
          className="text-cyan-500"
        />
      );

    case "Thunderstorm":
      return (
        <CloudLightning
          size={44}
          className="text-amber-500"
        />
      );

    default:
      return (
        <Sun
          size={44}
          className="text-amber-500"
        />
      );
  }
}

export default function ForecastCard({
  day,
  onSelect,
}: ForecastCardProps) {
  const date = new Date(day.dt_txt);

  return (
    <button
      type="button"
      onClick={() => onSelect(day)}
      className="group w-full rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-slate-200/70 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:p-5"
    >
      <p className="text-sm font-medium text-slate-400">
        {date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })}
      </p>

      <h3 className="mt-1 font-bold text-slate-800">
        {date.toLocaleDateString("en-US", {
          weekday: "short",
        })}
      </h3>

      <div className="my-5 flex h-14 items-center justify-center">
        <WeatherIcon
          condition={day.weather[0].main}
        />
      </div>

      <p className="text-center text-3xl font-bold tracking-tight text-slate-900">
        {Math.round(day.main.temp)}°
      </p>

      <p className="mt-2 truncate text-center text-sm capitalize text-slate-500">
        {day.weather[0].description}
      </p>

      <p className="mt-4 text-center text-xs font-semibold text-blue-600 opacity-0 transition group-hover:opacity-100">
        View details
      </p>
    </button>
  );
}