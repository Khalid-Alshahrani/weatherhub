"use client";

import { useState } from "react";

import ForecastCard from "./ForecastCard";
import WeatherDetails from "./WeatherDetails";

type ForecastGridProps = {
  forecast: any[];
};

export default function ForecastGrid({
  forecast,
}: ForecastGridProps) {
  const [selectedDay, setSelectedDay] =
    useState<any>(null);

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
        {forecast.map(
          (day: any, index: number) => (
            <ForecastCard
              key={`${day.dt}-${index}`}
              day={day}
              index={index}
              onSelect={setSelectedDay}
            />
          )
        )}
      </div>

      {selectedDay && (
        <WeatherDetails
          day={selectedDay}
          onClose={() => setSelectedDay(null)}
        />
      )}
    </>
  );
}