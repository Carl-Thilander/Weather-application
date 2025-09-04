
import { db } from "@/prisma/db";
import CityList from "./components/CityList";
import Header from "./components/header";

export default async function Home() {
  const defaultCities = await db.city.findMany();


  return (
    <main className="bg-gradient-to-b from-blue-300 to-yellow-300 min-h-screen p-8">
      <Header />
      <CityList defaultCities={defaultCities} />
    </main>
  );
}
