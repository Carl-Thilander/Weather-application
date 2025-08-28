"use client";

import { City } from "@/generated/prisma";
import { useState } from "react";
import SearchBar from "./search-bar";
import WeatherCard from "./weather-card";

interface Props {
  defaultCities: City[];
}

export default function CityList({ defaultCities }: Props) {
  const [cities, setCities] = useState(defaultCities);
  const handleSearch = async (city: string) => {
    const res = await fetch(`/api/weather?city=${city}`);
    if (!res.ok) {
      alert("Kunde inte hitta stad");
      return;
    }
    const data = await res.json();
    setCities((prev) => [
      ...prev,
      { id: data.city, name: data.city, temp: data.temp, description: data.description }
    ]);
  };

  const handleDelete = (id: string) => {
    setCities(cities.filter((c) => c.id !== id));
  };

  return (
    <div className="flex gap-4 flex-wrap justify-center">
      <SearchBar  onSearch={handleSearch}/>
      {cities.map((c) => (
        <WeatherCard
          key={c.id}
          name={c.name}
          temp={c.temp}
          description={c.description}
          onDelete={() => handleDelete(c.id)}
        />
        
         
       
      ))}
    </div>
  );
}
