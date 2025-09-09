"use client";

import { deleteFavorite } from "@/app/actions";
import Link from "next/link";
import { useState } from "react";
import SearchBar from "./search-bar";
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
        <h2 className="left-1 mt-8 text-4xl text-black">Favorite list</h2>
      <div className="flex flex-row gap-4 flex-wrap justify-center mt-6">
        {cities.map((c) => (
          <div key={c.id} className="relative">
            <Link href={`/${c.name.toLowerCase()}`} className="block hover:scale-105 transform transition duration-200">
              <WeatherCard
                name={c.name}
                temp={c.temp}
                description={c.description}
                icon={c.icon || ""}
              />
            </Link>
            <button
              onClick={() => handleDelete(c.id)}
              className="absolute top-2 right-2 bg-gray-300 p-1 rounded-xl hover:bg-red-600 transition"
              aria-label={`Remove ${c.name} from list`}
            >
              ❌
            </button>

            
          </div>
        ))}
      </div>
    </div>
  );
}
