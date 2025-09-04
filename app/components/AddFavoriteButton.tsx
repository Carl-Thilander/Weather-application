"use client";

import { saveFavorite } from "@/app/actions";
import { useTransition } from "react";

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

  const handleClick = () => {
    startTransition(async () => {
      await saveFavorite(city);
      alert(`${city.name} tillagd i favoriter!`);
    });
  };

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
    >
      {isPending ? "Lägger till..." : "Lägg till i favoriter"}
    </button>
  );
}
