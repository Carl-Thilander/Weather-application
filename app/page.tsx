import { db } from "@/prisma/db";
import CityList from "./ui/todo-list";

export default async function Home() {
  const cities = await db.city.findMany();

  return (
    <main className="bg-slate-200 min-h-screen p-8">
      <CityList defaultCities={cities} />
    </main>
  );
}
