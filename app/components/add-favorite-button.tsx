"use client";

import { saveFavorite } from "@/app/actions";
import React, { useTransition } from "react";

interface Props {
  city: {
    id: string;
    name: string;
    temp: number;
    description: string;
    icon: string | null;
  };
  isFavorite: boolean;
}

export default function AddFavoriteButton({ city, isFavorite }: Props) {
  const [isPending, startTransition] = useTransition();
  const [showMessage, setShowMessage] = React.useState(false);
  const [localFavorite, setLocalFavorite] = React.useState(isFavorite);

  const handleClick = () => {
    if (localFavorite) return;
    startTransition(async () => {
      await saveFavorite(city);
      setLocalFavorite(true);
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 2000);
    });
  };

  return (
    <div>
      <button
        onClick={handleClick}
        disabled={isPending || localFavorite}
        className={`mt-4 bg-blue-500 text-white px-4 py-2 rounded transition ${
          localFavorite ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
        }`}
        data-cy="Add-favorite"
      >
        {localFavorite
          ? "Already in favorites"
          : isPending
          ? "Adding..."
          : "Add to favorites"}
      </button>
      {showMessage && (
        <div data-cy="Add-favorite-toast" className="mt-2 text-green-600 bg-green-100 px-3 py-2 rounded shadow w-100">
          {city.name} has been added to favorites!
        </div>
      )}
    </div>
  );
}
