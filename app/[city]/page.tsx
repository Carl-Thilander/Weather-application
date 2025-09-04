import { fetchForecast, fetchWeather } from "@/app/actions";
import BackToHomeButton from "@/app/components/BacktoHomeBtn";
import AddFavoriteButton from "../components/AddFavoriteButton";

interface Props {
  params: { city: string };
}

export default async function CityPage({ params }: Props) {
  const weather = await fetchWeather(params.city);
  const forecast = await fetchForecast(params.city);
  

  if (!weather) return <p>No data found for {params.city}</p>;

  return (
    <main className="bg-gradient-to-b from-blue-300 to-yellow-300 min-h-screen p-8">
      <h1 className="text-3xl font-bold">{weather.name}</h1>
      <p className="text-xl" data-cy="temperature">{weather.temp}°C</p>
      <p className="capitalize" data-cy="condition">{weather.description}</p>

      <AddFavoriteButton city={weather}  />
      <BackToHomeButton />

      <h2 className="mt-8 text-2xl font-semibold text-blue-900">Weather Forecast</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {forecast && forecast.slice(0, 20).map((item: any) => (
          <div key={item.dt} className="border rounded p-4 bg-slate-300 text-black">
            <p>{item.date.toLocaleString("en-US", { weekday: "short", hour: "2-digit", minute: "2-digit" })}</p>
            <img src={`https://openweathermap.org/img/wn/${item.icon}@2x.png`} alt={item.description} width={50} height={50} />
            <p className="font-bold">{item.temp}°C</p>
            <p className="capitalize">{item.description}</p>
            <p>Wind: {item.wind} m/s</p>
            <p>Humidity: {item.humidity}%</p>
          </div>
        ))}
      </div>
    </main>
  );
}
