import { fetchForecast, fetchWeather } from "@/app/actions";
import BackToHomeButton from "@/app/components/back-tohome-button";
import AddFavoriteButton from "../components/add-favorite-button";

interface Props {
  params: { city: string };
}

interface ForecastItem {
  date: Date;
  icon: string;
  description: string;
  temp: number;
  wind: number;
  humidity: number;
}

function groupForecastByDayAndHour(forecast: ForecastItem[]) {
  const days: { [day: string]: { [hour: string]: ForecastItem } } = {};
  const hoursSet = new Set<string>();

  forecast.forEach(item => {
    const day = item.date.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });
    const hour = item.date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
    hoursSet.add(hour);
    if (!days[day]) days[day] = {};
    days[day][hour] = item;
  });

  const hours = Array.from(hoursSet).sort();
  const dayKeys = Object.keys(days).slice(0, 5); 

  return { days, hours, dayKeys };
}

export default async function CityPage({ params }: Props) {
  const weather = await fetchWeather(params.city);
  const forecast = await fetchForecast(params.city);
  

  if (!weather) return <p>No data found for {params.city}</p>;

  const { days, hours, dayKeys } = forecast ? groupForecastByDayAndHour(forecast) : { days: {}, hours: [], dayKeys: [] };

  return (
    <main className="bg-gradient-to-b from-slate-800 to-slate-600 min-h-screen p-8 ">
      <h1 className="text-3xl font-bold text-white">{weather.name}</h1>
      <p className="text-xl text-white" data-cy="temperature">{weather.temp}°C</p>
      <p className="capitalize  text-white" data-cy="condition">{weather.description}</p>

      <AddFavoriteButton city={weather} isFavorite={weather.favorite}  />
      <BackToHomeButton />

      <h2 className="mt-8 text-2xl font-semibold text-white">Weather Forecast</h2>

 <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 " data-cy="forecast-grid">
      {dayKeys.map((day) => (
        <div
          key={day}
          className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden"
        >
          
          <div className="bg-sky-500 text-white p-4 text-center font-bold text-lg">
            {day}
          </div>

          
          <div className="p-4 grid grid-cols-2 gap-4">
            {hours.map((hour) => {
              const item = days[day][hour];
              return item ? (
                <div
                  key={day + hour}
                  className="flex flex-col items-center justify-center p-3 rounded-xl bg-gradient-to-b from-sky-100 to-sky-300 shadow"
                >
                  <span className="text-sm font-bold text-slate-700">
                    {hour}
                  </span>
                  <img
                    src={`https://openweathermap.org/img/wn/${item.icon}@2x.png`}
                    alt={item.description}
                    width={48}
                    height={48}
                  />
                  <span className="text-lg font-bold text-black">{item.temp}°C</span>
                  <span className="text-lg font-bold text-black">Wind {item.wind} m/s</span>
                  <span className="text-lg font-bold text-black">Humidity {item.humidity} %</span>
                  <span className="text-s text-slate-600 capitalize">
                    {item.description}
                  </span>
                </div>
              ) : (
                <div
                  key={day + hour}
                  className="flex items-center justify-center text-gray-400 text-sm"
                >
                
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
    </main>
  );
}
