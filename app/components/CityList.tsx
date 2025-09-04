"use client";

import { deleteFavorite } from "@/app/actions"; // 👈 ny action
import Link from "next/link";
import { useState } from "react";
import SearchBar from "./SearchBar";
import WeatherCard from "./weather-card";

interface City {
  id: string;
  name: string;
  temp: number;
  description: string;
  icon: string | null;
  favorite: boolean;
}

interface Props {
  defaultCities: City[];
}

export default function CityList({ defaultCities }: Props) {
  const [cities, setCities] = useState(defaultCities);

  const handleSearch = (city: string) => {
    window.location.href = (`/${city.toLowerCase()}`);
  };

  const handleDelete = async (id: string) => {
    await deleteFavorite(id);
    setCities((prev) => prev.filter((c) => c.id !== id));
  };

  return (
     <div className="flex flex-col items-center">
      <SearchBar onSearch={handleSearch} />
      <h2 className="flex mt-4 ">Favorite list</h2>
      <div className="flex flex-row gap-4 flex-wrap justify-center mt-6">
        {cities.map((c) => (
          <div key={c.id} className="relative">
            {/* 👇 Link runt hela WeatherCard */}
            <Link href={`/${c.name.toLowerCase()}`} className="block">
              <WeatherCard
                name={c.name}
                temp={c.temp}
                description={c.description}
                icon={c.icon || ""}
              />
            </Link>

            
            <button
              onClick={() => handleDelete(c.id)}
              className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded"
            >
              ❌
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
