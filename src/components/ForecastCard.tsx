import {
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
} from "lucide-react";

type ForecastCardProps = {
  day: any;
  index: number;
};

function WeatherIcon({ condition }: { condition: string }) {
  switch (condition) {
    case "Clear":
      return <Sun size={50} className="mx-auto text-yellow-500" />;

    case "Clouds":
      return <Cloud size={50} className="mx-auto text-gray-500" />;

    case "Rain":
      return <CloudRain size={50} className="mx-auto text-blue-500" />;

    case "Snow":
      return <CloudSnow size={50} className="mx-auto text-cyan-400" />;

    case "Thunderstorm":
      return (
        <CloudLightning
          size={50}
          className="mx-auto text-yellow-400"
        />
      );

    default:
      return <Sun size={50} className="mx-auto text-yellow-500" />;
  }
}

export default function ForecastCard({
  day,
}: ForecastCardProps) {
  return (
    <div className="bg-white border rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 hover:scale-105 transition-all duration-300 cursor-pointer p-5 text-center">

      <h3 className="font-bold text-slate-700 mb-4">
        {new Date(day.dt_txt).toLocaleDateString("en-US", {
          weekday: "short",
        })}
      </h3>

      <WeatherIcon condition={day.weather[0].main} />

      <p className="text-3xl font-bold text-slate-800 mt-3">
        {Math.round(day.main.temp)}°
      </p>

      <p className="text-sm text-slate-500 mt-4">
        💧 {day.main.humidity}%
      </p>

      <p className="text-sm text-slate-500">
        🌬 {Math.round(day.wind.speed)} m/s
      </p>

    </div>
  );
}