
import { db } from "@/prisma/db";
import CityList from "./components/CityList";
import ClockWidget from "./components/ClockWidget";
import Header from "./components/header";

export default async function Home() {
  const defaultCities = await db.city.findMany();


  return (
    <main className="bg-gradient-to-b from-slate-800 to-slate-600 min-h-screen p-8">
      <Header />
      <div className="fixed top-4 left-4 bg-white/80 backdrop-blur-md 
                      rounded-xl shadow-md px-4 py-2">
        <ClockWidget />
      </div>
      <CityList defaultCities={defaultCities} />
    </main>
  );
}
