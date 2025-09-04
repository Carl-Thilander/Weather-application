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
}

export default function AddFavoriteButton({ city }: Props) {
  const [isPending, startTransition] = useTransition();
  const [showMessage, setShowMessage] = React.useState(false);

  const handleClick = () => {
    startTransition(async () => {
      await saveFavorite(city);
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 2000); 
    });
  };

  return (
    <div>
      <button
        onClick={handleClick}
        disabled={isPending}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        {isPending ? "Adding..." : "Add to favorites"}
      </button>
      {showMessage && (
        <div className="mt-2 text-green-600 bg-green-100 px-3 py-2 rounded shadow w-100">
          {city.name} has been added to favorites!
        </div>
      )}
    </div>
  );
}
