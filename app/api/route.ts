import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get("city");

   if (!city) {
    return NextResponse.json({ error: "City required" }, { status: 400 });
  }
  }

  const apiKey = process.env.WEATHER_API_KEY;
  