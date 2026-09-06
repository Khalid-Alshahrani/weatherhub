import axios from "axios";
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

    const params: Record<string, string> = {
      appid: apiKey,
      units: "metric",
    };

    if (lat && lon) {
      params.lat = lat;
      params.lon = lon;
    } else if (city) {
      params.q = city;
    }

    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/forecast",
      {
        params,
        timeout: 30000,
      }
    );

    return NextResponse.json(response.data);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Forecast API error:",
        error.response?.data || error.message
      );

      return NextResponse.json(
        {
          error:
            error.response?.data?.message ||
            "Forecast API failed",
        },
        {
          status: error.response?.status || 500,
        }
      );
    }

    console.error("Forecast API error:", error);

    return NextResponse.json(
      { error: "Forecast API failed" },
      { status: 500 }
    );
  }
}