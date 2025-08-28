interface Props {
    name: string;
    temp: number;
    description: string;
    onDelete?: () => void;
}

export default function WeatherCard({name, temp, description, onDelete}: Props) {

    
    return (

        
        <div
        className="bg-blue-400 p-4 rounded-lg text-white w-64 border flex items-center justify-center flex-col">
            <h2 className="text-2xl font-bold mb-4">{name}</h2>
            <p className="text-lg">Temperature: {temp}°C</p>
            <p className="text-lg mb-4">Weather: {description}</p>
        {onDelete && (
            <button
            onClick={onDelete}
            className="text-white-500 p-2 bg-red-500 rounded-xl hover:text-red-700"
            aria-label={`Ta bort ${name}`}
            >
          Remove City
        </button>
            
        
        
    )}
    </div>
    )
    }