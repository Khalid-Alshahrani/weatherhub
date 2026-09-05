import {
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  Wind,
  Droplets,
  Thermometer,
} from "lucide-react";

type CurrentWeatherProps = {
  day: any;
  city: string;
};

function WeatherIcon({ condition }: { condition: string }) {
  switch (condition) {
    case "Clear":
      return <Sun size={90} className="text-yellow-500" />;

    case "Clouds":
      return <Cloud size={90} className="text-gray-500" />;

    case "Rain":
      return <CloudRain size={90} className="text-blue-500" />;

    case "Snow":
      return <CloudSnow size={90} className="text-cyan-400" />;

    case "Thunderstorm":
      return (
        <CloudLightning
          size={90}
          className="text-yellow-400"
        />
      );

    default:
      return <Sun size={90} className="text-yellow-500" />;
  }
}

export default function CurrentWeather({
  day,
  city,
}: CurrentWeatherProps) {
  return (
    <div className="mb-12 text-center">

      <p className="text-lg text-slate-500">
        📍 {city}
      </p>

      <div className="flex justify-center my-4">
        <WeatherIcon condition={day.weather[0].main} />
      </div>

      <h1 className="text-7xl font-bold text-slate-800">
        {Math.round(day.main.temp)}°
      </h1>

      <p className="text-2xl text-slate-600 mt-2">
        {day.weather[0].description}
      </p>

      <div className="flex justify-center gap-8 mt-8">

        <div className="flex items-center gap-2">
          <Thermometer className="text-red-500" />
          <span>
            Feels {Math.round(day.main.feels_like)}°
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Droplets className="text-blue-500" />
          <span>{day.main.humidity}%</span>
        </div>

        <div className="flex items-center gap-2">
          <Wind className="text-slate-500" />
          <span>{Math.round(day.wind.speed)} m/s</span>
        </div>

      </div>

    </div>
  );
}