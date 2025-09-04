import { City } from "@/generated/prisma";
import { db } from "../db";

export async function seedDefaultCities() {
  const mockedCities: City[] = [
    {
      id: "68adb30b0c2c50f13d0a64e9",
      weatherId: "68adb30b0c2c50f13d0a64e9",
      temp: 20,
      name: "New York",
      description: "Cloudy",
      icon: "01d",
      favorite: false
    },
    {
      id: "68adb30b0c2c50f13d0a64e8",
      weatherId: "68adb30b0c2c50f13d0a64e8",
      temp: 30,
      name: "Östhammar",
      description: "Sunny",
      icon: "10d",
      favorite: false
    },
    {
      id: "68adb30b0c2c50f13d0a64e7",
      weatherId: "68adb30b0c2c50f13d0a64e7",
      temp: 2,
      name: "Reykjavik",
      description: "Snowy",
      icon: "50d",
      favorite: false
    },
    {
      id: "68adb30b0c2c50f13d0a64e6",
      weatherId: "68adb30b0c2c50f13d0a64e6",
      temp: 15,
      name: "Stockholm",
      description: "Cloudy",
      icon: "03d",
      favorite: false
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
