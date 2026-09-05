import ForecastCard from "./ForecastCard";

type ForecastGridProps = {
  forecast: any[];
};

export default function ForecastGrid({
  forecast,
}: ForecastGridProps) {
  return (
    <div className="grid grid-cols-5 gap-5">
      {forecast.map((day: any, index: number) => (
        <ForecastCard
          key={index}
          day={day}
          index={index}
        />
      ))}
    </div>
  );
}