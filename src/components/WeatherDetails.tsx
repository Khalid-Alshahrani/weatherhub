import {
  Thermometer,
  Droplets,
  Wind,
  Gauge,
} from "lucide-react";

type WeatherDetailsProps = {
  day: any;
};

export default function WeatherDetails({
  day,
}: WeatherDetailsProps) {
  return (
    <div className="mt-10 rounded-3xl border bg-white p-8 shadow-lg animate-in fade-in duration-300">

      <h2 className="mb-8 text-3xl font-bold">
        Weather Details
      </h2>

      <div className="grid grid-cols-2 gap-6">

        <div className="flex items-center gap-3">
          <Thermometer />
          <span>
            Temperature:
            {" "}
            {Math.round(day.main.temp)}°
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Thermometer />
          <span>
            Feels Like:
            {" "}
            {Math.round(day.main.feels_like)}°
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Droplets />
          <span>
            Humidity:
            {" "}
            {day.main.humidity}%
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Wind />
          <span>
            Wind:
            {" "}
            {Math.round(day.wind.speed)} m/s
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Gauge />
          <span>
            Pressure:
            {" "}
            {day.main.pressure}
          </span>
        </div>

        <div className="flex items-center gap-3">
          ☁️
          <span>
            {day.weather[0].description}
          </span>
        </div>

      </div>

    </div>
  );
}