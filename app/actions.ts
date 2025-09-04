"use server";

export async function fetchCities(query: string) {
  if (!query) return [];

  const apiKey = process.env.OPENWEATHER_API_KEY;
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${apiKey}`;

  const res = await fetch(url);
  if (!res.ok) return [];

  const data = await res.json();

  return data.map((c: any) => ({
    name: c.name,
    country: c.country,
    lat: c.lat,
    lon: c.lon,
  }));
}
