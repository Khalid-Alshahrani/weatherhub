import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const city = searchParams.get("city");
    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");

    if (!city && (!lat || !lon)) {
      return NextResponse.json(
        { error: "City or coordinates are required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENWEATHER_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "OpenWeather API key is not configured" },
        { status: 500 }
      );
    }

    const params = new URLSearchParams({
      appid: apiKey,
      units: "metric",
    });

    if (lat && lon) {
      params.set("lat", lat);
      params.set("lon", lon);
    } else if (city) {
      params.set("q", city);
    }

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?${params.toString()}`,
      {
        cache: "no-store",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          error: data.message || "Current weather API failed",
        },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Current weather error:", error);

    return NextResponse.json(
      { error: "Current weather API failed" },
      { status: 500 }
    );
  }
}