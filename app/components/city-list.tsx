"use client";

import { City } from "@/generated/prisma";
import { useState } from "react";
import SearchBar from "./search-bar";
import WeatherCard from "./weather-card";
import { useRouter } from "next/navigation";

interface Props {
  defaultCities: City[];
}

export default function CityList({ defaultCities }: Props) {
  const [cities, setCities] = useState(defaultCities);
  const router = useRouter();

  const handleSearch = async (city: string) => {
    const res = await fetch(`/api/weather?city=${city}`);
    if (!res.ok) {
      alert("Kunde inte hitta stad");
      return;
    }
    router.push(`/${city.toLowerCase()}`);
    const data = await res.json();
    setCities((prev) => [
      ...prev,
      { id: data.city, name: data.city, temp: data.temp,icon: data.icon, description: data.description, favorite: false },
    ]);
  };



  const handleDelete = (id: string) => {
    setCities(cities.filter((c) => c.id !== id));
  };

   const handleFavorite = async (city: { name: string; id: string; temp: number; description: string; icon: string | null; favorite: boolean; }) => {
    const res = await fetch('/api/weather', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(city),
    });

    if (!res.ok) {
      alert('Kunde inte spara som favorit');
    }
  };

  return (
    <div className="flex flex-wrap flex-col items-center">
      <SearchBar  onSearch={handleSearch}/>
      <div className="flex flex-row gap-4 flex-wrap justify-center">
      {cities.map((c) => (
  <WeatherCard
    key={c.id}
    name={c.name}
    temp={c.temp}
    description={c.description}
    icon={c.icon || ""}
    onDelete={() => handleDelete(c.id)}
    onToggleFavorite={() => handleFavorite(c)}
  />
))}

      </div>
    </div>
  );
}
