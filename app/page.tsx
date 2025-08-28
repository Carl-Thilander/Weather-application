import { db } from "@/prisma/db";
import CityList from "./components/city-list";
import Header from "./components/header";

export default async function Home() {
  const cities = await db.city.findMany();

  return (
    <main className="bg-gray-100 min-h-screen p-8">
      <Header />
      <CityList defaultCities={cities} />
    </main>
  );
}
