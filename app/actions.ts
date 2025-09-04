"use server";

import { db } from "@/prisma/db";

//Specefic data for a city
export async function fetchWeather(city: string) {
  const apiKey = process.env.WEATHER_API_KEY;
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  );

  if (!res.ok) return null;

  const data = await res.json();
  const weather = data.weather[0];

  return {
    id: data.id.toString(),
    name: data.name,
    temp: Math.round(data.main.temp),
    description: weather.description,
    icon: weather.icon,
    favorite: false,
    extra: data, 
  };
}

//Data for searching cities
export async function fetchCities(query: string) {
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
  const existingCity = await db.city.findUnique({ where: { id: city.id } });
  if (existingCity) return { message: "Redan i favoriter" };

  const newCity = await db.city.create({
    data: {
      id: city.id,
      name: city.name,
      temp: city.temp,
      description: city.description,
      icon: city.icon,
      favorite: true,
    },
  });

  return newCity;
}
