import { db } from "@/prisma/db";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get("city");

   if (!city) {
    return NextResponse.json({ error: "City required" }, { status: 400 });
  }
  const apiKey = process.env.WEATHER_API_KEY;
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  );
  if (!res.ok) {
    return NextResponse.json({ error: "City not found" }, { status: 404 });
  }
  const data = await res.json();
  const weather = data.weather[0];
  return NextResponse.json({
    city: data.name,
    temp: Math.round(data.main.temp),
    description: data.weather[0].description,
    icon: weather.icon,
  });
  }

  export async function POST(req: NextResponse){
    const body = await req.json();

    const { id, name, temp, icon, description } = body;

    try {
      const existingCity = await db.city.findUnique({ where:{id}});

      if (existingCity){
        return NextResponse.json({message: "The city is already in favorite list"}, {status: 200});
      }

      const city = await db.city.create({
        data: {
          id,
          name,
          temp,
          icon,
          description,
          favorite: true,
        },
      });

      return NextResponse.json(city, {status: 201})
    } catch (error) {
      console.log(error);
       return NextResponse.json({ message: 'Kunde inte spara stad' }, { status: 500 });
    }


  }
  

  