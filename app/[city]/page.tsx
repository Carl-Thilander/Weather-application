import { fetchWeather } from "@/app/actions";
import BackToHomeButton from "@/app/components/BacktoHomeBtn";
import AddFavoriteButton from "../components/AddFavoriteButton";

interface Props {
  params: { city: string };
}

export default async function CityPage({ params }: Props) {
  const weather = await fetchWeather(params.city);

  if (!weather) return <p>Ingen data hittades för {params.city}</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">{weather.name}</h1>
      <p className="text-xl">{weather.temp}°C</p>
      <p className="capitalize">{weather.description}</p>

        <AddFavoriteButton city={weather} />

      <BackToHomeButton />
    </div>
  );
}
