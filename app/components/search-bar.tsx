"use client";

import { useState } from "react";

export default function SearchBar({onSearch}: {onSearch: (city: string) => void}) {
    const [city, setCity] = useState("");

  return (
    <div className="mb-8">
      <input
        data-cy="Enter-city"
        type="text"
        value={city}
        placeholder="Search for a city..."
        onChange={(e) => setCity(e.target.value)}
        className="w-100 p-4 rounded-lg border-3 text-slate-800 focus:ring-blue-500"
      />
      <button
        className="ml-4 p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        aria-label="Search for city"
        data-cy="Search-city"
        onClick={() => {if (city.trim()) onSearch(city); setCity("")}}
      >
        Search
      </button>
    </div>
  );
}