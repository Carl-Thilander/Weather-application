
interface Props {
    name: string;
    temp: number;
    description: string;
    icon: string;
}

export default function WeatherCard({name, temp, description, icon}: Props) {
  
    return (
        <div
        className="bg-blue-400 p-4 rounded-lg text-white w-64 h-100 border flex items-top flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold mb-4">{name}</h2>
          </div>
            {icon && (
          <img
            src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
            alt={description}
            className="w-16 h-16"
            loading="lazy"
          />
        )}
            <p className="text-lg mb-4" data-cy="temperature">Temperature: {temp}°C</p>
            <p className="text-lg mb-4 capitalize" data-cy="condition">Condition: {description}</p>
        
    </div>
    )
    }