"use client";

import { City } from "@/generated/prisma";
import { useState } from "react";

interface Props {
  defaultCities: City[];
}

export default function CityList({ defaultCities }: Props) {
  const [cities, setCities] = useState(defaultCities);

  return (
    <ul>
      {cities.map((c) => (
        <li key={c.id}>
          <span className="text-black">{c.name}</span>
          <button
            onClick={() => setCities(cities.filter(({ id }) => c.id !== id))}
          >
            🗑️
          </button>
        </li>
      ))}
    </ul>
  );
}
