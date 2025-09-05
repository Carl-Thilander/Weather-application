"use client";

import { fetchCities } from "@/app/actions";
import { useEffect, useState } from "react";

interface City {
  name: string;
  country: string;
}

interface SearchBarProps {
  onSearch: (city: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<City[]>([]);
 

   useEffect(() => {
    const getSuggestions = async () => {
      if (query.length < 2) return setSuggestions([]);
      const results = await fetchCities(query);
      setSuggestions(results);
    };
    const timeout = setTimeout(getSuggestions, 300);
    return () => clearTimeout(timeout);
  }, [query]);


    const handleSelect = (city: City) => {
    setQuery(city.name);
    setSuggestions([]);
    onSearch(city.name); 
  };
  

  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search city..."
        className="w-full border-4 p-2 rounded-full"
        data-cy="Enter-city"
      />
      {suggestions.length > 0 && (
        <ul className="absolute z-10 bg-white border rounded w-full mt-1 max-h-60 overflow-y-auto">
          {suggestions.map((city, idx) => (
            <li
              key={`${city.name}-${idx}`}
              className="p-2 hover:bg-gray-100 cursor-pointer text-black"
             onClick={() => handleSelect(city)}
             data-cy="Search-city"
            >
              {city.name}, {city.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
