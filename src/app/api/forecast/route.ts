import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const city = searchParams.get("city");

    if (!city) {
      return NextResponse.json(
        { error: "City is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENWEATHER_API_KEY;

    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/forecast",
      {
        params: {
          q: city,
          appid: apiKey,
          units: "metric",
        },
        timeout: 30000,
      }
    );

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Axios Error:", error.message);

    return NextResponse.json(
      {
        error: "Forecast API failed",
        details: error.message,
      },
      { status: 500 }
    );
  }
}