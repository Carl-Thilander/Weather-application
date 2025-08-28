import { City } from "@/generated/prisma";
import { db } from "../db";

export async function seedDefaultCities() {
  const mockedCities: City[] = [
    {
      id: "68adb30b0c2c50f13d0a64e9",
      temp: 20,
      name: "New York",
      description: "Cloudy",
    },
    {
      id: "68adb30b0c2c50f13d0a64e8",
      temp: 30,
      name: "Ban Phee",
      description: "Sunny",
    },
    {
      id: "68adb30b0c2c50f13d0a64e7",
      temp: 2,
      name: "Rejkjavik",
      description: "Snowy",
    },
    {
      id: "68adb30b0c2c50f13d0a64e6",
      temp: 18,
      name: "Stockholm",
      description: "Cloudy",
    },
  ];

  for (const { id, ...city } of mockedCities) {
    await db.city.upsert({
      where: { id },
      update: city,
      create: { id, ...city },
    });
  }
}
