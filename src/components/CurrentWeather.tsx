import {
  Droplets,
  Eye,
  Gauge,
  Thermometer,
  Wind,
} from "lucide-react";

type CurrentWeatherProps = {
  weather: any;
};

export default function CurrentWeather({
  weather,
}: CurrentWeatherProps) {
  const temperature = Math.round(weather.main.temp);
  const feelsLike = Math.round(weather.main.feels_like);
  const description = weather.weather[0].description;
  const humidity = weather.main.humidity;
  const windSpeed = weather.wind.speed;
  const pressure = weather.main.pressure;

  const visibility = weather.visibility
    ? (weather.visibility / 1000).toFixed(1)
    : "N/A";

  const iconCode = weather.weather[0].icon;

  return (
    <section className="mb-10">
      <div className="rounded-3xl bg-gradient-to-br from-blue-500 to-sky-400 p-6 text-white shadow-lg sm:p-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">

          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-blue-100">
              Current Weather
            </p>

            <h2 className="text-3xl font-bold">
              {weather.name}
            </h2>

            <p className="mt-1 capitalize text-blue-100">
              {description}
            </p>

            <div className="mt-6 flex items-center gap-3">
              <img
                src={`https://openweathermap.org/img/wn/${iconCode}@2x.png`}
                alt={description}
                className="h-20 w-20"
              />

              <span className="text-6xl font-bold">
                {temperature}°
              </span>
            </div>

            <div className="mt-2 flex items-center gap-2 text-blue-100">
              <Thermometer size={18} />

              <span>
                Feels like {feelsLike}°
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-2">

            <WeatherDetail
              icon={<Droplets size={20} />}
              label="Humidity"
              value={`${humidity}%`}
            />

            <WeatherDetail
              icon={<Wind size={20} />}
              label="Wind"
              value={`${windSpeed} m/s`}
            />

            <WeatherDetail
              icon={<Gauge size={20} />}
              label="Pressure"
              value={`${pressure} hPa`}
            />

            <WeatherDetail
              icon={<Eye size={20} />}
              label="Visibility"
              value={
                visibility === "N/A"
                  ? visibility
                  : `${visibility} km`
              }
            />

          </div>
        </div>
      </div>
    </section>
  );
}

type WeatherDetailProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
};

function WeatherDetail({
  icon,
  label,
  value,
}: WeatherDetailProps) {
  return (
    <div className="min-w-[130px] rounded-2xl bg-white/15 p-4 backdrop-blur-sm">

      <div className="mb-3 flex items-center gap-2 text-blue-100">
        {icon}

        <span className="text-sm">
          {label}
        </span>
      </div>

      <p className="text-lg font-bold">
        {value}
      </p>

    </div>
  );
}