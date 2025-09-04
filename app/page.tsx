
import { db } from "@/prisma/db";
import CityList from "./components/CityList";
import Header from "./components/header";

export default async function Home() {
  const defaultCities = await db.city.findMany();


  return (
    <main className="bg-slate-700 min-h-screen p-8">
      <Header />
      <CityList defaultCities={defaultCities} />
    </main>
  );
}
