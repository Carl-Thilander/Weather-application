"use server";

import { db } from "@/prisma/db";
import { revalidatePath } from "next/cache";

//Fetch 5-day forecast for a city
export async function fetchForecast(city: string) {
  const apiKey = process.env.WEATHER_API_KEY;
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
  );
  if (!res.ok) return null;
  const data = await res.json();
  // Return array of forecasts (every 3 hours)
  return data.list.map((item: any) => ({
    dt: item.dt,
    date: new Date(item.dt * 1000),
    temp: Math.round(item.main.temp),
    description: item.weather[0].description,
    icon: item.weather[0].icon,
    humidity: item.main.humidity,
    wind: item.wind.speed,
  }));
}
export async function fetchWeather(city: string) {
  const apiKey = process.env.WEATHER_API_KEY;
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  );

  if (!res.ok) return null;

  const data = await res.json();
  const weather = data.weather[0];

  // Check if city is in favorites
  const favoriteCity = await db.city.findFirst({ where: { weatherId: data.id.toString() } });

  return {
    id: data.id.toString(),
    name: data.name,
    temp: Math.round(data.main.temp),
    description: weather.description,
    icon: weather.icon,
    favorite: !!favoriteCity,
    extra: data, 
  };
}

//Delete city from favourites
export async function deleteFavorite(id: string) {
  try {
    await db.city.delete({ where: { id } });
    revalidatePath("/"); // uppdatera homepage
  } catch (error) {
    console.error(error);
    return { error: "Kunde inte ta bort stad" };
  }
}

//Data for searching cities
export async function fetchCities(query: string) {
   if (!query) return [];
  const apiKey = process.env.WEATHER_API_KEY;
  const res = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${apiKey}`
  );

  if (!res.ok) return [];

  const data = await res.json();
  return data.map((c: any) => ({
    name: c.name,
    country: c.country,
    lat: c.lat,
    lon: c.lon,
  }));
}



//Save city to database when added to favourites
export async function saveFavorite(city: {
  id: string;
  name: string;
  temp: number;
  description: string;
  icon: string | null;
}) {
  // Check if city already exists by weatherId
  const exists = await db.city.findFirst({ where: { weatherId: city.id } });
  if (exists) return;


  await db.city.create({
    data: {
      weatherId: city.id,
      name: city.name,
      temp: city.temp,
      description: city.description,
      icon: city.icon,
      favorite: true,
    },
  });

  revalidatePath("/"); 
}
