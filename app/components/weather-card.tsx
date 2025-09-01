interface Props {
    name: string;
    temp: number;
    description: string;
    icon: string;
    onDelete?: () => void;
    onToggleFavorite?: () => void;
}

export default function WeatherCard({name, temp, description, icon,  onDelete, onToggleFavorite}: Props) {
    return (
        <div
        className="bg-blue-400 p-4 rounded-lg text-white w-64 h-100 border flex items-top flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold mb-4">{name}</h2>
            <button onClick={onToggleFavorite}>⭐</button>
          </div>
            {icon && (
          <img
            src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
            alt={description}
            className="w-16 h-16"
          />
        )}
            <p className="text-lg mb-4" data-cy="temperature">Temperature: {temp}°C</p>
            <p className="text-lg mb-4 capitalize" data-cy="condition">Condition: {description}</p>
        {onDelete && (
            <button
            onClick={onDelete}
            className="text-white-500 p-2 bg-red-500 rounded-xl mt-auto hover:text-red-700"
            aria-label={`Remove ${name} from list`}
            >
          Remove City
        </button>
    )}
    </div>
    )
    }