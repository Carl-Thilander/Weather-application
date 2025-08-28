"use client";

import { City } from "@/generated/prisma";
import { useState } from "react";
import WeatherCard from "./weather-card";

interface Props {
  defaultCities: City[];
}

export default function CityList({ defaultCities }: Props) {
  const [cities, setCities] = useState(defaultCities);

  const handleDelete = (id: string) => {
    setCities(cities.filter((c) => c.id !== id));
  };

  return (
    <div className="flex gap-4 flex-wrap justify-center">
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
