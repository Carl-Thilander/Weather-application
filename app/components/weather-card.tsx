interface Props {
    name: string;
    temp: number;
    description: string;
    onDelete?: () => void;
}

export default function WeatherCard({name, temp, description, onDelete}: Props) {

    
    return (

        
        <div
        className="bg-white p-4 rounded-lg text-black w-64 border flex items-center justify-center flex-col">
            <h2 className="text-2xl font-bold mb-4">{name}</h2>
            <p className="text-lg">Temperature: {temp}°C</p>
            <p className="text-lg">Weather: {description}</p>
        {onDelete && (
            <button
            onClick={onDelete}
            className="text-red-500 hover:text-red-700"
            aria-label={`Ta bort ${name}`}
            >
          Remove City
        </button>
            
        
        
    )}
    </div>
    )
    }