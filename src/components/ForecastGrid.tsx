import ForecastCard from "./ForecastCard";

type ForecastGridProps = {
  forecast: any[];
};

export default function ForecastGrid({
  forecast,
}: ForecastGridProps) {
  return (
    <div
      className="
        grid
        grid-cols-2
        gap-4
        sm:grid-cols-3
        md:grid-cols-4
        lg:grid-cols-5
      "
    >
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