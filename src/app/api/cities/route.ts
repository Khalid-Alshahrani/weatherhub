import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q")?.trim();

    if (!query || query.length < 2) {
      return NextResponse.json([]);
    }

    const apiKey = process.env.OPENWEATHER_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "OpenWeather API key is not configured" },
        { status: 500 }
      );
    }

    const response = await axios.get(
      "https://api.openweathermap.org/geo/1.0/direct",
      {
        params: {
          q: query,
          limit: 5,
          appid: apiKey,
        },
        timeout: 10000,
      }
    );

    const cities = response.data.map(
      (location: {
        name: string;
        state?: string;
        country: string;
        lat: number;
        lon: number;
      }) => ({
        name: location.name,
        state: location.state,
        country: location.country,
        lat: location.lat,
        lon: location.lon,
      })
    );

    return NextResponse.json(cities);
  } catch (error) {
    console.error("City autocomplete error:", error);

    return NextResponse.json(
      { error: "City search failed" },
      { status: 500 }
    );
  }
}