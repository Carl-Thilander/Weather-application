
interface Props {
    name: string;
    temp: number;
    description: string;
    icon: string;
}

export default function WeatherCard({name, temp, description, icon}: Props) {
  
    return (
      <div
        className="bg-gradient-to-b from-white to-blue-300 rounded-full shadow-lg p-8 flex flex-col items-center justify-center border-2 border-blue-200"
        style={{ minWidth: 200, minHeight: 160 }}
      >
        <h2 className="text-2xl font-bold mb-2 text-blue-700 drop-shadow" aria-label={name}>{name}</h2>
        {icon && (
          <img
            src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
            alt={description}
            className="w-16 h-16 mb-2"
            loading="lazy"
          />
        )}
        <div className="text-xl font-bold text-blue-700 mb-1" data-cy="temperature">{temp}°C</div>
        <div className="capitalize text-blue-500 mb-1" data-cy="condition">{description}</div>
      </div>
    );
}