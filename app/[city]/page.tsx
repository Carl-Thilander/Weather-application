import Link from "next/link";
import { notFound } from "next/navigation";

interface Props {
    params: {
        city: string;
    };
}

async function getCityWeather(city: string) {
  const res = await fetch(`http://localhost:3000/api/weather?city=${city}`);
  if (!res.ok) return null;
  return res.json();
}

export default async function cityPage({params}: Props){
    const weather = await getCityWeather(params.city);

    if (!weather){
        return notFound();
    }

    return (
           <div className="flex flex-col items-center mt-8">
            <Link href={"/"} className="p-4 bg-blue-500 rounded-2xl">Back to homepage</Link>
      <h1 className="text-3xl font-bold mb-4">{weather.city}</h1>
      <p className="text-xl">{weather.temp}°C</p>
      <p>{weather.description}</p>
      <img src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt="weather icon" />
    </div>
    )

}